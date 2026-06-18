/* =========================================================
   YUUMIRU - Data Layer (anime, episodes, genres, comments, reactions, history)
   ========================================================= */

const YData = {

  // ---------- GENRES ----------
  async getAllGenres() {
    const { data, error } = await sb.from('genres').select('*').order('name');
    if (error) throw error;
    return data;
  },

  // ---------- ANIME ----------
  async getAllAnime() {
    const { data, error } = await sb
      .from('anime')
      .select('*, anime_genres(genre_id, genres(id, name, slug)), episodes(id, episode_number, created_at)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getAnimeById(id) {
    const { data, error } = await sb
      .from('anime')
      .select('*, anime_genres(genre_id, genres(id, name, slug)), episodes(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    if (data.episodes) data.episodes.sort((a, b) => a.episode_number - b.episode_number);
    return data;
  },

  async getAnimeByGenreSlug(slug) {
    const { data: genre, error: gErr } = await sb.from('genres').select('id').eq('slug', slug).single();
    if (gErr) throw gErr;
    const { data, error } = await sb
      .from('anime_genres')
      .select('anime_id, anime(*, anime_genres(genre_id, genres(id,name,slug)), episodes(id))')
      .eq('genre_id', genre.id);
    if (error) throw error;
    return data.map(d => d.anime).filter(Boolean);
  },

  async searchAnime(query) {
    const { data, error } = await sb
      .from('anime')
      .select('*, anime_genres(genre_id, genres(id,name,slug)), episodes(id)')
      .ilike('title', `%${query}%`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createAnime(payload, genreIds) {
    const { data, error } = await sb.from('anime').insert(payload).select().single();
    if (error) throw error;
    if (genreIds && genreIds.length) {
      const rows = genreIds.map(gid => ({ anime_id: data.id, genre_id: gid }));
      const { error: gErr } = await sb.from('anime_genres').insert(rows);
      if (gErr) throw gErr;
    }
    return data;
  },

  async updateAnime(id, payload, genreIds) {
    const { error } = await sb.from('anime').update(payload).eq('id', id);
    if (error) throw error;
    if (genreIds) {
      await sb.from('anime_genres').delete().eq('anime_id', id);
      if (genreIds.length) {
        const rows = genreIds.map(gid => ({ anime_id: id, genre_id: gid }));
        const { error: gErr } = await sb.from('anime_genres').insert(rows);
        if (gErr) throw gErr;
      }
    }
    return true;
  },

  async deleteAnime(id) {
    const { error } = await sb.from('anime').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ---------- EPISODES ----------
  async getEpisode(id) {
    const { data, error } = await sb.from('episodes').select('*, anime(*)').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async getEpisodesByAnime(animeId) {
    const { data, error } = await sb.from('episodes').select('*').eq('anime_id', animeId).order('episode_number');
    if (error) throw error;
    return data;
  },

  async createEpisode(payload) {
    const { data, error } = await sb.from('episodes').insert(payload).select().single();
    if (error) throw error;
    return data;
  },

  async updateEpisode(id, payload) {
    const { error } = await sb.from('episodes').update(payload).eq('id', id);
    if (error) throw error;
    return true;
  },

  async deleteEpisode(id) {
    const { error } = await sb.from('episodes').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ---------- COMMENTS ----------
  async getComments(episodeId) {
    const { data, error } = await sb
      .from('comments')
      .select('*, profiles(username, avatar_url)')
      .eq('episode_id', episodeId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async addComment(episodeId, userId, content) {
    const { data, error } = await sb
      .from('comments')
      .insert({ episode_id: episodeId, user_id: userId, content })
      .select('*, profiles(username, avatar_url)')
      .single();
    if (error) throw error;
    return data;
  },

  async deleteComment(id) {
    const { error } = await sb.from('comments').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  subscribeToComments(episodeId, callback) {
    return sb.channel(`comments:${episodeId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `episode_id=eq.${episodeId}` }, callback)
      .subscribe();
  },

  // ---------- REACTIONS (like/dislike) ----------
  async getReactionCounts(episodeId) {
    const { data, error } = await sb.from('reactions').select('type').eq('episode_id', episodeId);
    if (error) throw error;
    const likes = data.filter(r => r.type === 'like').length;
    const dislikes = data.filter(r => r.type === 'dislike').length;
    return { likes, dislikes };
  },

  async getUserReaction(episodeId, userId) {
    const { data, error } = await sb.from('reactions').select('*').eq('episode_id', episodeId).eq('user_id', userId).maybeSingle();
    if (error) throw error;
    return data;
  },

  async setReaction(episodeId, userId, type) {
    const existing = await this.getUserReaction(episodeId, userId);
    if (existing && existing.type === type) {
      // toggle off
      const { error } = await sb.from('reactions').delete().eq('id', existing.id);
      if (error) throw error;
      return null;
    } else if (existing) {
      const { data, error } = await sb.from('reactions').update({ type }).eq('id', existing.id).select().single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await sb.from('reactions').insert({ episode_id: episodeId, user_id: userId, type }).select().single();
      if (error) throw error;
      return data;
    }
  },

  subscribeToReactions(episodeId, callback) {
    return sb.channel(`reactions:${episodeId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions', filter: `episode_id=eq.${episodeId}` }, callback)
      .subscribe();
  },

  // ---------- WATCH HISTORY ----------
  async addToHistory(userId, episodeId, animeId, progressSeconds = 0) {
    const { error } = await sb.from('watch_history').upsert({
      user_id: userId, episode_id: episodeId, anime_id: animeId,
      progress_seconds: progressSeconds, watched_at: new Date().toISOString()
    }, { onConflict: 'user_id,episode_id' });
    if (error) throw error;
    return true;
  },

  async getHistory(userId) {
    const { data, error } = await sb
      .from('watch_history')
      .select('*, episodes(*, anime(*)), anime(*)')
      .eq('user_id', userId)
      .order('watched_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async clearHistory(userId) {
    const { error } = await sb.from('watch_history').delete().eq('user_id', userId);
    if (error) throw error;
    return true;
  },

  // ---------- ADMIN: USERS ----------
  async getAllUsers() {
    const { data, error } = await sb.from('profiles').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async setUserAdmin(userId, isAdmin) {
    const { error } = await sb.from('profiles').update({ is_admin: isAdmin }).eq('id', userId);
    if (error) throw error;
    return true;
  },

  // ---------- ADMIN: STATS ----------
  async getStats() {
    const [anime, episodes, users, comments] = await Promise.all([
      sb.from('anime').select('id', { count: 'exact', head: true }),
      sb.from('episodes').select('id', { count: 'exact', head: true }),
      sb.from('profiles').select('id', { count: 'exact', head: true }),
      sb.from('comments').select('id', { count: 'exact', head: true }),
    ]);
    return {
      anime: anime.count || 0,
      episodes: episodes.count || 0,
      users: users.count || 0,
      comments: comments.count || 0,
    };
  }
};

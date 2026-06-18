/* =========================================================
   YUUMIRU - Admin Panel App Logic
   ========================================================= */

const AdminApp = {
  currentView: 'dashboard',
  genresCache: null,

  init() {
    document.querySelectorAll('.admin-nav-item[data-view]').forEach(btn => {
      btn.addEventListener('click', () => this.navigate(btn.dataset.view));
    });
    document.getElementById('adminLogoutBtn').addEventListener('click', () => YAuth.logout());
    document.getElementById('adminMobileToggle').addEventListener('click', () => {
      document.querySelector('.admin-sidebar').classList.toggle('open');
    });
    window.addEventListener('yuumiru:langchange', () => this.navigate(this.currentView, true));
    this.navigate('dashboard');
  },

  setActiveNav(view) {
    document.querySelectorAll('.admin-nav-item[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
  },

  navigate(view, isRefresh = false) {
    this.currentView = view;
    if (!isRefresh) document.querySelector('.admin-sidebar').classList.remove('open');
    this.setActiveNav(view.split(':')[0]);
    const titleMap = {
      dashboard: 'admin_dashboard', anime: 'admin_anime_list', users: 'admin_users', comments: 'admin_comments',
    };
    const baseView = view.split(':')[0];
    document.getElementById('adminViewTitle').textContent = Yi18n.t(titleMap[baseView] || baseView);

    if (view === 'dashboard') this.renderDashboard();
    else if (view === 'anime') this.renderAnimeList();
    else if (view === 'anime:new') this.renderAnimeForm(null);
    else if (view.startsWith('anime:edit:')) this.renderAnimeForm(view.split(':')[2]);
    else if (view.startsWith('anime:episodes:')) this.renderEpisodeList(view.split(':')[2]);
    else if (view === 'users') this.renderUsers();
    else if (view === 'comments') this.renderComments();
  },

  async getGenres() {
    if (!this.genresCache) this.genresCache = await YData.getAllGenres();
    return this.genresCache;
  },

  // ---------------- DASHBOARD ----------------
  async renderDashboard() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `<div class="admin-stats-grid" id="statsGrid"></div>`;
    try {
      const stats = await YData.getStats();
      document.getElementById('statsGrid').innerHTML = `
        <div class="admin-stat-card">
          <div class="admin-stat-value">${stats.anime}</div>
          <div class="admin-stat-label" data-i18n="admin_total_anime">Total Anime</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-value">${stats.episodes}</div>
          <div class="admin-stat-label" data-i18n="admin_total_episodes">Total Episode</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-value">${stats.users}</div>
          <div class="admin-stat-label" data-i18n="admin_total_users">Total Pengguna</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-value">${stats.comments}</div>
          <div class="admin-stat-label" data-i18n="admin_total_comments">Total Komentar</div>
        </div>
      `;
      Yi18n.applyToDOM(content);
    } catch (err) {
      console.error(err);
    }
  },

  // ---------------- ANIME LIST ----------------
  async renderAnimeList() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
      <div class="admin-toolbar">
        <div></div>
        <button class="btn btn-primary btn-sm" id="addAnimeBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
          <span data-i18n="admin_add_anime">Tambah Anime</span>
        </button>
      </div>
      <div class="admin-table-wrap"><div style="padding:24px;color:var(--text-muted);" data-i18n="loading">Memuat...</div></div>
    `;
    Yi18n.applyToDOM(content);
    document.getElementById('addAnimeBtn').addEventListener('click', () => this.navigate('anime:new'));

    try {
      const animeList = await YData.getAllAnime();
      const wrap = content.querySelector('.admin-table-wrap');
      if (!animeList.length) {
        wrap.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted);" data-i18n="admin_no_anime"></div>`;
        Yi18n.applyToDOM(wrap);
        return;
      }
      wrap.innerHTML = `
        <table class="admin-table">
          <thead><tr>
            <th></th>
            <th data-i18n="admin_table_title">Judul</th>
            <th data-i18n="admin_table_episodes">Episode</th>
            <th data-i18n="admin_table_status">Status</th>
            <th data-i18n="admin_table_actions">Aksi</th>
          </tr></thead>
          <tbody>
            ${animeList.map(a => `
              <tr>
                <td><img class="admin-table-thumb" src="${escapeHtml(a.cover_url||'')}" onerror="this.style.opacity=0"></td>
                <td><strong>${escapeHtml(a.title)}</strong></td>
                <td>${(a.episodes||[]).length}</td>
                <td><span class="anime-card-status ${a.status==='completed'?'status-completed':'status-ongoing'}" data-i18n="${a.status==='completed'?'status_completed':'status_ongoing'}"></span></td>
                <td>
                  <div class="admin-table-actions">
                    <button class="icon-btn" data-action="episodes" data-id="${a.id}" data-i18n-title="admin_action_episodes" title="Episodes">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    </button>
                    <button class="icon-btn" data-action="edit" data-id="${a.id}" data-i18n-title="admin_action_edit" title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="icon-btn danger" data-action="delete" data-id="${a.id}" data-i18n-title="admin_action_delete" title="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      Yi18n.applyToDOM(wrap);
      wrap.querySelectorAll('[data-action="episodes"]').forEach(b => b.addEventListener('click', () => this.navigate(`anime:episodes:${b.dataset.id}`)));
      wrap.querySelectorAll('[data-action="edit"]').forEach(b => b.addEventListener('click', () => this.navigate(`anime:edit:${b.dataset.id}`)));
      wrap.querySelectorAll('[data-action="delete"]').forEach(b => b.addEventListener('click', async () => {
        if (!confirm(Yi18n.t('admin_confirm_delete'))) return;
        try {
          await YData.deleteAnime(b.dataset.id);
          showToast(Yi18n.t('admin_deleted'), 'success');
          this.renderAnimeList();
        } catch (err) { showToast(Yi18n.t('error_generic'), 'error'); }
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // ---------------- ANIME FORM (add/edit) ----------------
  async renderAnimeForm(animeId) {
    const content = document.getElementById('adminContent');
    const isEdit = !!animeId;
    content.innerHTML = `
      <a class="admin-back-link" id="backToAnimeList">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span data-i18n="admin_back_to_anime">Kembali ke Daftar Anime</span>
      </a>
      <div class="admin-form-card">
        <div id="formInner">
          <div style="color:var(--text-muted);" data-i18n="loading">Memuat...</div>
        </div>
      </div>
    `;
    Yi18n.applyToDOM(content);
    document.getElementById('backToAnimeList').addEventListener('click', () => this.navigate('anime'));

    const genres = await this.getGenres();
    let anime = null;
    if (isEdit) {
      try { anime = await YData.getAnimeById(animeId); } catch (err) { console.error(err); }
    }
    const selectedGenreIds = anime ? (anime.anime_genres || []).map(ag => ag.genre_id) : [];

    const formInner = document.getElementById('formInner');
    formInner.innerHTML = `
      <h3 style="margin-bottom:20px;" data-i18n="${isEdit ? 'admin_edit_anime' : 'admin_add_anime'}"></h3>
      <form id="animeForm">
        <div class="admin-form-grid">
          <div class="form-group full-width">
            <label class="form-label" data-i18n="admin_form_title">Judul Anime</label>
            <input type="text" class="form-input" id="f_title" required value="${escapeHtml(anime?.title || '')}">
          </div>
          <div class="form-group full-width">
            <label class="form-label" data-i18n="admin_form_desc">Deskripsi</label>
            <textarea class="form-input" id="f_desc">${escapeHtml(anime?.description || '')}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="admin_form_cover">URL Cover (poster)</label>
            <input type="url" class="form-input" id="f_cover" value="${escapeHtml(anime?.cover_url || '')}" placeholder="https://...">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="admin_form_banner">URL Banner (latar)</label>
            <input type="url" class="form-input" id="f_banner" value="${escapeHtml(anime?.banner_url || '')}" placeholder="https://...">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="admin_form_year">Tahun Rilis</label>
            <input type="number" class="form-input" id="f_year" min="1960" max="2100" value="${anime?.release_year || new Date().getFullYear()}">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="admin_form_status">Status</label>
            <select class="form-input" id="f_status">
              <option value="ongoing" ${anime?.status!=='completed'?'selected':''} data-i18n="admin_status_ongoing"></option>
              <option value="completed" ${anime?.status==='completed'?'selected':''} data-i18n="admin_status_completed"></option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label" data-i18n="admin_form_genres">Pilih Genre</label>
            <div class="admin-genre-checks" id="genreChecks">
              ${genres.map(g => `
                <label class="genre-check-pill ${selectedGenreIds.includes(g.id) ? 'checked' : ''}">
                  <input type="checkbox" value="${g.id}" ${selectedGenreIds.includes(g.id) ? 'checked' : ''}>
                  <span data-i18n-genre="${g.name}">${g.name}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="admin-form-actions">
          <button type="submit" class="btn btn-primary" id="saveAnimeBtn" data-i18n="admin_save">Simpan Anime</button>
          <button type="button" class="btn btn-ghost" id="cancelAnimeBtn" data-i18n="admin_cancel">Batal</button>
        </div>
      </form>
    `;
    Yi18n.applyToDOM(formInner);

    formInner.querySelectorAll('.genre-check-pill').forEach(pill => {
      const checkbox = pill.querySelector('input');
      checkbox.addEventListener('change', () => pill.classList.toggle('checked', checkbox.checked));
    });

    document.getElementById('cancelAnimeBtn').addEventListener('click', () => this.navigate('anime'));

    document.getElementById('animeForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('saveAnimeBtn');
      btn.disabled = true;
      const payload = {
        title: document.getElementById('f_title').value.trim(),
        description: document.getElementById('f_desc').value.trim(),
        cover_url: document.getElementById('f_cover').value.trim(),
        banner_url: document.getElementById('f_banner').value.trim(),
        release_year: parseInt(document.getElementById('f_year').value) || null,
        status: document.getElementById('f_status').value,
      };
      const genreIds = Array.from(formInner.querySelectorAll('.genre-check-pill input:checked')).map(i => i.value);

      try {
        if (isEdit) {
          await YData.updateAnime(animeId, payload, genreIds);
          showToast(Yi18n.t('admin_updated'), 'success');
        } else {
          payload.created_by = YAuth.user.id;
          await YData.createAnime(payload, genreIds);
          showToast(Yi18n.t('admin_added'), 'success');
        }
        this.navigate('anime');
      } catch (err) {
        console.error(err);
        showToast(Yi18n.t('error_generic'), 'error');
        btn.disabled = false;
      }
    });
  },

  // ---------------- EPISODE LIST / MANAGEMENT ----------------
  async renderEpisodeList(animeId) {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
      <a class="admin-back-link" id="backToAnimeList">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span data-i18n="admin_back_to_anime">Kembali ke Daftar Anime</span>
      </a>
      <div id="episodeListInner"><div style="color:var(--text-muted);" data-i18n="loading">Memuat...</div></div>
    `;
    Yi18n.applyToDOM(content);
    document.getElementById('backToAnimeList').addEventListener('click', () => this.navigate('anime'));

    try {
      const anime = await YData.getAnimeById(animeId);
      const episodes = anime.episodes || [];
      const inner = document.getElementById('episodeListInner');
      inner.innerHTML = `
        <div class="admin-toolbar">
          <h3><span data-i18n="admin_ep_list_for">Episode untuk</span> ${escapeHtml(anime.title)}</h3>
          <button class="btn btn-primary btn-sm" id="addEpisodeBtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>
            <span data-i18n="admin_add_episode">Tambah Episode</span>
          </button>
        </div>
        <div class="admin-table-wrap" id="episodeTableWrap">
          ${episodes.length ? `
            <table class="admin-table">
              <thead><tr>
                <th></th><th>EP</th><th data-i18n="admin_table_title">Judul</th><th data-i18n="admin_ep_form_type">Tipe</th><th data-i18n="admin_table_actions">Aksi</th>
              </tr></thead>
              <tbody>
                ${episodes.map(ep => `
                  <tr>
                    <td><img class="admin-table-thumb" src="${escapeHtml(ep.thumbnail_url||'')}" onerror="this.style.opacity=0"></td>
                    <td><span style="font-family:var(--font-mono);color:var(--gold);">${String(ep.episode_number).padStart(2,'0')}</span></td>
                    <td>${escapeHtml(ep.title || '-')}</td>
                    <td>${ep.video_type === 'direct' ? 'MP4' : 'iFrame'}</td>
                    <td>
                      <div class="admin-table-actions">
                        <button class="icon-btn" data-action="edit-ep" data-id="${ep.id}" data-i18n-title="admin_action_edit" title="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="icon-btn danger" data-action="delete-ep" data-id="${ep.id}" data-i18n-title="admin_action_delete" title="Delete">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `<div style="padding:40px;text-align:center;color:var(--text-muted);" data-i18n="admin_no_episodes"></div>`}
        </div>
        <div id="episodeFormContainer" style="margin-top:24px;"></div>
      `;
      Yi18n.applyToDOM(inner);

      document.getElementById('addEpisodeBtn').addEventListener('click', () => this.renderEpisodeForm(animeId, null, episodes.length + 1));
      inner.querySelectorAll('[data-action="edit-ep"]').forEach(b => {
        const ep = episodes.find(e => e.id === b.dataset.id);
        b.addEventListener('click', () => this.renderEpisodeForm(animeId, ep));
      });
      inner.querySelectorAll('[data-action="delete-ep"]').forEach(b => b.addEventListener('click', async () => {
        if (!confirm(Yi18n.t('admin_confirm_delete'))) return;
        try {
          await YData.deleteEpisode(b.dataset.id);
          showToast(Yi18n.t('admin_deleted'), 'success');
          this.renderEpisodeList(animeId);
        } catch (err) { showToast(Yi18n.t('error_generic'), 'error'); }
      }));
    } catch (err) {
      console.error(err);
    }
  },

  renderEpisodeForm(animeId, episode, suggestedNumber) {
    const container = document.getElementById('episodeFormContainer');
    const isEdit = !!episode;
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 style="margin-bottom:20px;" data-i18n="${isEdit ? 'admin_edit_episode' : 'admin_add_episode'}"></h3>
        <form id="episodeForm">
          <div class="admin-form-grid">
            <div class="form-group">
              <label class="form-label" data-i18n="admin_ep_form_number">Nomor Episode</label>
              <input type="number" class="form-input" id="ep_number" min="1" required value="${episode?.episode_number ?? suggestedNumber ?? 1}">
            </div>
            <div class="form-group">
              <label class="form-label" data-i18n="admin_ep_form_title">Judul Episode (opsional)</label>
              <input type="text" class="form-input" id="ep_title" value="${escapeHtml(episode?.title || '')}">
            </div>
            <div class="form-group full-width">
              <label class="form-label" data-i18n="admin_ep_form_url">URL Video</label>
              <input type="url" class="form-input" id="ep_url" required value="${escapeHtml(episode?.video_url || '')}" placeholder="https://...">
            </div>
            <div class="form-group">
              <label class="form-label" data-i18n="admin_ep_form_type">Tipe Video</label>
              <select class="form-input" id="ep_type">
                <option value="iframe" ${episode?.video_type!=='direct'?'selected':''} data-i18n="admin_ep_form_type_iframe"></option>
                <option value="direct" ${episode?.video_type==='direct'?'selected':''} data-i18n="admin_ep_form_type_direct"></option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" data-i18n="admin_ep_form_thumb">URL Thumbnail</label>
              <input type="url" class="form-input" id="ep_thumb" value="${escapeHtml(episode?.thumbnail_url || '')}" placeholder="https://...">
            </div>
            <div class="form-group full-width">
              <label class="form-label" data-i18n="admin_ep_form_next">Waktu Episode Berikutnya Rilis</label>
              <input type="datetime-local" class="form-input" id="ep_next" value="${episode?.next_episode_at ? toLocalDatetimeValue(episode.next_episode_at) : ''}">
            </div>
          </div>
          <div class="admin-form-actions">
            <button type="submit" class="btn btn-primary" id="saveEpBtn" data-i18n="admin_save_ep">Simpan Episode</button>
            <button type="button" class="btn btn-ghost" id="cancelEpBtn" data-i18n="admin_cancel">Batal</button>
          </div>
        </form>
      </div>
    `;
    Yi18n.applyToDOM(container);
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });

    document.getElementById('cancelEpBtn').addEventListener('click', () => { container.innerHTML = ''; });

    document.getElementById('episodeForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('saveEpBtn');
      btn.disabled = true;
      const nextVal = document.getElementById('ep_next').value;
      const payload = {
        anime_id: animeId,
        episode_number: parseInt(document.getElementById('ep_number').value),
        title: document.getElementById('ep_title').value.trim() || null,
        video_url: document.getElementById('ep_url').value.trim(),
        video_type: document.getElementById('ep_type').value,
        thumbnail_url: document.getElementById('ep_thumb').value.trim() || null,
        next_episode_at: nextVal ? new Date(nextVal).toISOString() : null,
      };
      try {
        if (isEdit) {
          await YData.updateEpisode(episode.id, payload);
          showToast(Yi18n.t('admin_updated'), 'success');
        } else {
          await YData.createEpisode(payload);
          showToast(Yi18n.t('admin_added'), 'success');
        }
        this.renderEpisodeList(animeId);
      } catch (err) {
        console.error(err);
        showToast(Yi18n.t('error_generic'), 'error');
        btn.disabled = false;
      }
    });
  },

  // ---------------- USERS ----------------
  allUsersCache: null,
  async renderUsers() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `
      <div class="admin-toolbar">
        <input type="search" class="form-input admin-search-input" id="userSearchInput" data-i18n-placeholder="admin_search_users" placeholder="Cari pengguna...">
        <div></div>
      </div>
      <div class="admin-table-wrap" id="usersTableWrap"><div style="padding:24px;color:var(--text-muted);" data-i18n="loading"></div></div>
    `;
    Yi18n.applyToDOM(content);

    try {
      this.allUsersCache = await YData.getAllUsers();
      this.renderUsersTable(this.allUsersCache);
      document.getElementById('userSearchInput').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        const filtered = this.allUsersCache.filter(u =>
          u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        );
        this.renderUsersTable(filtered);
      });
    } catch (err) {
      console.error(err);
    }
  },

  renderUsersTable(users) {
    const wrap = document.getElementById('usersTableWrap');
    if (!users.length) {
      wrap.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted);">—</div>`;
      return;
    }
    wrap.innerHTML = `
      <table class="admin-table">
        <thead><tr>
          <th></th>
          <th data-i18n="admin_table_username">Username</th>
          <th data-i18n="admin_table_email">Email</th>
          <th data-i18n="admin_table_role">Peran</th>
          <th data-i18n="admin_table_joined">Bergabung</th>
          <th data-i18n="admin_table_actions">Aksi</th>
        </tr></thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td><div style="width:36px;height:36px;border-radius:50%;overflow:hidden;background:var(--bg-elevated-2);"><img src="${escapeHtml(u.avatar_url||'')}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.opacity=0"></div></td>
              <td><strong>${escapeHtml(u.username)}</strong></td>
              <td style="color:var(--text-muted);">${escapeHtml(u.email)}</td>
              <td><span class="role-badge ${u.is_admin ? 'admin' : 'user'}" data-i18n="${u.is_admin ? 'admin_role_admin' : 'admin_role_user'}"></span></td>
              <td style="color:var(--text-muted);font-size:13px;">${new Date(u.created_at).toLocaleDateString()}</td>
              <td>
                <button class="btn btn-ghost btn-sm" data-toggle-admin="${u.id}" data-current="${u.is_admin}" data-i18n="${u.is_admin ? 'admin_revoke_admin' : 'admin_make_admin'}"></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    Yi18n.applyToDOM(wrap);
    wrap.querySelectorAll('[data-toggle-admin]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.dataset.toggleAdmin;
        const current = btn.dataset.current === 'true';
        try {
          await YData.setUserAdmin(userId, !current);
          showToast(Yi18n.t('admin_updated'), 'success');
          this.renderUsers();
        } catch (err) { showToast(Yi18n.t('error_generic'), 'error'); }
      });
    });
  },

  // ---------------- COMMENTS ----------------
  async renderComments() {
    const content = document.getElementById('adminContent');
    content.innerHTML = `<div class="admin-table-wrap"><div style="padding:24px;color:var(--text-muted);" data-i18n="loading"></div></div>`;
    Yi18n.applyToDOM(content);
    try {
      const { data, error } = await sb
        .from('comments')
        .select('*, profiles(username), episodes(episode_number, anime_id, anime(title))')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) throw error;
      const wrap = content.querySelector('.admin-table-wrap');
      if (!data.length) {
        wrap.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted);">—</div>`;
        return;
      }
      wrap.innerHTML = `
        <table class="admin-table">
          <thead><tr>
            <th data-i18n="admin_table_user">Pengguna</th>
            <th data-i18n="admin_table_comment">Komentar</th>
            <th data-i18n="admin_table_episode">Episode</th>
            <th data-i18n="admin_table_date">Tanggal</th>
            <th data-i18n="admin_table_actions">Aksi</th>
          </tr></thead>
          <tbody>
            ${data.map(c => `
              <tr>
                <td><strong>${escapeHtml(c.profiles?.username || '-')}</strong></td>
                <td style="max-width:320px;">${escapeHtml(c.content)}</td>
                <td style="color:var(--text-muted);font-size:13px;">${escapeHtml(c.episodes?.anime?.title || '-')} EP${c.episodes?.episode_number ?? '-'}</td>
                <td style="color:var(--text-muted);font-size:13px;">${new Date(c.created_at).toLocaleDateString()}</td>
                <td>
                  <button class="icon-btn danger" data-delete-comment="${c.id}" data-i18n-title="admin_action_delete" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      Yi18n.applyToDOM(wrap);
      wrap.querySelectorAll('[data-delete-comment]').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm(Yi18n.t('admin_confirm_delete'))) return;
          try {
            await YData.deleteComment(btn.dataset.deleteComment);
            showToast(Yi18n.t('admin_deleted'), 'success');
            this.renderComments();
          } catch (err) { showToast(Yi18n.t('error_generic'), 'error'); }
        });
      });
    } catch (err) {
      console.error(err);
    }
  },
};

function toLocalDatetimeValue(isoStr) {
  const d = new Date(isoStr);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}


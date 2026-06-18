/* =========================================================
   YUUMIRU - Auth Module
   ========================================================= */

const YAuth = {
  user: null,
  profile: null,

  async init() {
    const { data } = await sb.auth.getSession();
    if (data.session) {
      this.user = data.session.user;
      await this.loadProfile();
    }
    sb.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        this.user = session.user;
        await this.loadProfile();
      } else {
        this.user = null;
        this.profile = null;
      }
      window.dispatchEvent(new CustomEvent('yuumiru:authchange'));
    });
    return this;
  },

  async loadProfile() {
    if (!this.user) return null;
    const { data, error } = await sb.from('profiles').select('*').eq('id', this.user.id).single();
    if (!error) {
      this.profile = data;
      // Sync language preference from profile if set
      if (data.language && data.language !== Yi18n.current) {
        Yi18n.setLanguage(data.language);
      }
    }
    return this.profile;
  },

  isLoggedIn() {
    return !!this.user;
  },

  isAdmin() {
    return !!(this.profile && this.profile.is_admin);
  },

  async register(username, email, password) {
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: { data: { username } }
    });
    if (error) throw error;
    return data;
  },

  async login(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    this.user = data.user;
    await this.loadProfile();
    return data;
  },

  async logout() {
    await sb.auth.signOut();
    this.user = null;
    this.profile = null;
    window.location.href = 'index.html';
  },

  async updateProfile(fields) {
    if (!this.user) throw new Error('Not logged in');
    const { data, error } = await sb.from('profiles').update(fields).eq('id', this.user.id).select().single();
    if (error) throw error;
    this.profile = data;
    return data;
  },

  async updateLanguage(lang) {
    if (this.isLoggedIn()) {
      try { await this.updateProfile({ language: lang }); } catch (e) { /* fail silently, local still works */ }
    }
  }
};

// Map friendlier error messages
function friendlyAuthError(error) {
  const msg = (error && error.message) || '';
  if (msg.includes('Invalid login credentials')) return null; // handled per-language by caller
  if (msg.includes('already registered') || msg.includes('User already registered')) return null;
  return msg;
}

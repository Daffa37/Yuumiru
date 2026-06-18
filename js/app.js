// =============================================
// YUUMIRU - Auth & Core App Logic
// =============================================

// Initialize Supabase
let supabase;
try {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch(e) {
  console.warn('Supabase not initialized. Please configure SUPABASE_URL and SUPABASE_ANON_KEY in config.js');
}

// ---- STATE ----
let currentUser = null;
let currentProfile = null;
let sidebarOpen = false;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', async () => {
  await initAuth();
  initSidebar();
  initSearch();
  renderNav();
  
  // Hide loader
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) { loader.classList.add('hidden'); setTimeout(() => loader.remove(), 500); }
  }, 800);
});

// ---- AUTH ----
async function initAuth() {
  if (!supabase) return;
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    currentUser = session.user;
    await loadProfile();
    // Apply saved language
    if (currentProfile?.language) setLang(currentProfile.language);
  }
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user;
      await loadProfile();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null; currentProfile = null;
    }
    renderNav();
  });
}

async function loadProfile() {
  if (!currentUser || !supabase) return;
  const { data } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
  currentProfile = data;
  if (data?.language) { setLang(data.language); }
}

async function signUp(email, password, username) {
  if (!supabase) { showToast('Supabase not configured', 'error'); return null; }
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { username } }
  });
  if (error) throw error;
  return data;
}

async function signIn(email, password) {
  if (!supabase) { showToast('Supabase not configured', 'error'); return null; }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
  currentUser = null; currentProfile = null;
  showToast('Signed out successfully', 'success');
  renderNav();
  window.location.href = 'index.html';
}

// ---- NAVIGATION RENDER ----
function renderNav() {
  const actions = document.getElementById('nav-actions');
  if (!actions) return;
  
  if (currentUser && currentProfile) {
    const isAdmin = currentProfile.is_admin;
    actions.innerHTML = `
      ${isAdmin ? `<a href="admin/index.html" class="nav-icon-btn" title="Admin">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span class="desktop-only">Admin</span>
      </a>` : ''}
      <a href="pages/history.html" class="nav-icon-btn" id="nav-history">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span class="desktop-only" data-i18n="history">History</span>
      </a>
      <a href="pages/profile.html" class="nav-icon-btn">
        <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#9333ea,#7c3aed);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.8rem;">
          ${(currentProfile.username || 'U')[0].toUpperCase()}
        </div>
      </a>
    `;
  } else {
    actions.innerHTML = `
      <button class="btn-ghost" onclick="openModal('login')" data-i18n="login">Login</button>
      <button class="btn-primary" onclick="openModal('register')" data-i18n="register">Register</button>
    `;
  }
  applyTranslations();
}

// ---- SIDEBAR ----
function initSidebar() {
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  renderSidebar();
  document.addEventListener('langChanged', renderSidebar);
}

function renderSidebar() {
  const genreGrid = document.getElementById('sidebar-genre-grid');
  if (genreGrid) {
    genreGrid.innerHTML = GENRES.map(g => {
      const key = g.toLowerCase().replace(/[\s-]/g, '');
      return `<a href="pages/search.html?genre=${encodeURIComponent(g)}" class="genre-chip">${t(key) || g}</a>`;
    }).join('');
  }
  const subCard = document.getElementById('subscribe-card');
  if (subCard) {
    subCard.querySelector('h4').textContent = t('subscribe');
    subCard.querySelector('p').textContent = t('subscribeDesc');
  }
}

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open', sidebarOpen);
  if (overlay) overlay.classList.toggle('active', sidebarOpen);
  document.body.style.overflow = sidebarOpen ? 'hidden' : '';
}

function closeSidebar() {
  sidebarOpen = false;
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- SEARCH ----
function initSearch() {
  const searchInput = document.getElementById('nav-search-input');
  if (!searchInput) return;
  let timeout;
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.value.trim();
      if (q) window.location.href = `pages/search.html?q=${encodeURIComponent(q)}`;
    }
  });
  searchInput.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const q = searchInput.value.trim();
      if (q.length >= 2) {
        // Could show inline dropdown
      }
    }, 300);
  });
}

// ---- MODALS ----
function openModal(type) {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  document.getElementById('modal-login').style.display = type === 'login' ? 'block' : 'none';
  document.getElementById('modal-register').style.display = type === 'register' ? 'block' : 'none';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

// ---- LOGIN HANDLER ----
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');
  
  btn.disabled = true; btn.textContent = t('loading');
  errEl.classList.remove('show');
  
  try {
    await signIn(email, password);
    closeModal();
    showToast(t('success'), 'success');
    renderNav();
    setTimeout(() => location.reload(), 500);
  } catch(err) {
    errEl.textContent = err.message; errEl.classList.add('show');
  } finally {
    btn.disabled = false; btn.textContent = t('loginBtn');
  }
}

// ---- REGISTER HANDLER ----
async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const btn = document.getElementById('register-btn');
  const errEl = document.getElementById('register-error');
  
  btn.disabled = true; btn.textContent = t('loading');
  errEl.classList.remove('show');
  
  try {
    await signUp(email, password, username);
    closeModal();
    showToast('Account created! Please check your email to verify.', 'success');
  } catch(err) {
    errEl.textContent = err.message; errEl.classList.add('show');
  } finally {
    btn.disabled = false; btn.textContent = t('registerBtn');
  }
}

// ---- PASSWORD TOGGLE ----
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
}

// ---- WATCH HISTORY ----
async function addToHistory(videoId) {
  if (!currentUser || !supabase) return;
  await supabase.from('watch_history').upsert({ user_id: currentUser.id, video_id: videoId, watched_at: new Date().toISOString() }, { onConflict: 'user_id,video_id' });
}

// ---- INCREMENT VIEWS ----
async function incrementViews(videoId) {
  if (!supabase) return;
  await supabase.rpc('increment_views', { video_id: videoId }).catch(() => {
    supabase.from('videos').select('views').eq('id', videoId).single().then(({ data }) => {
      if (data) supabase.from('videos').update({ views: (data.views || 0) + 1 }).eq('id', videoId);
    });
  });
}

// ---- TOAST ----
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  toast.innerHTML = `<span style="font-size:1rem">${icons[type] || 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'slideOut 0.3s ease forwards'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ---- APPLY TRANSLATIONS ----
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

document.addEventListener('langChanged', applyTranslations);

// Close sidebar when pressing Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSidebar(); closeModal(); }
});

// Format number
function formatNum(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n/1000).toFixed(1) + 'K';
  return String(n || 0);
}

// Format date
function formatDate(d) {
  return new Date(d).toLocaleDateString(currentLang === 'id' ? 'id-ID' : currentLang === 'ja' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

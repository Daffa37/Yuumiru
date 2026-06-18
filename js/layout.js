/* =========================================================
   YUUMIRU - Shared Layout Components (navbar, sidebar, footer, toast, modal)
   Injected into every page via #app-navbar, #app-sidebar, #app-footer placeholders
   ========================================================= */

const GENRES_STATIC = [
  "Action","Adventure","Comedy","Drama","Fantasy","Sci-Fi","Romance","Slice of Life",
  "Horror","Mystery","Psychological","Thriller","Supernatural","Sports","Mecha",
  "Cyberpunk","Historical","Military","Music","Gourmet","Shounen","Shoujo","Seinen","Josei","Isekai"
];

function slugify(name) { return name.toLowerCase().replace(/\s+/g, '-'); }

const YLayout = {

  renderNavbar() {
    const el = document.getElementById('app-navbar');
    if (!el) return;
    el.innerHTML = `
      <nav class="navbar" id="navbar">
        <button class="nav-burger" id="sidebarToggle" data-i18n-title="side_menu" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round"/></svg>
        </button>
        <a href="index.html" class="nav-logo">Yuumi<span>ru</span></a>
        <div class="nav-search" id="navSearch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>
          <input type="search" id="navSearchInput" data-i18n-placeholder="nav_search_placeholder" placeholder="Cari anime..." autocomplete="off">
        </div>
        <div class="nav-right">
          <button class="nav-icon-btn nav-search-toggle" id="navSearchToggle" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" stroke-linecap="round"/></svg>
          </button>
          <a href="history.html" class="nav-icon-btn" data-i18n-title="nav_history" aria-label="History">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5M3.05 13a9 9 0 1 0 2.13-7.36L3 8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7v5l4 2" stroke-linecap="round"/></svg>
          </a>
          <div id="navAuthArea"></div>
        </div>
      </nav>
    `;
    this.bindNavbarEvents();
  },

  bindNavbarEvents() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });

    // Mobile search toggle
    const toggle = document.getElementById('navSearchToggle');
    const search = document.getElementById('navSearch');
    toggle.addEventListener('click', () => search.classList.toggle('mobile-active'));

    // Search submit -> redirect to search.html?q=
    const input = document.getElementById('navSearchInput');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    });

    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', () => YLayout.openSidebar());

    this.renderAuthArea();
    window.addEventListener('yuumiru:authchange', () => this.renderAuthArea());
  },

  renderAuthArea() {
    const area = document.getElementById('navAuthArea');
    if (!area) return;
    if (YAuth.isLoggedIn() && YAuth.profile) {
      const avatar = YAuth.profile.avatar_url || 'https://api.dicebear.com/7.x/shapes/svg?seed=yuumiru';
      area.innerHTML = `
        <div class="nav-dropdown" id="userDropdown">
          <div class="nav-avatar" id="userAvatarBtn"><img src="${escapeHtml(avatar)}" alt="avatar"></div>
          <div class="nav-dropdown-menu">
            <div style="padding:14px 16px;border-bottom:1px solid var(--border);">
              <div style="font-weight:700;font-size:14px;">${escapeHtml(YAuth.profile.username)}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${escapeHtml(YAuth.profile.email)}</div>
            </div>
            <a href="profile.html" class="nav-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
              <span data-i18n="nav_profile">Profil</span>
            </a>
            <a href="history.html" class="nav-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5M3.05 13a9 9 0 1 0 2.13-7.36L3 8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span data-i18n="nav_history">Riwayat</span>
            </a>
            ${YAuth.isAdmin() ? `
            <a href="admin.html" class="nav-dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"/></svg>
              <span data-i18n="nav_admin">Admin Panel</span>
            </a>` : ''}
            <div class="nav-dropdown-divider"></div>
            <button class="nav-dropdown-item" id="logoutBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span data-i18n="nav_logout">Keluar</span>
            </button>
          </div>
        </div>
      `;
      document.getElementById('userAvatarBtn').addEventListener('click', () => {
        document.getElementById('userDropdown').classList.toggle('open');
      });
      document.getElementById('logoutBtn').addEventListener('click', () => YAuth.logout());
      document.addEventListener('click', (e) => {
        const dd = document.getElementById('userDropdown');
        if (dd && !dd.contains(e.target)) dd.classList.remove('open');
      });
    } else {
      area.innerHTML = `
        <div class="nav-auth-btns">
          <a href="login.html" class="btn btn-ghost btn-sm" data-i18n="nav_login">Masuk</a>
          <a href="register.html" class="btn btn-primary btn-sm" data-i18n="nav_register">Daftar</a>
        </div>
      `;
    }
    Yi18n.applyToDOM(area);
  },

  renderSidebar() {
    const el = document.getElementById('app-sidebar');
    if (!el) return;
    const genreLinks = GENRES_STATIC.map(g => `
      <a href="genre.html?slug=${slugify(g)}" class="sidebar-link">
        <span data-i18n-genre="${g}">${g}</span>
      </a>
    `).join('');

    el.innerHTML = `
      <div class="sidebar-overlay" id="sidebarOverlay"></div>
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <a href="index.html" class="nav-logo">Yuumi<span>ru</span></a>
          <button class="sidebar-close" id="sidebarClose" data-i18n-title="side_close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-label" data-i18n="side_menu">Menu Navigasi</div>
          <a href="index.html" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-9"/></svg>
            <span data-i18n="side_home">Beranda</span>
          </a>
          <a href="genres.html" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            <span data-i18n="side_genres">Kategori Genre</span>
          </a>
          <a href="history.html" class="sidebar-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v5h5M3.05 13a9 9 0 1 0 2.13-7.36L3 8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span data-i18n="nav_history">Riwayat</span>
          </a>
        </div>
        <div class="sidebar-section">
          <div class="sidebar-section-label" data-i18n="side_genres">Kategori Genre</div>
          <div class="sidebar-genres-grid">${genreLinks}</div>
        </div>
        <div class="sidebar-section">
          <a href="${CONTACT.whatsappLink}" target="_blank" rel="noopener" class="sidebar-subscribe">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span data-i18n="side_subscribe">Berlangganan</span>
          </a>
        </div>
        <div class="sidebar-section">
          <a href="contact.html" class="sidebar-link" data-i18n="side_contact">Kontak</a>
          <a href="terms.html" class="sidebar-link" data-i18n="side_terms">Syarat & Ketentuan</a>
          <a href="privacy.html" class="sidebar-link" data-i18n="side_privacy">Privasi</a>
          <a href="faq.html" class="sidebar-link" data-i18n="side_faq">FAQ</a>
        </div>
      </aside>
    `;

    document.getElementById('sidebarClose').addEventListener('click', () => this.closeSidebar());
    document.getElementById('sidebarOverlay').addEventListener('click', () => this.closeSidebar());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeSidebar(); });
  },

  openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('open');
  },
  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  },

  renderFooter() {
    const el = document.getElementById('app-footer');
    if (!el) return;
    el.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="nav-logo">Yuumi<span>ru</span></div>
              <p data-i18n="footer_tagline">Tempat terbaik untuk streaming anime favoritmu.</p>
            </div>
            <div>
              <div class="footer-col-title" data-i18n="footer_explore">Jelajahi</div>
              <a href="index.html" class="footer-link" data-i18n="nav_home">Beranda</a>
              <a href="genres.html" class="footer-link" data-i18n="nav_genres">Genre</a>
              <a href="history.html" class="footer-link" data-i18n="nav_history">Riwayat</a>
            </div>
            <div>
              <div class="footer-col-title" data-i18n="footer_legal">Legal</div>
              <a href="terms.html" class="footer-link" data-i18n="side_terms">Syarat & Ketentuan</a>
              <a href="privacy.html" class="footer-link" data-i18n="side_privacy">Privasi</a>
              <a href="faq.html" class="footer-link" data-i18n="side_faq">FAQ</a>
              <a href="contact.html" class="footer-link" data-i18n="side_contact">Kontak</a>
            </div>
            <div>
              <div class="footer-col-title" data-i18n="footer_connect">Hubungi Kami</div>
              <a href="mailto:${CONTACT.email}" class="footer-link">${CONTACT.email}</a>
              <a href="${CONTACT.whatsappLink}" target="_blank" rel="noopener" class="footer-link">WhatsApp</a>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="footer-copy">&copy; ${new Date().getFullYear()} Yuumiru. <span data-i18n="footer_rights">Seluruh hak cipta dilindungi.</span></div>
            <div class="footer-social">
              <a href="mailto:${CONTACT.email}" aria-label="Email" title="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              </a>
              <a href="${CONTACT.instagramLink}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
              </a>
              <a href="${CONTACT.youtubeLink}" target="_blank" rel="noopener" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/></svg>
              </a>
              <a href="${CONTACT.whatsappLink}" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  init() {
    this.renderNavbar();
    this.renderSidebar();
    this.renderFooter();
    Yi18n.applyToDOM();
  }
};

// ============ TOAST ============
function showToast(message, type = 'success') {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ ESCAPE HTML (XSS safety for user content) ============
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// ============ LOADING SCREEN HELPERS ============
function hideLoadingScreen() {
  const el = document.getElementById('loading-screen');
  if (el) {
    el.classList.add('hide');
    setTimeout(() => el.remove(), 350);
  }
}

// ============ SUBSCRIBE MODAL (global, used by sidebar/buttons) ============
function openSubscribeModal() {
  let modal = document.getElementById('subscribeModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'subscribeModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card" style="position:relative;">
        <button class="modal-close-x" id="subModalClose" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="modal-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
        </div>
        <h3 data-i18n="sub_title">Berlangganan Yuumiru Premium</h3>
        <p data-i18n="sub_desc">Nikmati akses penuh tanpa batas dengan berlangganan melalui WhatsApp kami.</p>
        <a href="${CONTACT.whatsappLink}" target="_blank" rel="noopener" class="btn btn-primary btn-block" data-i18n="sub_btn">Chat via WhatsApp</a>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('subModalClose').addEventListener('click', closeSubscribeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeSubscribeModal(); });
    Yi18n.applyToDOM(modal);
  }
  modal.classList.add('open');
}
function closeSubscribeModal() {
  const modal = document.getElementById('subscribeModal');
  if (modal) modal.classList.remove('open');
}

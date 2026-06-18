// =============================================
// SUPABASE CONFIGURATION
// Replace these with your actual Supabase credentials
// =============================================
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

// =============================================
// TRANSLATIONS
// =============================================
const TRANSLATIONS = {
  en: {
    // Navbar
    home: 'Home',
    search: 'Search',
    history: 'History',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    // Sidebar
    menu: 'Menu',
    categories: 'Categories',
    subscribe: 'Subscribe',
    subscribeDesc: 'Get premium access',
    // Genres
    action: 'Action', adventure: 'Adventure', comedy: 'Comedy', drama: 'Drama',
    fantasy: 'Fantasy', scifi: 'Sci-Fi', romance: 'Romance', sliceoflife: 'Slice of Life',
    horror: 'Horror', mystery: 'Mystery', psychological: 'Psychological', thriller: 'Thriller',
    supernatural: 'Supernatural', sports: 'Sports', mecha: 'Mecha', cyberpunk: 'Cyberpunk',
    historical: 'Historical', military: 'Military', music: 'Music', gourmet: 'Gourmet',
    shounen: 'Shounen', shoujo: 'Shoujo', seinen: 'Seinen', josei: 'Josei', isekai: 'Isekai',
    // Home
    featured: 'Featured',
    trending: 'Trending Now',
    recentlyAdded: 'Recently Added',
    watchNow: 'Watch Now',
    moreInfo: 'More Info',
    noContent: 'No content available yet. Check back later!',
    // Video
    episode: 'Episode',
    nextEpisode: 'Next Episode In',
    comments: 'Comments',
    like: 'Like',
    dislike: 'Dislike',
    addComment: 'Add a comment...',
    postComment: 'Post',
    genre: 'Genre',
    // Auth
    email: 'Email',
    password: 'Password',
    username: 'Username',
    loginTitle: 'Sign In',
    registerTitle: 'Create Account',
    loginBtn: 'Sign In',
    registerBtn: 'Sign Up',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    // Profile
    editProfile: 'Edit Profile',
    language: 'Language',
    saveChanges: 'Save Changes',
    watchHistory: 'Watch History',
    // Search
    searchPlaceholder: 'Search titles, genres...',
    searchResults: 'Search Results',
    noResults: 'No results found',
    // Pages
    contact: 'Contact',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    faq: 'FAQ',
    // History
    historyTitle: 'Watch History',
    clearHistory: 'Clear History',
    emptyHistory: 'No watch history yet',
    // Admin
    adminPanel: 'Admin Panel',
    addVideo: 'Add Video',
    manageVideos: 'Manage Videos',
    manageUsers: 'Manage Users',
    dashboard: 'Dashboard',
    totalVideos: 'Total Videos',
    totalUsers: 'Total Users',
    totalComments: 'Total Comments',
    deleteConfirm: 'Are you sure you want to delete this?',
    // Misc
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success!',
    close: 'Close',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    title: 'Title',
    description: 'Description',
    videoUrl: 'Video URL',
    thumbnailUrl: 'Thumbnail URL',
    selectGenre: 'Select Genre',
    episodeNumber: 'Episode Number',
    duration: 'Duration (minutes)',
    views: 'Views',
    publishedAt: 'Published At',
  },
  id: {
    home: 'Beranda', search: 'Cari', history: 'Riwayat', login: 'Masuk', register: 'Daftar',
    logout: 'Keluar', profile: 'Profil',
    menu: 'Menu', categories: 'Kategori', subscribe: 'Berlangganan', subscribeDesc: 'Dapatkan akses premium',
    action: 'Aksi', adventure: 'Petualangan', comedy: 'Komedi', drama: 'Drama',
    fantasy: 'Fantasi', scifi: 'Fiksi Ilmiah', romance: 'Romantis', sliceoflife: 'Kehidupan Sehari-hari',
    horror: 'Horor', mystery: 'Misteri', psychological: 'Psikologis', thriller: 'Thriller',
    supernatural: 'Supranatural', sports: 'Olahraga', mecha: 'Mecha', cyberpunk: 'Cyberpunk',
    historical: 'Sejarah', military: 'Militer', music: 'Musik', gourmet: 'Kuliner',
    shounen: 'Shounen', shoujo: 'Shoujo', seinen: 'Seinen', josei: 'Josei', isekai: 'Isekai',
    featured: 'Unggulan', trending: 'Sedang Trending', recentlyAdded: 'Baru Ditambahkan',
    watchNow: 'Tonton Sekarang', moreInfo: 'Info Lebih Lanjut', noContent: 'Belum ada konten. Cek lagi nanti!',
    episode: 'Episode', nextEpisode: 'Episode Berikutnya Dalam', comments: 'Komentar',
    like: 'Suka', dislike: 'Tidak Suka', addComment: 'Tambahkan komentar...', postComment: 'Kirim', genre: 'Genre',
    email: 'Email', password: 'Kata Sandi', username: 'Nama Pengguna',
    loginTitle: 'Masuk', registerTitle: 'Buat Akun', loginBtn: 'Masuk', registerBtn: 'Daftar',
    noAccount: 'Belum punya akun?', haveAccount: 'Sudah punya akun?',
    showPassword: 'Tampilkan kata sandi', hidePassword: 'Sembunyikan kata sandi',
    editProfile: 'Edit Profil', language: 'Bahasa', saveChanges: 'Simpan Perubahan', watchHistory: 'Riwayat Tonton',
    searchPlaceholder: 'Cari judul, genre...', searchResults: 'Hasil Pencarian', noResults: 'Tidak ada hasil',
    contact: 'Kontak', terms: 'Syarat Layanan', privacy: 'Kebijakan Privasi', faq: 'FAQ',
    historyTitle: 'Riwayat Tonton', clearHistory: 'Hapus Riwayat', emptyHistory: 'Belum ada riwayat tonton',
    adminPanel: 'Panel Admin', addVideo: 'Tambah Video', manageVideos: 'Kelola Video',
    manageUsers: 'Kelola Pengguna', dashboard: 'Dasbor', totalVideos: 'Total Video',
    totalUsers: 'Total Pengguna', totalComments: 'Total Komentar', deleteConfirm: 'Yakin ingin menghapus ini?',
    loading: 'Memuat...', error: 'Terjadi kesalahan', success: 'Berhasil!',
    close: 'Tutup', cancel: 'Batal', delete: 'Hapus', edit: 'Edit', save: 'Simpan',
    title: 'Judul', description: 'Deskripsi', videoUrl: 'URL Video', thumbnailUrl: 'URL Thumbnail',
    selectGenre: 'Pilih Genre', episodeNumber: 'Nomor Episode', duration: 'Durasi (menit)',
    views: 'Penayangan', publishedAt: 'Diterbitkan',
  },
  ja: {
    home: 'ホーム', search: '検索', history: '履歴', login: 'ログイン', register: '登録',
    logout: 'ログアウト', profile: 'プロフィール',
    menu: 'メニュー', categories: 'カテゴリ', subscribe: '購読する', subscribeDesc: 'プレミアムアクセスを取得',
    action: 'アクション', adventure: 'アドベンチャー', comedy: 'コメディ', drama: 'ドラマ',
    fantasy: 'ファンタジー', scifi: 'SF', romance: 'ロマンス', sliceoflife: '日常系',
    horror: 'ホラー', mystery: 'ミステリー', psychological: '心理', thriller: 'スリラー',
    supernatural: '超自然', sports: 'スポーツ', mecha: 'メカ', cyberpunk: 'サイバーパンク',
    historical: '歴史', military: '軍事', music: '音楽', gourmet: 'グルメ',
    shounen: '少年', shoujo: '少女', seinen: '青年', josei: '女性', isekai: '異世界',
    featured: '注目', trending: 'トレンド', recentlyAdded: '最近追加', watchNow: '今すぐ見る',
    moreInfo: '詳細', noContent: 'コンテンツはまだありません。後でまたご確認ください！',
    episode: 'エピソード', nextEpisode: '次のエピソードまで', comments: 'コメント',
    like: 'いいね', dislike: '嫌い', addComment: 'コメントを追加...', postComment: '投稿', genre: 'ジャンル',
    email: 'メール', password: 'パスワード', username: 'ユーザー名',
    loginTitle: 'ログイン', registerTitle: 'アカウント作成', loginBtn: 'ログイン', registerBtn: '登録',
    noAccount: 'アカウントをお持ちでない方', haveAccount: 'すでにアカウントをお持ちの方',
    showPassword: 'パスワードを表示', hidePassword: 'パスワードを非表示',
    editProfile: 'プロフィール編集', language: '言語', saveChanges: '変更を保存', watchHistory: '視聴履歴',
    searchPlaceholder: 'タイトル、ジャンルを検索...', searchResults: '検索結果', noResults: '結果が見つかりません',
    contact: 'お問い合わせ', terms: '利用規約', privacy: 'プライバシーポリシー', faq: 'よくある質問',
    historyTitle: '視聴履歴', clearHistory: '履歴をクリア', emptyHistory: '視聴履歴はまだありません',
    adminPanel: '管理パネル', addVideo: '動画を追加', manageVideos: '動画を管理',
    manageUsers: 'ユーザーを管理', dashboard: 'ダッシュボード', totalVideos: '総動画数',
    totalUsers: '総ユーザー数', totalComments: '総コメント数', deleteConfirm: '本当に削除しますか？',
    loading: '読み込み中...', error: 'エラーが発生しました', success: '成功！',
    close: '閉じる', cancel: 'キャンセル', delete: '削除', edit: '編集', save: '保存',
    title: 'タイトル', description: '説明', videoUrl: '動画URL', thumbnailUrl: 'サムネイルURL',
    selectGenre: 'ジャンルを選択', episodeNumber: 'エピソード番号', duration: '時間（分）',
    views: '再生回数', publishedAt: '公開日',
  }
};

const GENRES = [
  'Action','Adventure','Comedy','Drama','Fantasy','Sci-Fi','Romance','Slice of Life',
  'Horror','Mystery','Psychological','Thriller','Supernatural','Sports','Mecha',
  'Cyberpunk','Historical','Military','Music','Gourmet','Shounen','Shoujo','Seinen','Josei','Isekai'
];

// Current language state
let currentLang = localStorage.getItem('yuumiru_lang') || 'en';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('yuumiru_lang', lang);
  document.dispatchEvent(new Event('langChanged'));
}

/* =========================================================
   YUUMIRU - i18n System
   Bahasa: Indonesia (id), English (en), Japanese (ja)
   ========================================================= */

const TRANSLATIONS = {
  id: {
    // Navbar
    nav_home: "Beranda", nav_genres: "Genre", nav_history: "Riwayat",
    nav_search_placeholder: "Cari anime...", nav_login: "Masuk", nav_register: "Daftar",
    nav_profile: "Profil", nav_logout: "Keluar", nav_admin: "Admin Panel",
    // Sidebar
    side_menu: "Menu Navigasi", side_home: "Beranda", side_genres: "Kategori Genre",
    side_subscribe: "Berlangganan", side_contact: "Kontak", side_terms: "Syarat & Ketentuan",
    side_privacy: "Privasi", side_faq: "FAQ", side_close: "Tutup sidebar",
    // Home
    home_hero_watch: "Tonton Sekarang", home_hero_info: "Info Selengkapnya",
    home_empty_title: "Belum ada konten", home_empty_desc: "Admin belum menambahkan anime. Nantikan update terbaru!",
    home_latest: "Episode Terbaru", home_popular: "Paling Populer", home_all_anime: "Semua Anime",
    section_by_genre: "Genre",
    // Anime detail
    detail_episodes: "Daftar Episode", detail_synopsis: "Sinopsis", detail_status: "Status",
    detail_year: "Tahun", detail_genres: "Genre", status_ongoing: "Sedang Tayang", status_completed: "Tamat",
    // Player / watch page
    watch_next_episode: "Episode Berikutnya", watch_next_in: "Episode selanjutnya dalam",
    watch_comments: "Komentar", watch_comment_placeholder: "Tulis komentar...", watch_comment_send: "Kirim",
    watch_login_to_comment: "Masuk untuk berkomentar", watch_no_comments: "Belum ada komentar. Jadilah yang pertama!",
    watch_episode: "Episode", watch_genres: "Genre video ini", watch_delete: "Hapus",
    // Auth
    auth_login_title: "Masuk ke Yuumiru", auth_register_title: "Daftar di Yuumiru",
    auth_email: "Email", auth_username: "Username", auth_password: "Password",
    auth_confirm_password: "Konfirmasi Password", auth_login_btn: "Masuk",
    auth_register_btn: "Daftar", auth_no_account: "Belum punya akun?",
    auth_have_account: "Sudah punya akun?", auth_register_link: "Daftar di sini",
    auth_login_link: "Masuk di sini", auth_show_password: "Tampilkan password",
    auth_error_generic: "Terjadi kesalahan. Coba lagi.", auth_password_mismatch: "Password tidak cocok.",
    auth_success_register: "Berhasil daftar! Silakan masuk.",
    // Profile
    profile_title: "Profil Saya", profile_language: "Bahasa", profile_save: "Simpan Perubahan",
    profile_saved: "Perubahan disimpan!", profile_member_since: "Bergabung sejak",
    // History
    history_title: "Riwayat Tontonan", history_empty: "Kamu belum menonton apa pun.",
    history_clear: "Hapus Semua Riwayat",
    // Search
    search_title: "Hasil pencarian untuk", search_no_results: "Tidak ditemukan hasil untuk",
    // Genres page
    genres_title: "Jelajahi Genre",
    // Footer
    footer_tagline: "Tempat terbaik untuk streaming anime favoritmu.",
    footer_explore: "Jelajahi", footer_legal: "Legal", footer_connect: "Hubungi Kami",
    footer_rights: "Seluruh hak cipta dilindungi.",
    // Contact
    contact_title: "Hubungi Kami", contact_desc: "Ada pertanyaan, saran, atau kerja sama? Hubungi kami melalui salah satu kanal di bawah ini.",
    contact_email_desc: "Kirim email untuk pertanyaan formal", contact_wa_desc: "Chat langsung untuk respon cepat",
    contact_ig_desc: "Ikuti untuk update terbaru", contact_yt_desc: "Subscribe untuk konten video",
    // Terms
    terms_title: "Syarat & Ketentuan", terms_updated: "Terakhir diperbarui",
    // Privacy
    privacy_title: "Kebijakan Privasi",
    // FAQ
    faq_title: "Pertanyaan yang Sering Diajukan",
    // Subscribe modal
    sub_title: "Berlangganan Yuumiru Premium",
    sub_desc: "Nikmati akses penuh tanpa batas dengan berlangganan melalui WhatsApp kami.",
    sub_btn: "Chat via WhatsApp",
    // Admin
    admin_title: "Admin Panel", admin_dashboard: "Dasbor", admin_anime_list: "Daftar Anime",
    admin_add_anime: "Tambah Anime", admin_episodes: "Episode", admin_comments: "Komentar",
    admin_users: "Pengguna", admin_logout: "Keluar Admin", admin_login_title: "Masuk Admin Panel",
    admin_username: "Username Admin", admin_total_anime: "Total Anime", admin_total_episodes: "Total Episode",
    admin_total_users: "Total Pengguna", admin_total_comments: "Total Komentar",
    admin_form_title: "Judul Anime", admin_form_desc: "Deskripsi", admin_form_cover: "URL Cover (poster)",
    admin_form_banner: "URL Banner (latar)", admin_form_year: "Tahun Rilis", admin_form_status: "Status",
    admin_form_genres: "Pilih Genre", admin_save: "Simpan Anime", admin_cancel: "Batal",
    admin_action_edit: "Edit", admin_action_delete: "Hapus", admin_action_episodes: "Kelola Episode",
    admin_ep_form_title: "Judul Episode (opsional)", admin_ep_form_number: "Nomor Episode",
    admin_ep_form_url: "URL Video", admin_ep_form_type: "Tipe Video", admin_ep_form_type_iframe: "Embed/iFrame (YouTube dll)",
    admin_ep_form_type_direct: "Link Video Langsung (mp4)", admin_ep_form_thumb: "URL Thumbnail",
    admin_ep_form_next: "Waktu Episode Berikutnya Rilis", admin_save_ep: "Simpan Episode",
    admin_back_to_anime: "Kembali ke Daftar Anime", admin_no_anime: "Belum ada anime. Tambahkan yang pertama!",
    admin_no_episodes: "Belum ada episode untuk anime ini.", admin_confirm_delete: "Yakin ingin menghapus ini?",
    admin_search_users: "Cari pengguna...", admin_make_admin: "Jadikan Admin", admin_revoke_admin: "Cabut Admin",
    admin_welcome: "Selamat datang", admin_added: "Berhasil ditambahkan!", admin_updated: "Berhasil diperbarui!",
    admin_deleted: "Berhasil dihapus!",
    admin_access_denied: "Akses ditolak. Halaman ini hanya untuk admin.", admin_back_to_site: "Kembali ke Situs",
    admin_table_title: "Judul", admin_table_episodes: "Episode", admin_table_status: "Status", admin_table_actions: "Aksi",
    admin_table_username: "Username", admin_table_email: "Email", admin_table_role: "Peran", admin_table_joined: "Bergabung",
    admin_table_comment: "Komentar", admin_table_user: "Pengguna", admin_table_episode: "Episode", admin_table_date: "Tanggal",
    admin_role_admin: "Admin", admin_role_user: "Pengguna", admin_edit_anime: "Edit Anime",
    admin_ep_list_for: "Episode untuk", admin_add_episode: "Tambah Episode", admin_edit_episode: "Edit Episode",
    admin_required: "Wajib diisi", admin_optional: "Opsional", admin_no_next_timer: "Tidak ada timer",
    admin_select_genre_hint: "Pilih satu atau lebih genre", admin_status_ongoing: "Sedang Tayang", admin_status_completed: "Tamat",
    // Misc
    loading: "Memuat...", error_generic: "Terjadi kesalahan, silakan coba lagi.",
    confirm_yes: "Ya", confirm_no: "Batal", close: "Tutup",

    // Terms content
    terms_p1: "Selamat datang di Yuumiru. Dengan mengakses atau menggunakan situs ini, kamu menyetujui syarat dan ketentuan berikut. Mohon baca dengan saksama sebelum menggunakan layanan kami.",
    terms_h1: "1. Penggunaan Layanan", terms_p2: "Yuumiru menyediakan layanan streaming konten anime untuk tujuan hiburan pribadi. Kamu setuju untuk tidak menyalahgunakan layanan ini, termasuk namun tidak terbatas pada mengunggah konten ilegal, melakukan spam, atau merusak sistem kami.",
    terms_h2: "2. Akun Pengguna", terms_p3: "Kamu bertanggung jawab untuk menjaga kerahasiaan kata sandi akunmu. Segala aktivitas yang terjadi melalui akunmu menjadi tanggung jawabmu sepenuhnya.",
    terms_h3: "3. Konten", terms_p4: "Seluruh konten yang tersedia di Yuumiru ditambahkan oleh tim admin. Kami berusaha menyediakan konten yang relevan dan berkualitas, namun tidak menjamin ketersediaan konten secara terus-menerus.",
    terms_h4: "4. Perubahan Layanan", terms_p5: "Kami berhak mengubah, menangguhkan, atau menghentikan sebagian maupun seluruh layanan kapan saja tanpa pemberitahuan sebelumnya.",
    terms_h5: "5. Batasan Tanggung Jawab", terms_p6: "Yuumiru tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan layanan ini.",
    terms_h6: "6. Hubungi Kami", terms_p7: "Jika ada pertanyaan terkait syarat dan ketentuan ini, silakan hubungi kami melalui halaman Kontak.",

    // Privacy content
    privacy_p1: "Kebijakan privasi ini menjelaskan bagaimana Yuumiru mengumpulkan, menggunakan, dan melindungi informasi pribadimu.",
    privacy_h1: "1. Informasi yang Kami Kumpulkan", privacy_p2: "Kami mengumpulkan informasi seperti username, alamat email, preferensi bahasa, riwayat tontonan, komentar, dan interaksi like/dislike yang kamu berikan di platform kami.",
    privacy_h2: "2. Penggunaan Informasi", privacy_p3: "Informasi yang dikumpulkan digunakan untuk menyediakan dan meningkatkan layanan, mempersonalisasi pengalaman menonton, serta menampilkan riwayat tontonanmu.",
    privacy_h3: "3. Keamanan Data", privacy_p4: "Kami menggunakan infrastruktur Supabase dengan Row Level Security untuk melindungi data pengguna. Kata sandi disimpan dalam bentuk terenkripsi dan tidak dapat diakses oleh siapa pun, termasuk admin.",
    privacy_h4: "4. Berbagi Data", privacy_p5: "Kami tidak akan menjual atau membagikan data pribadimu kepada pihak ketiga untuk tujuan komersial tanpa izin darimu.",
    privacy_h5: "5. Hak Pengguna", privacy_p6: "Kamu berhak untuk mengubah informasi profil, menghapus riwayat tontonan, dan menghapus komentar yang kamu buat kapan saja melalui akunmu.",
    privacy_h6: "6. Hubungi Kami", privacy_p7: "Jika ada pertanyaan terkait kebijakan privasi ini, silakan hubungi kami melalui halaman Kontak.",

    // FAQ content
    faq_q1: "Apakah Yuumiru gratis digunakan?", faq_a1: "Ya, Yuumiru dapat diakses secara gratis. Namun kami juga menyediakan opsi berlangganan premium untuk pengalaman yang lebih baik, dapat dihubungi melalui WhatsApp kami.",
    faq_q2: "Bagaimana cara membuat akun?", faq_a2: "Klik tombol Daftar di pojok kanan atas, isi username, email, dan password, lalu klik Daftar. Setelah itu kamu bisa langsung masuk menggunakan akun yang dibuat.",
    faq_q3: "Bagaimana cara mengganti bahasa?", faq_a3: "Masuk ke halaman Profil, lalu pilih bahasa yang diinginkan (Indonesia, English, atau 日本語). Seluruh tampilan situs termasuk admin panel akan berubah secara otomatis.",
    faq_q4: "Kenapa video tidak bisa diputar?", faq_a4: "Pastikan koneksi internetmu stabil. Jika masalah berlanjut, coba refresh halaman atau hubungi kami melalui halaman Kontak.",
    faq_q5: "Bagaimana cara berlangganan?", faq_a5: "Klik tombol Berlangganan pada sidebar, kamu akan diarahkan langsung ke WhatsApp kami untuk proses berlangganan.",
    faq_q6: "Apakah saya bisa berkomentar di video?", faq_a6: "Ya, kamu perlu masuk (login) terlebih dahulu untuk dapat memberikan komentar, like, atau dislike pada video.",
    faq_q7: "Bagaimana cara melihat riwayat tontonan saya?", faq_a7: "Klik ikon riwayat pada navbar atau menu profil untuk melihat semua episode yang pernah kamu tonton.",
  },
  en: {
    nav_home: "Home", nav_genres: "Genres", nav_history: "History",
    nav_search_placeholder: "Search anime...", nav_login: "Log In", nav_register: "Sign Up",
    nav_profile: "Profile", nav_logout: "Log Out", nav_admin: "Admin Panel",
    side_menu: "Navigation", side_home: "Home", side_genres: "Genre Categories",
    side_subscribe: "Subscribe", side_contact: "Contact", side_terms: "Terms of Service",
    side_privacy: "Privacy", side_faq: "FAQ", side_close: "Close sidebar",
    home_hero_watch: "Watch Now", home_hero_info: "More Info",
    home_empty_title: "No content yet", home_empty_desc: "The admin hasn't added any anime yet. Stay tuned!",
    home_latest: "Latest Episodes", home_popular: "Most Popular", home_all_anime: "All Anime",
    section_by_genre: "Genre",
    detail_episodes: "Episode List", detail_synopsis: "Synopsis", detail_status: "Status",
    detail_year: "Year", detail_genres: "Genres", status_ongoing: "Ongoing", status_completed: "Completed",
    watch_next_episode: "Next Episode", watch_next_in: "Next episode in",
    watch_comments: "Comments", watch_comment_placeholder: "Write a comment...", watch_comment_send: "Send",
    watch_login_to_comment: "Log in to comment", watch_no_comments: "No comments yet. Be the first!",
    watch_episode: "Episode", watch_genres: "Genres in this video", watch_delete: "Delete",
    auth_login_title: "Log in to Yuumiru", auth_register_title: "Sign up for Yuumiru",
    auth_email: "Email", auth_username: "Username", auth_password: "Password",
    auth_confirm_password: "Confirm Password", auth_login_btn: "Log In",
    auth_register_btn: "Sign Up", auth_no_account: "Don't have an account?",
    auth_have_account: "Already have an account?", auth_register_link: "Sign up here",
    auth_login_link: "Log in here", auth_show_password: "Show password",
    auth_error_generic: "Something went wrong. Please try again.", auth_password_mismatch: "Passwords don't match.",
    auth_success_register: "Registered successfully! Please log in.",
    profile_title: "My Profile", profile_language: "Language", profile_save: "Save Changes",
    profile_saved: "Changes saved!", profile_member_since: "Member since",
    history_title: "Watch History", history_empty: "You haven't watched anything yet.",
    history_clear: "Clear All History",
    search_title: "Search results for", search_no_results: "No results found for",
    genres_title: "Browse Genres",
    footer_tagline: "The best place to stream your favorite anime.",
    footer_explore: "Explore", footer_legal: "Legal", footer_connect: "Connect With Us",
    footer_rights: "All rights reserved.",
    contact_title: "Contact Us", contact_desc: "Have a question, suggestion, or want to collaborate? Reach us through any of the channels below.",
    contact_email_desc: "Send an email for formal inquiries", contact_wa_desc: "Chat directly for a quick response",
    contact_ig_desc: "Follow for the latest updates", contact_yt_desc: "Subscribe for video content",
    terms_title: "Terms of Service", terms_updated: "Last updated",
    privacy_title: "Privacy Policy",
    faq_title: "Frequently Asked Questions",
    sub_title: "Subscribe to Yuumiru Premium",
    sub_desc: "Enjoy full, unlimited access by subscribing through our WhatsApp.",
    sub_btn: "Chat via WhatsApp",
    admin_title: "Admin Panel", admin_dashboard: "Dashboard", admin_anime_list: "Anime List",
    admin_add_anime: "Add Anime", admin_episodes: "Episodes", admin_comments: "Comments",
    admin_users: "Users", admin_logout: "Log Out", admin_login_title: "Admin Panel Login",
    admin_username: "Admin Username", admin_total_anime: "Total Anime", admin_total_episodes: "Total Episodes",
    admin_total_users: "Total Users", admin_total_comments: "Total Comments",
    admin_form_title: "Anime Title", admin_form_desc: "Description", admin_form_cover: "Cover URL (poster)",
    admin_form_banner: "Banner URL (backdrop)", admin_form_year: "Release Year", admin_form_status: "Status",
    admin_form_genres: "Select Genres", admin_save: "Save Anime", admin_cancel: "Cancel",
    admin_action_edit: "Edit", admin_action_delete: "Delete", admin_action_episodes: "Manage Episodes",
    admin_ep_form_title: "Episode Title (optional)", admin_ep_form_number: "Episode Number",
    admin_ep_form_url: "Video URL", admin_ep_form_type: "Video Type", admin_ep_form_type_iframe: "Embed/iFrame (YouTube etc.)",
    admin_ep_form_type_direct: "Direct Video Link (mp4)", admin_ep_form_thumb: "Thumbnail URL",
    admin_ep_form_next: "Next Episode Release Time", admin_save_ep: "Save Episode",
    admin_back_to_anime: "Back to Anime List", admin_no_anime: "No anime yet. Add the first one!",
    admin_no_episodes: "No episodes for this anime yet.", admin_confirm_delete: "Are you sure you want to delete this?",
    admin_search_users: "Search users...", admin_make_admin: "Make Admin", admin_revoke_admin: "Revoke Admin",
    admin_welcome: "Welcome", admin_added: "Added successfully!", admin_updated: "Updated successfully!",
    admin_deleted: "Deleted successfully!",
    admin_access_denied: "Access denied. This page is for admins only.", admin_back_to_site: "Back to Site",
    admin_table_title: "Title", admin_table_episodes: "Episodes", admin_table_status: "Status", admin_table_actions: "Actions",
    admin_table_username: "Username", admin_table_email: "Email", admin_table_role: "Role", admin_table_joined: "Joined",
    admin_table_comment: "Comment", admin_table_user: "User", admin_table_episode: "Episode", admin_table_date: "Date",
    admin_role_admin: "Admin", admin_role_user: "User", admin_edit_anime: "Edit Anime",
    admin_ep_list_for: "Episodes for", admin_add_episode: "Add Episode", admin_edit_episode: "Edit Episode",
    admin_required: "Required", admin_optional: "Optional", admin_no_next_timer: "No timer",
    admin_select_genre_hint: "Select one or more genres", admin_status_ongoing: "Ongoing", admin_status_completed: "Completed",
    loading: "Loading...", error_generic: "Something went wrong, please try again.",
    confirm_yes: "Yes", confirm_no: "Cancel", close: "Close",

    // Terms content
    terms_p1: "Welcome to Yuumiru. By accessing or using this site, you agree to the following terms and conditions. Please read them carefully before using our service.",
    terms_h1: "1. Use of Service", terms_p2: "Yuumiru provides anime streaming content for personal entertainment purposes. You agree not to misuse this service, including but not limited to uploading illegal content, spamming, or disrupting our systems.",
    terms_h2: "2. User Accounts", terms_p3: "You are responsible for keeping your account password confidential. You are fully responsible for any activity that occurs through your account.",
    terms_h3: "3. Content", terms_p4: "All content available on Yuumiru is added by our admin team. We strive to provide relevant, quality content but do not guarantee continuous availability.",
    terms_h4: "4. Service Changes", terms_p5: "We reserve the right to modify, suspend, or discontinue part or all of the service at any time without prior notice.",
    terms_h5: "5. Limitation of Liability", terms_p6: "Yuumiru is not liable for any direct or indirect damages arising from the use of this service.",
    terms_h6: "6. Contact Us", terms_p7: "If you have any questions about these terms, please reach out via our Contact page.",

    // Privacy content
    privacy_p1: "This privacy policy explains how Yuumiru collects, uses, and protects your personal information.",
    privacy_h1: "1. Information We Collect", privacy_p2: "We collect information such as your username, email address, language preference, watch history, comments, and like/dislike interactions on our platform.",
    privacy_h2: "2. Use of Information", privacy_p3: "Collected information is used to provide and improve our service, personalize your viewing experience, and display your watch history.",
    privacy_h3: "3. Data Security", privacy_p4: "We use Supabase infrastructure with Row Level Security to protect user data. Passwords are stored encrypted and are not accessible by anyone, including admins.",
    privacy_h4: "4. Data Sharing", privacy_p5: "We will not sell or share your personal data with third parties for commercial purposes without your consent.",
    privacy_h5: "5. User Rights", privacy_p6: "You have the right to update your profile information, delete your watch history, and delete comments you've made at any time through your account.",
    privacy_h6: "6. Contact Us", privacy_p7: "If you have any questions about this privacy policy, please reach out via our Contact page.",

    // FAQ content
    faq_q1: "Is Yuumiru free to use?", faq_a1: "Yes, Yuumiru is free to access. We also offer a premium subscription for an enhanced experience, available through our WhatsApp.",
    faq_q2: "How do I create an account?", faq_a2: "Click the Sign Up button in the top right corner, fill in your username, email, and password, then click Sign Up. You can then log in right away.",
    faq_q3: "How do I change the language?", faq_a3: "Go to your Profile page and select your preferred language (Indonesian, English, or Japanese). The entire site, including the admin panel, will update automatically.",
    faq_q4: "Why won't the video play?", faq_a4: "Make sure your internet connection is stable. If the issue persists, try refreshing the page or contact us via the Contact page.",
    faq_q5: "How do I subscribe?", faq_a5: "Click the Subscribe button in the sidebar and you'll be taken straight to our WhatsApp to complete the subscription process.",
    faq_q6: "Can I comment on videos?", faq_a6: "Yes, you need to log in first to leave a comment, like, or dislike on a video.",
    faq_q7: "How do I view my watch history?", faq_a7: "Click the history icon in the navbar or profile menu to see every episode you've watched.",
  },
  ja: {
    nav_home: "ホーム", nav_genres: "ジャンル", nav_history: "履歴",
    nav_search_placeholder: "アニメを検索...", nav_login: "ログイン", nav_register: "登録",
    nav_profile: "プロフィール", nav_logout: "ログアウト", nav_admin: "管理パネル",
    side_menu: "ナビゲーション", side_home: "ホーム", side_genres: "ジャンル一覧",
    side_subscribe: "登録する", side_contact: "お問い合わせ", side_terms: "利用規約",
    side_privacy: "プライバシー", side_faq: "よくある質問", side_close: "サイドバーを閉じる",
    home_hero_watch: "今すぐ視聴", home_hero_info: "詳細情報",
    home_empty_title: "コンテンツがありません", home_empty_desc: "管理者がまだアニメを追加していません。お楽しみに！",
    home_latest: "最新エピソード", home_popular: "人気作品", home_all_anime: "すべてのアニメ",
    section_by_genre: "ジャンル",
    detail_episodes: "エピソード一覧", detail_synopsis: "あらすじ", detail_status: "状態",
    detail_year: "年", detail_genres: "ジャンル", status_ongoing: "放送中", status_completed: "完結",
    watch_next_episode: "次のエピソード", watch_next_in: "次のエピソードまで",
    watch_comments: "コメント", watch_comment_placeholder: "コメントを書く...", watch_comment_send: "送信",
    watch_login_to_comment: "コメントするにはログインしてください", watch_no_comments: "まだコメントがありません。最初の投稿者になりましょう！",
    watch_episode: "エピソード", watch_genres: "この動画のジャンル", watch_delete: "削除",
    auth_login_title: "Yuumiruにログイン", auth_register_title: "Yuumiruに登録",
    auth_email: "メールアドレス", auth_username: "ユーザー名", auth_password: "パスワード",
    auth_confirm_password: "パスワード確認", auth_login_btn: "ログイン",
    auth_register_btn: "登録", auth_no_account: "アカウントをお持ちでないですか？",
    auth_have_account: "すでにアカウントをお持ちですか？", auth_register_link: "こちらから登録",
    auth_login_link: "こちらからログイン", auth_show_password: "パスワードを表示",
    auth_error_generic: "エラーが発生しました。再度お試しください。", auth_password_mismatch: "パスワードが一致しません。",
    auth_success_register: "登録が完了しました！ログインしてください。",
    profile_title: "マイプロフィール", profile_language: "言語", profile_save: "変更を保存",
    profile_saved: "変更が保存されました！", profile_member_since: "登録日",
    history_title: "視聴履歴", history_empty: "まだ何も視聴していません。",
    history_clear: "履歴をすべて削除",
    search_title: "検索結果", search_no_results: "見つかりませんでした",
    genres_title: "ジャンルを探す",
    footer_tagline: "お気に入りのアニメを視聴できる最高の場所。",
    footer_explore: "探索", footer_legal: "法的情報", footer_connect: "フォローする",
    footer_rights: "全著作権所有。",
    contact_title: "お問い合わせ", contact_desc: "ご質問、ご提案、コラボのご相談は以下のチャンネルからご連絡ください。",
    contact_email_desc: "正式なお問い合わせはメールへ", contact_wa_desc: "すぐに返信が欲しい場合はチャットへ",
    contact_ig_desc: "最新情報はこちらをフォロー", contact_yt_desc: "動画コンテンツは登録してチェック",
    terms_title: "利用規約", terms_updated: "最終更新日",
    privacy_title: "プライバシーポリシー",
    faq_title: "よくある質問",
    sub_title: "Yuumiruプレミアムに登録",
    sub_desc: "WhatsAppから登録して、フルアクセスを無制限でお楽しみください。",
    sub_btn: "WhatsAppでチャット",
    admin_title: "管理パネル", admin_dashboard: "ダッシュボード", admin_anime_list: "アニメ一覧",
    admin_add_anime: "アニメを追加", admin_episodes: "エピソード", admin_comments: "コメント",
    admin_users: "ユーザー", admin_logout: "ログアウト", admin_login_title: "管理パネルログイン",
    admin_username: "管理者ユーザー名", admin_total_anime: "アニメ総数", admin_total_episodes: "エピソード総数",
    admin_total_users: "ユーザー総数", admin_total_comments: "コメント総数",
    admin_form_title: "アニメタイトル", admin_form_desc: "説明", admin_form_cover: "カバーURL（ポスター）",
    admin_form_banner: "バナーURL（背景）", admin_form_year: "公開年", admin_form_status: "状態",
    admin_form_genres: "ジャンルを選択", admin_save: "アニメを保存", admin_cancel: "キャンセル",
    admin_action_edit: "編集", admin_action_delete: "削除", admin_action_episodes: "エピソード管理",
    admin_ep_form_title: "エピソードタイトル（任意）", admin_ep_form_number: "エピソード番号",
    admin_ep_form_url: "動画URL", admin_ep_form_type: "動画タイプ", admin_ep_form_type_iframe: "埋め込み/iFrame（YouTubeなど）",
    admin_ep_form_type_direct: "直接動画リンク（mp4）", admin_ep_form_thumb: "サムネイルURL",
    admin_ep_form_next: "次のエピソード公開時間", admin_save_ep: "エピソードを保存",
    admin_back_to_anime: "アニメ一覧へ戻る", admin_no_anime: "アニメがまだありません。最初の作品を追加しましょう！",
    admin_no_episodes: "このアニメにはまだエピソードがありません。", admin_confirm_delete: "本当に削除しますか？",
    admin_search_users: "ユーザーを検索...", admin_make_admin: "管理者にする", admin_revoke_admin: "管理者権限を削除",
    admin_welcome: "ようこそ", admin_added: "追加されました！", admin_updated: "更新されました！",
    admin_deleted: "削除されました！",
    admin_access_denied: "アクセスが拒否されました。このページは管理者専用です。", admin_back_to_site: "サイトに戻る",
    admin_table_title: "タイトル", admin_table_episodes: "エピソード", admin_table_status: "状態", admin_table_actions: "操作",
    admin_table_username: "ユーザー名", admin_table_email: "メールアドレス", admin_table_role: "役割", admin_table_joined: "登録日",
    admin_table_comment: "コメント", admin_table_user: "ユーザー", admin_table_episode: "エピソード", admin_table_date: "日付",
    admin_role_admin: "管理者", admin_role_user: "ユーザー", admin_edit_anime: "アニメを編集",
    admin_ep_list_for: "のエピソード", admin_add_episode: "エピソードを追加", admin_edit_episode: "エピソードを編集",
    admin_required: "必須", admin_optional: "任意", admin_no_next_timer: "タイマーなし",
    admin_select_genre_hint: "1つ以上のジャンルを選択してください", admin_status_ongoing: "放送中", admin_status_completed: "完結",
    loading: "読み込み中...", error_generic: "エラーが発生しました。もう一度お試しください。",
    confirm_yes: "はい", confirm_no: "キャンセル", close: "閉じる",

    // Terms content
    terms_p1: "Yuumiruへようこそ。本サイトへのアクセスまたはご利用により、以下の利用規約に同意したものとみなされます。ご利用前に必ずお読みください。",
    terms_h1: "1. サービスの利用", terms_p2: "Yuumiruは個人の娯楽目的でアニメ配信サービスを提供しています。違法コンテンツの投稿、スパム行為、システムへの妨害など、本サービスの不正利用は禁止されています。",
    terms_h2: "2. ユーザーアカウント", terms_p3: "アカウントのパスワードの管理はお客様の責任となります。アカウントを通じて行われるすべての活動について、お客様が責任を負います。",
    terms_h3: "3. コンテンツ", terms_p4: "Yuumiruで提供されるすべてのコンテンツは管理チームによって追加されています。質の高いコンテンツの提供に努めていますが、継続的な提供を保証するものではありません。",
    terms_h4: "4. サービスの変更", terms_p5: "当社は、事前の通知なく、サービスの一部または全部を変更、停止、または終了する権利を有します。",
    terms_h5: "5. 責任の制限", terms_p6: "Yuumiruは、本サービスの利用に起因する直接的または間接的な損害について責任を負いません。",
    terms_h6: "6. お問い合わせ", terms_p7: "本規約に関するご質問は、お問い合わせページよりご連絡ください。",

    // Privacy content
    privacy_p1: "このプライバシーポリシーは、Yuumiruが個人情報をどのように収集、利用、保護するかについて説明します。",
    privacy_h1: "1. 収集する情報", privacy_p2: "ユーザー名、メールアドレス、言語設定、視聴履歴、コメント、いいね・低評価などの操作情報を収集します。",
    privacy_h2: "2. 情報の利用", privacy_p3: "収集した情報は、サービスの提供・改善、視聴体験の最適化、視聴履歴の表示のために利用されます。",
    privacy_h3: "3. データセキュリティ", privacy_p4: "ユーザーデータの保護にはSupabaseのRow Level Securityを使用しています。パスワードは暗号化されて保存され、管理者を含む誰もアクセスできません。",
    privacy_h4: "4. データの共有", privacy_p5: "お客様の同意なく、商業目的で個人データを第三者に販売または共有することはありません。",
    privacy_h5: "5. ユーザーの権利", privacy_p6: "お客様はいつでもプロフィール情報の変更、視聴履歴の削除、自分が投稿したコメントの削除を行うことができます。",
    privacy_h6: "6. お問い合わせ", privacy_p7: "本プライバシーポリシーに関するご質問は、お問い合わせページよりご連絡ください。",

    // FAQ content
    faq_q1: "Yuumiruは無料で利用できますか？", faq_a1: "はい、Yuumiruは無料でご利用いただけます。より快適な体験のためのプレミアム登録も、WhatsAppよりご案内しています。",
    faq_q2: "アカウントの作成方法は？", faq_a2: "右上の「登録」ボタンをクリックし、ユーザー名・メールアドレス・パスワードを入力して登録してください。その後すぐにログインできます。",
    faq_q3: "言語の変更方法は？", faq_a3: "プロフィールページで希望の言語（日本語・英語・インドネシア語）を選択してください。管理パネルを含むサイト全体が自動的に切り替わります。",
    faq_q4: "動画が再生されないのはなぜですか？", faq_a4: "インターネット接続が安定しているかご確認ください。問題が続く場合は、ページを更新するか、お問い合わせページよりご連絡ください。",
    faq_q5: "登録（サブスクリプション）方法は？", faq_a5: "サイドバーの「登録する」ボタンをクリックすると、WhatsAppに直接移動し、登録手続きができます。",
    faq_q6: "動画にコメントできますか？", faq_a6: "はい、コメント・いいね・低評価をするには、まずログインが必要です。",
    faq_q7: "視聴履歴はどこで確認できますか？", faq_a7: "ナビバーまたはプロフィールメニューの履歴アイコンをクリックすると、視聴したすべてのエピソードを確認できます。",
  }
};

const GENRE_TRANSLATIONS = {
  id: { "Action":"Aksi","Adventure":"Petualangan","Comedy":"Komedi","Drama":"Drama","Fantasy":"Fantasi",
    "Sci-Fi":"Fiksi Sains","Romance":"Romansa","Slice of Life":"Slice of Life","Horror":"Horor","Mystery":"Misteri",
    "Psychological":"Psikologis","Thriller":"Thriller","Supernatural":"Supernatural","Sports":"Olahraga",
    "Mecha":"Mecha","Cyberpunk":"Cyberpunk","Historical":"Sejarah","Military":"Militer","Music":"Musik",
    "Gourmet":"Kuliner","Shounen":"Shounen","Shoujo":"Shoujo","Seinen":"Seinen","Josei":"Josei","Isekai":"Isekai" },
  en: { "Action":"Action","Adventure":"Adventure","Comedy":"Comedy","Drama":"Drama","Fantasy":"Fantasy",
    "Sci-Fi":"Sci-Fi","Romance":"Romance","Slice of Life":"Slice of Life","Horror":"Horror","Mystery":"Mystery",
    "Psychological":"Psychological","Thriller":"Thriller","Supernatural":"Supernatural","Sports":"Sports",
    "Mecha":"Mecha","Cyberpunk":"Cyberpunk","Historical":"Historical","Military":"Military","Music":"Music",
    "Gourmet":"Gourmet","Shounen":"Shounen","Shoujo":"Shoujo","Seinen":"Seinen","Josei":"Josei","Isekai":"Isekai" },
  ja: { "Action":"アクション","Adventure":"冒険","Comedy":"コメディ","Drama":"ドラマ","Fantasy":"ファンタジー",
    "Sci-Fi":"SF","Romance":"恋愛","Slice of Life":"日常","Horror":"ホラー","Mystery":"ミステリー",
    "Psychological":"サイコロジカル","Thriller":"スリラー","Supernatural":"超常現象","Sports":"スポーツ",
    "Mecha":"メカ","Cyberpunk":"サイバーパンク","Historical":"歴史","Military":"ミリタリー","Music":"音楽",
    "Gourmet":"グルメ","Shounen":"少年","Shoujo":"少女","Seinen":"青年","Josei":"女性向け","Isekai":"異世界" },
};

const Yi18n = {
  current: localStorage.getItem('yuumiru_lang') || 'id',

  t(key) {
    return (TRANSLATIONS[this.current] && TRANSLATIONS[this.current][key]) || TRANSLATIONS.id[key] || key;
  },

  genreName(englishName) {
    return (GENRE_TRANSLATIONS[this.current] && GENRE_TRANSLATIONS[this.current][englishName]) || englishName;
  },

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.current = lang;
    localStorage.setItem('yuumiru_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    this.applyToDOM();
    window.dispatchEvent(new CustomEvent('yuumiru:langchange', { detail: { lang } }));
  },

  // Apply translations to every element with data-i18n / data-i18n-placeholder attributes
  applyToDOM(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', this.t(key));
    });
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', this.t(key));
    });
    root.querySelectorAll('[data-i18n-genre]').forEach(el => {
      const name = el.getAttribute('data-i18n-genre');
      el.textContent = this.genreName(name);
    });
  },

  init() {
    document.documentElement.setAttribute('lang', this.current);
    this.applyToDOM();
  }
};

document.addEventListener('DOMContentLoaded', () => Yi18n.init());

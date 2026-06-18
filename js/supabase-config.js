/* =========================================================
   YUUMIRU - Supabase Configuration
   ========================================================= */

const SUPABASE_URL = 'https://kzpslekblpyhqjdvlgtx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_RaJA8tdHNO1gJ0oY1tgeTw_jMhp1bK2';

// supabase-js v2 is loaded via CDN script tag in each HTML page,
// exposing a global `supabase` factory function.
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'yuumiru-auth',
  }
});

const WHATSAPP_NUMBER = '6285814945558'; // +62 85814945558, no '+' or leading 0 for wa.me links
const CONTACT = {
  email: 'yuumiru55@gmail.com',
  whatsapp: '+62 85814945558',
  whatsappLink: `https://wa.me/${WHATSAPP_NUMBER}`,
  instagram: 'yuuki_k30',
  instagramLink: 'https://instagram.com/yuuki_k30',
  youtube: 'PerfactCombo37',
  youtubeLink: 'https://youtube.com/@PerfactCombo37',
};

const ADMIN_USERNAME = 'adminyuumiru50';

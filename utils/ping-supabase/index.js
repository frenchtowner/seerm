const fetch = require("node-fetch");
const SUPABASE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/contacts`;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

module.exports = async (req, res) => {
    try {
        const response = await fetch(SUPABASE_URL, {
            headers: {
                apikey: API_KEY,
                Authorization: `Bearer ${API_KEY}`
            }
        });

        const status = response.status;
        if (status === 200) {
            res.status(200).send("✅ Supabase is awake.");
        } else {
            res.status(status).send(`⚠️ Ping failed. Status: ${status}`);
        }
    } catch (err) {
        res.status(500).send(`❌ Error: ${err.message}`);
    }
};

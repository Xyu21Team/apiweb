const axios = require("axios")


const router = express.Router();

router.get("/bard", async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan nama pengguna Instagram!"
    });
  }

let danz = async (m, {
conn,
text,
usedPrefix,
command
}) => {
  if (!text) {
    return m.reply(`Masukkan Pertanyaan!\n\nContoh: *${usedPrefix + command} siapa kamu*`)
  }
  
  let res = await bard(text)
  conn.reply(m.chat, res, m)
}

danz.command = danz.help = ["gemini"]
danz.tags = ["ai"]

module.exports = danz

async function bard(prompt) {
  try {
    const response = await axios.post('https://bard.rizzy.eu.org/backend/conversation/gemini', {
      ask: prompt
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });
    return response.data.content;
  } catch (error) {
    console.error(error);
  }
}

/**
 * DannTeam
 * ig: @dannalwaysalone
*/
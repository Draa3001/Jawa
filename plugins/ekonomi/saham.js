const fetch = require('node-fetch');

module.exports = {
  name: 'saham',
  alias: ['stock'],
  category: 'ekonomi',
  desc: 'Melihat harga saham terkini',
  async run(m, {}, {}, args) {
    const symbol = args[0] || 'TSLA'
    try {
      const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=d0toeo9r01qlvahde9l0d0toeo9r01qlvahde9lg`)
      const data = await res.json()
      const info = data['Global Quote']
      if (!info || !info['01. symbol']) return m.reply('📛 Saham tidak ditemukan!')

      const reply = `📊 *Harga Saham Real-time*\n` +
        `╭────────────────────╮\n` +
        `│ 🏢 Symbol: ${info['01. symbol']}\n` +
        `│ 💵 Harga: $${parseFloat(info['05. price']).toFixed(2)}\n` +
        `│ 🔺 Perubahan: ${info['10. change percent']}\n` +
        `│ 🕒 Terakhir: ${info['07. latest trading day']}\n` +
        `╰────────────────────╯`
      m.reply(reply)
    } catch (err) {
      console.error(err)
      m.reply('❌ Gagal mengambil data saham.')
    }
  }
}

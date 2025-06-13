const fetch = require('node-fetch');

module.exports = {
  name: 'crypto',
  alias: ['cryptoprice'],
  category: 'ekonomi',
  desc: 'Melihat harga crypto terkini',
  async run(m, {}, {}, args) {
    const coin = args[0] || 'bitcoin'
    try {
      const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=41b34c94-cdc9-4a6f-8c2b-85e86823e574&ids=${coin.toUpperCase()}&convert=USD`)
      const data = await res.json()
      if (!data || !data[0]) return m.reply('📛 Koin tidak ditemukan!')

      const info = data[0]
      const reply = `💱 *Crypto Price Aesthetic*\n` +
        `╭───────────────╮\n` +
        `│ 💰 Nama: ${info.name} (${info.symbol})\n` +
        `│ 💵 Harga: $${parseFloat(info.price).toFixed(2)}\n` +
        `│ 📈 Rank: ${info.rank}\n` +
        `│ 🕒 Terakhir: ${new Date(info.price_timestamp).toLocaleString('id-ID')}\n` +
        `╰───────────────╯`
      m.reply(reply)
    } catch (err) {
      console.error(err)
      m.reply('❌ Terjadi kesalahan saat mengambil data crypto.')
    }
  }
}


const fs = require('fs')

let craftingRecipes = {
  'pedang': {
    bahan: { 'kayu': 2, 'besi': 3 },
    hasil: { 'pedang': 1 }
  },
  'kapak': {
    bahan: { 'kayu': 2, 'batu': 2 },
    hasil: { 'kapak': 1 }
  },
  'armor': {
    bahan: { 'besi': 5, 'kulit': 2 },
    hasil: { 'armor': 1 }
  }
}

module.exports = {
  name: 'craft',
  alias: ['crafting'],
  category: 'rpg',
  desc: 'Craft item dari bahan-bahan',
  async run(m, { conn, text, args, usedPrefix }) {
    const db = global.db.data
    const user = db.users[m.sender]
    const item = (args[0] || '').toLowerCase()

    if (!item) {
      return m.reply(`📦 Gunakan: ${usedPrefix}craft <item>
🧰 Cek daftar: ${usedPrefix}resep`)
    }

    if (!(item in craftingRecipes)) {
      return m.reply('❌ Item tidak ditemukan di daftar crafting!')
    }

    const resep = craftingRecipes[item]
    const kekurangan = []

    for (let bahan in resep.bahan) {
      if (!user[bahan] || user[bahan] < resep.bahan[bahan]) {
        kekurangan.push(`- ${bahan} (${user[bahan] || 0}/${resep.bahan[bahan]})`)
      }
    }

    if (kekurangan.length > 0) {
      return m.reply(`🚫 Bahan tidak cukup:
${kekurangan.join('
')}`)
    }

    // Kurangi bahan
    for (let bahan in resep.bahan) {
      user[bahan] -= resep.bahan[bahan]
    }

    // Tambah hasil
    for (let hasil in resep.hasil) {
      user[hasil] = (user[hasil] || 0) + resep.hasil[hasil]
    }

    m.reply(`✅ Berhasil membuat *${item}*!`)
  }
}

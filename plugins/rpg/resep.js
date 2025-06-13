
module.exports = {
  name: 'resep',
  alias: ['craftinglist'],
  category: 'rpg',
  desc: 'Lihat daftar resep crafting',
  async run(m) {
    const resep = {
      pedang: '🪵 Kayu (2), ⛓️ Besi (3)',
      kapak: '🪵 Kayu (2), 🪨 Batu (2)',
      armor: '⛓️ Besi (5), 🐄 Kulit (2)'
    }

    let teks = '📘 *Daftar Resep Crafting:*
'
    for (let item in resep) {
      teks += `
🔹 *${item}* : ${resep[item]}`
    }

    m.reply(teks)
  }
}

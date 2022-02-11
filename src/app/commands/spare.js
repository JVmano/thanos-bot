const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('spare')
    .setDescription('Redo the effects of infinite gauntlet'),
  async execute (interaction) {
    try {
      if (interaction.member.permissions.has('ADMINISTRATOR')) {
        const bans = await interaction.guild.bans.fetch()
        bans.forEach(async banned => {
          await interaction.guild.members.unban(banned.user.id)
          await interaction.reply(`<@${banned.user.id}> was spared by Thanos, for the greater good of the universe`)
        })
        await interaction.reply('Everyone who need spare was spared...')
      } else {
        await interaction.reply('You have no power here...')
      }
    } catch (error) {
      console.log('Error to snap', error)
    }
  }
}

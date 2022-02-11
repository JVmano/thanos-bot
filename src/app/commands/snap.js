const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snap')
    .setDescription('Use the infinite gauntlet...'),
  async execute (interaction, client) {
    try {
      let membersLength = 0
      const members = await interaction.guild.members.fetch()
      if (interaction.member.permissions.has('ADMINISTRATOR')) {
        members.forEach(async member => {
          membersLength++
        })
        const membersHalf = parseInt(membersLength / 2)
        for (let index = 0; index < membersHalf; index++) {
          const victim = await client.users.cache.random()
          if (interaction.guild.ownerId !== victim.id || victim.id !== interaction.applicationId) {
            await interaction.guild.members.ban(victim.id)
          }
        }
        await interaction.reply('Hear me and rejoice! You have had the privilege of being saved by the Great Titan. You may think this is suffering. No... It is salvation. The universal scales tip toward balance because of their sacrifice. Smile... for those who were banned, you have become children of Thanos.')
      } else {
        await interaction.reply('You have no power here...')
      }
    } catch (error) {
      console.log('Error to snap', error)
    }
  }
}

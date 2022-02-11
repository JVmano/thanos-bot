const fs = require('fs')
const { Client, Collection } = require('discord.js')

const ALL_INTENTS =
    (1 << 0) + // GUILDS
    (1 << 1) + // GUILD_MEMBERS
    (1 << 2) + // GUILD_BANS
    (1 << 3) + // GUILD_EMOJIS_AND_STICKERS
    (1 << 4) + // GUILD_INTEGRATIONS
    (1 << 5) + // GUILD_WEBHOOKS
    (1 << 6) + // GUILD_INVITES
    (1 << 7) + // GUILD_VOICE_STATES
    (1 << 8) + // GUILD_PRESENCES
    (1 << 9) + // GUILD_MESSAGES
    (1 << 10) + // GUILD_MESSAGE_REACTIONS
    (1 << 11) + // GUILD_MESSAGE_TYPING
    (1 << 12) + // DIRECT_MESSAGES
    (1 << 13) + // DIRECT_MESSAGE_REACTIONS
    (1 << 14) // DIRECT_MESSAGE_TYPING

const client = new Client({ intents: ALL_INTENTS })

// read all the files with events and set up
const eventFiles = fs.readdirSync('src/app/events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// start a collection, read all files with commands and set up to use
client.commands = new Collection()
const commandFiles = fs.readdirSync('src/app/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction, client)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})

client.login(process.env.DISCORD_TOKEN)

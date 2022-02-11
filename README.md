# Ban half of a server in one command

## Note
To use this bot you have to self host at least for now...

## Warning
The base function for this bot is ban half of a server so use at your own risk!

## Installation
First you have to create a application in [Discord Developer Portal](https://discord.com/developers/applications/), go to oAuth > General mark bot and application.commands scopes. You'll have to mark most of the Bot permissions to ensure that everything will run fine.

Again in Developer Portal you'll have to get Application ID and Token from Bot section.
After this create a file in root project called `source.env` inside this file use this format:

```
export DISCORD_ID="YOURAPPLICATIONID"
export DISCORD_TOKEN="YOURAPPLICATIONTOKEN"
export GUILD_ID="YOURGUILDID"
```

The guild id can be found activating developer mode in discord going to configuration, Advanced and marking Developer Mode. Then just right click on the server you want to run the bot and click in Copy ID.

Invite the bot to your server using a [Discord Bot Invite Generator](https://discordapi.com/permissions.html)

##  How to use
0. Install dependencies using ```npm install``` or ```yarn```
1. Run ```yarn commands``` after Installation topic steps and depencies installation
2. Run ```yarn start``` to activate bot

## Functions
```/snap``` will ban half of discord members, can be used multiple times
```/spare``` revert members bans

/*add bot to server:
https://discord.com/api/oauth2/authorize?client_id=819374796261294110&permissions=0&scope=bot
*/
//prerequisites
const { Client } = require('discord.js')
const ytdl = require("ytdl-core");
require('dotenv').config()
const client = new Client()
const { prefix } = require("../config.json");
const kills = require("./kills")
//kill messages
let helpMsg = `use "!pls kill" in chat. you can @ other members to kill them or you can use "!pls kill me" to kill yourself. \
 You can also use !pls join and!pls leave for voice chat commands(still need to implement)`

// const kills = ["has drowned in money!", "got sniped!", "got poisoned!", "fell in the shower!", 
//     "got cancer!", "got ran over by a car!", "fell out of a plane!","lost their phone!",
//     "was eaten by a shark!", "remembered an embarrassing moment from 2 years ago!", "fell down the stairs!",
//     "spontaneously died!", "didnt do their math homework!", "got electrocuted!", "got an F on their test!", 
//     "got stabbed!", "stubbed their toe!", "power went out while updating BIOS!", "got hit by an avalanche!", 
//     "was caught lackin!", "got one tapped!", "got checkmated!", "got a virus!", "got forced to watch twilight!",
//     "got bit by a zombie!", "got bit by vampires!", "was the last one to finish a lap during pe!(fatty)"]
//get rbandom values
random_item=(kill)=>kill[Math.floor(Math.random()*kill.length)]
//bot ready message and status
client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`)
    client.user.setActivity('!pls help', { type: 'LISTENING'})
}) 
//check for if mesasage author is bot and if it is in dms
client.on('message', (message) => { 
    if (message.channel.type === 'dm') return
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return;
})
//bot message reactions
client.on('message', (message) => {
    if (message.content === '!pls kill me') { message.reply(random_item(kills)) }
    if (message.content === `${prefix} help`) {message.reply(helpMsg)}
    if (message.content === `${prefix} kill @everyone`) {
        message.channel.send(`@everyone ${random_item(kills)}`)
    }
    let mention = message.mentions.users.array()
    if (message.content.startsWith("!pls kill") && mention.length == 1) { message.channel.send(`${mention} ${random_item(kills)}`) }
    else if (message.content.startsWith(`${prefix}`) && mention.length != 1 || 0) {
        mention.forEach(ment => {
        message.channel.send(`${ment} ${random_item(kills)}`)
    })}
})
//bot login
client.login(process.env.token)

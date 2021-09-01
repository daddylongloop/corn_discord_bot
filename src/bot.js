/*add bot to server:
https://discord.com/api/oauth2/authorize?client_id=819374796261294110&permissions=0&scope=bot
*/
//prerequisites
const { Client } = require('discord.js')
require('dotenv').config()
const client = new Client()
//kill messages
const kills = ["has drowned in money!", "got sniped!", "got poisoned!", "fell in the shower!", 
    "got cancer!", "got ran over by a car!", "fell out of a plane!","lost ttheir phones!",
    "was eaten by a shark!", "remembered an embarrassing moment from 2 years ago!", "fell down the stairs!",
    "spontaneously died!", "didnt do their math homework!", "got electrocuted!", "got an F on their test!", 
    "got stabbed!", "stubbed their toe!", "power went out while updating BIOS!", "got hit by an avalanche!", 
    "was caught lackin!", "got one tapped!", "got checkmated!", "got a virus!", "got forced to watch twilight!",
    "got bit by a zombie!", "got bit by vampires!", "was the last one to finish a lap during pe!(fatty)"]
//get random values
random_item=(kill)=>kill[Math.floor(Math.random()*kill.length)]
//bot ready message and status
client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`);
    client.user.setActivity('!pls help', { type: 'LISTENING'})
}) 
//check for if mesasage author is bot and if it is in dms
client.on('message', (message) => { 
    if (message.channel.type === 'dm') return
    if (message.author.bot) return
})
//bot message reactions
client.on('message', (message) =>{
    let mention = message.mentions.users.first()
    console.log(`${message.author.tag} has typed "${message.content}" in the "${message.channel.name}" channel inside of "${message.guild.name}" server`);
    if (message.content === '!pls help') {
    message.reply(`use "!pls kill" in chat. you can @ other members to kill them or you can use "!pls kill me" to kill yourself. You can also use !pls join and!pls leave for voice chat commands(still need to implement)`);
    } 
    if(message.content.startsWith("!pls kill")&&mention){message.channel.send(`${mention} ${random_item(kills)}`)}
    if (message.content === '!pls kill me') { message.reply(random_item(kills))}
})
client.on('message', (message) => {
    if (message.content === '!pls join') {
        if (!message.member.voice.channel) {
            message.reply("you are not in a voice channel")
            return
        }
        if (message.member.voice.channel) {
            message.member.voice.channel.join()
        }
    }
    if (message.content === '!pls leave') {
        if (!message.member.voice.channel) {
            message.reply("you are not in a voice channel")
            return
        }
        if (message.member.voice.channel) {
            message.member.voice.channel.leave()
        }
    }
})
//bot login
//client.login(process.env.token)
client.login("ODczMzM1MDY2OTEzMzA4Njgy.YQ26qQ.-ryiCEztOxbn19wqHwcKUxm_kxM")
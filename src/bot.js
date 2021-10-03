/*add bot to server:
https://discord.com/api/oauth2/authorize?client_id=819374796261294110&permissions=0&scope=bot
*/
//prerequisites
const { Client } = require('discord.js')
require('dotenv').config()
const client = new Client()
const { prefix } = require("../config.json")
const kills = require("./kills")
//kill messages
let helpMsg = `use "!pls kill" in chat. you can @ other members to kill them or you can use "!pls kill me" to kill yourself. \
 You can also use !pls join and!pls leave for voice chat commands(still need to implement)`
 
//get random values
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
    if (!message.content.startsWith(prefix)) return
})
//bot message reactions
client.on('message', (message) => {
    if (message.content === '!pls kill me') { message.reply(random_item(kills)) }
    if (message.content === `${prefix} help`) { message.reply(helpMsg) }
    if (message.content === `${prefix} kill @everyone`) { message.channel.send(`@everyone ${random_item(kills)}`) }
    //menion handling
    let mention = message.mentions.users.array()
    if (message.content.startsWith("!pls kill") && mention.length == 1) 
        { message.channel.send(`${mention} ${random_item(kills)}`) }
    else if (message.content.startsWith(`${prefix}`) && mention.length != 1 || 0) {
        mention.forEach(ment => {
        message.channel.send(`${ment} ${random_item(kills)}`)
    })}
})
//bot login
client.login(process.env.token)

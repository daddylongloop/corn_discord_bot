/*add bot to server:
https://discord.com/api/oauth2/authorize?client_id=819374796261294110&permissions=0&scope=bot
*/
//imports
    // discord.js stuff
const { Client } = require('discord.js')
const client = new Client()
// */ discord imports
require('dotenv').config()// get dotenv configuration
const { prefix } = require("../config.json") // get the prefix
const kills = require("./kills") // get the kill message array
//help message
let helpMsg = `use "!pls kill" in chat. you can @ other members to kill them or you can use "!pls kill me" to kill yourself. \
 You can also use !pls join and!pls leave for voice chat commands(still need to implement)`
 
//get random kill messsage
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
    if (message.content === `${prefix} kill me`) { message.reply(random_item(kills)) } // "suicide" message
    if (message.content === `${prefix} help`) { message.reply(helpMsg) } // help message
    if (message.content === `${prefix} kill @everyone`) { message.channel.send(`@everyone ${random_item(kills)}`) } // kill @everyone
    //menion handling
    let mention = message.mentions.users.array() // get array of users mentioned
    if (message.content.startsWith(`${prefix} kill`) && mention.length == 1)  // check if there is only one one mention 
        { message.channel.send(`${mention} ${random_item(kills)}`) }
    else if (message.content.startsWith(`${prefix}`) && mention.length != 1 || 0) { 
        // checks if more than 1 person was  mentioned, and then sends a message for each person mentioned
        mention.forEach(ment => {
        message.channel.send(`${ment} ${random_item(kills)}`)
    })}
})
//bot login
client.login(process.env.token)

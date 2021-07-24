//https://discord.com/api/oauth2/authorize?client_id=819374796261294110&permissions=0&scope=bot
//prerequisites
const { Client } = require('discord.js');
require('dotenv').config()
const client = new Client();
//kill messages
const kills = ["has drowned in money!", "got sniped!", "got poisoned!", "fell in the shower!", 
    "got cancer!", "got ran over by a car!", "fell out of a plane!",
    "was eaten by a shark!", "remembered an embarrassing moment from 2 years ago!", "fell down the stairs!",
    "spontaneously died!", "didnt do their math homework!", "got electrocuted!", "got an F on their test!", 
    "got stabbed!", "stubbed their toe!", "power went out while updating BIOS!", "got hit by an avalanche!", 
    "was caught lackin!", "got one tapped!", ];

//get random values
random_item=(kill)=>kill[Math.floor(Math.random()*kill.length)]
//bot ready message
client.on('ready',()=>{console.log(`${client.user.tag} has logged in`)});
//check for if mesasage author is bot
client.on('message',(message)=>{if(message.author.bot)return;})
//bot message reactions
client.on('message', (message) =>{
    //console.log(`${message.author.tag} wrote "${message.content}"` );
    if(message.content==='!pls help'){message.reply("use \"!pls kill\" in chat. you can @ other members to kill them or you can use \"!pls kill me\" to kill yourself.");}
    let mention = message.mentions.users.first()
    if(message.content.startsWith("!pls kill")&&mention){message.channel.send(`${mention} ${random_item(kills)}`)}
    if(message.content==='!pls kill me'){message.reply(random_item(kills));}});
    
//bot login
client.login(process.env.token);
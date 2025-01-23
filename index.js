require('dotenv/config');

const { Client, Events, GatewayIntentBits } = require('discord.js');
const { default: OpenAI } = require('openai');

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1', 
    apiKey: process.env.DEEPSEEK_API,
})

// Create a new client instance
const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent']
}); 

client.on('ready', (c) => {
    console.log(`${c.user.username} menyala abangkuh`); 
})

client.on ('messageCreate', async(message) => {
    if (message.author.bot || !message.content || message.content === '') return; 
    const response = await openai.chat.completions.create({
        messages: [{role: 'user', content: message.content}], 
        model: 'deepseek-reasoner', 
    }).catch((error) => console.error('OPENAI Error:\n', error)); 
    message.reply(response.choices[0].message.content); 
}); 

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
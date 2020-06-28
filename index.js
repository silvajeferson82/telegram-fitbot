const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = 'COLOQUE O SEU TOKEN AQUI';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  try {
     const chatId = msg.chat.id;
     console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);
    
    let responseText = dfResponse;

    if (dfResponse.intent === "Treino específico") {
      responseText = youtube.searchVideoURL(
        responseText,
        dfResponse.fields.corpo.stringValue
      );
    }

     bot.sendMessage(chatId, responseText);
  } catch (error) {
    console.log('Erro -> ', error);
  }
 
});
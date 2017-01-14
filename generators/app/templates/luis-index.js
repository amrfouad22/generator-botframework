'use strict';
var builder = require('botbuilder');
var argv = require('yargs').argv;

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : argv.id,
  appPassword: process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : argv.password
});

var bot = new builder.UniversalBot(connector);
// make sure to update the below value to match your luis app url
const LuisModelUrl = '';

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({recognizers: [recognizer]})
    /*
    .matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
    */
    .matches('None', session => {
      session.send('Hi! This is the None intent handler. You said: \'%s\'.', session.message.text);
    })
    .onDefault(session => {
      session.send('Sorry, I did not understand \'%s\'.', session.message.text);
    });

bot.dialog('/', intents);

var restify = require('restify');
var server = restify.createServer();
server.listen(3978, function () {
  console.log('test bot endpont at http://localhost:3978/api/messages');
});
server.post('/api/messages', connector.listen());


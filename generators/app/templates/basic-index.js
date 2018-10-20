'use strict';
var builder = require('botbuilder');
var argv = require('yargs').argv;
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : argv.id,
  appPassword: process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : argv.password
});

var bot = new builder.UniversalBot(connector).set('storage',new builder.MemoryBotStorage());

bot.dialog('/', function (session) {
  session.send('You said ' + session.message.text);
});

var restify = require('restify');
var server = restify.createServer();
server.listen(3978, function () {
  console.log('test bot endpont at http://localhost:3978/api/messages');
});
server.post('/api/messages', connector.listen());

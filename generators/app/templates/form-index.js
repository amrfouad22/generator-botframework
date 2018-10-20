'use strict';
var builder = require('botbuilder');
var argv = require('yargs').argv;

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : argv.id,
  appPassword: process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : argv.password
});

var bot = new builder.UniversalBot(connector).set('storage',new builder.MemoryBotStorage());

bot.dialog('/', [
  function (session) {
    builder.Prompts.text(session, 'Hello... What\'s your name?');
  },
  function (session, results) {
    session.userData.name = results.response;
    builder.Prompts.number(session, 'Hi ' + results.response + ', How many years have you been coding?');
  },
  function (session, results) {
    session.userData.coding = results.response;
    builder.Prompts.choice(session, 'What language do you code Node using?', ['JavaScript', 'CoffeeScript', 'TypeScript']);
  },
  function (session, results) {
    session.userData.language = results.response.entity;
    session.send('Got it... ' + session.userData.name +
            ' you\'ve been programming for ' + session.userData.coding +
            ' years and use ' + session.userData.language + '.');
  }
]);
var restify = require('restify');
var server = restify.createServer();
server.listen(3978, function () {
  console.log('test bot endpont at http://localhost:3978/api/messages');
});
server.post('/api/messages', connector.listen());

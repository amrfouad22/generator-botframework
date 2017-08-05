'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to' + chalk.red('generator-botframework') + ' generator!'
    ));
    var prompts = [
      {
        type: String,
        name: 'name',
        message: 'what is the name of your bot?',
        default: 'mybot'
      },
      {
        type: String,
        name: 'author',
        message: 'Who is the bot author?',
        default: ''
      },
      {
        type: String,
        name: 'root-path',
        message: 'Relative path where the project should be created (blank = current directory)',
        default: '.'
      },
      {
        name: 'type',
        message: 'bot type:',
        type: 'list',
        choices: [
          {
            name: '[Basic] A bot with a single dialog that echoes back the user input.',
            value: 'basic'
          },
          {
            name: '[Form] A bot that shows how to collect input from a user using a sequence of steps using waterfalls.',
            value: 'form'
          },

          {
            name: '[Language Understanding] A bot that shows how to handle natural language using the Cognitive Services LUIS API.',
            value: 'luis'
          }
        ]
      }
    ];
    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },
  writing: function () {
    var sourceFile = this.props.type + '-index.js';
    this.fs.copy(
      this.templatePath(sourceFile),
      this.destinationPath(this.props['root-path'] + '/index.js')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(this.props['root-path'] + '/package.json'),
      {name: this.props.name, author: this.props.author}
    );
  },
  install: function () {
    this.npmInstall();
  }
});

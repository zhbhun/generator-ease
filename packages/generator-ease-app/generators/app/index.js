'use strict';
const path = require('path');
const mkdirp = require('mkdirp');
const askName = require('inquirer-npm-name');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return askName(
      {
        name: 'name',
        message: 'Your app name:'
      },
      this
    ).then(props => {
      this.props.name = props.name;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your app must be inside a folder named ${
          this.props.name
        }\nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.fs.copy(this.templatePath('./'), this.destinationPath(), {
      globOptions: { dot: true }
    });
  }

  install() {
    this.npmInstall();
  }
};

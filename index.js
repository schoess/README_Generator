const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the project?"
    },
    {
      type: "input",
      name: "description",
      message: "Describe what the project does?"
    },
    {
      type: "input",
      name: "appscreenie",
      message: "Link a screenshot of the application here"
    },
    {
      type: "input",
      name: "license",
      message: "What is the license?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "email",
      message: "Enter your Github email."
    },
    {
      type: "input",
      name: "profpic",
      message: "Link your Github profile picture here."
    }
  ]);
}

function generateHTML(answers) {
  return `
  # ${answers.title}
  > ${answers.description}
  
  [![NPM Version][npm-image]][npm-url]
  ## Table of Contents
    * Installation
    * Usage
    * License
    * Contributing
    * Tests
    * Creater info
  
  ## Installation
  
  OS X & Linux:
  
  \```sh
  npm install ${answers.title} --save
  \```
  
  Windows Bash Terminal:
  
  \```sh
  npm install ${answers.title} --save
  \```
  
  ## Usage example
  
  AS a user
  WHEN I do thing
  THEN I want x
  WHEN I click x
  THEN x does y
  
  ![Screenshot of Application](${answers.appscreenie} "Screenshot")-
  
  Upload screenshots, video links or gifs here to help the user understand what it is the project does.
  
  ## License
  
  License: ${answers.license}
  
  ## Contributing
  
  1. Fork it (<https://github.com/schoess/README_Generator/fork>)
  2. Create your feature branch (\`git checkout -b feature/fooBar\`)
  3. Commit your changes (\`git commit -am 'Add some fooBar'\`)
  4. Push to the branch (\`git push origin feature/fooBar\`)
  5. Create a new Pull Request
  
  ## Questions
  
  Questions? Hit me up on Github
  
  Username: ${answers.github}
  Email: ${answers.email}
  
  ![Github Profile Picture](${answers.profpic} "Profile Picture")
  
  <!-- Markdown link & img dfn's -->
  [npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
  [npm-url]: https://npmjs.org/package/datadog-metrics
  [npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
  [travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
  [travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
  [wiki]: https://github.com/yourname/yourproject/wiki`;
}

async function init() {
  console.log("ready")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch(err) {
    console.log(err);
  }
}

init();

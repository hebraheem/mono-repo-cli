require = require("esm")(module /*, options*/);
const arg = require("arg");
const inquirer = require("inquirer");
const { createProject } = require("./main");

async function getConfig(rawArgs) {
  const args = arg(
    {
      "--typescript": Boolean,
      "--git": Boolean,
      "-ts": "--typescript",
      "-g": "--git",
      "--storyBook": Boolean,
      "--reactRouter": Boolean,
      "--communication": String,
      "--styles": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  const options = {
    directory: args._[0],
    typescript: args["--typescript"] || false,
    git: args["--git"] || false,
  };

  const questions = [];
  // Package Manager Options
  questions.push({
    type: "list",
    name: "pkgMgr",
    message: "Which Package Manager to Use",
    choices: ["NPM", "Yarn"],
    default: "Yarn",
  });
  // Project Name
  if (!options.directory) {
    questions.push({
      name: "directory",
      message: "Project Name",
      default: "my-project",
    });
  }

  if (!options.typescript) {
    questions.push({
      name: "typescript",
      type: "confirm",
      message: "Enable TypeScript",
      default: false,
    });
  }

  if (!options.git) {
    questions.push({
      name: "git",
      type: "confirm",
      message: "Enable Git",
      default: false,
    });
  }

  if (!options.reactRouter) {
    questions.push({
      name: "reactRouter",
      type: "confirm",
      message: "Enable React Router",
      default: true,
    });
  }

  if (!options.styles) {
    questions.push({
      name: "styles",
      type: "list",
      choices: ["MUI", "antd"],
      message: "style option ?",
      default: "MUI",
    });
  }

  if (!options.communication) {
    questions.push({
      name: "communication",
      type: "list",
      choices: ["React-query", "graphQL"],
      message: "how do you want to talt to the server?",
      default: "React-query",
    });
  }

  if (!options.storyBook) {
    questions.push({
      name: "storyBook",
      type: "confirm",
      message: "want to use storybook?",
      default: false,
    });
  }

  if (!options.prettier) {
    questions.push({
      name: "prettier",
      type: "confirm",
      message: "want to use prettier?",
      default: true,
    });
  }
  const answers = await inquirer.prompt(questions);

  return {
    pkgMgr: answers.pkgMgr,
    directory: options.directory || answers.directory,
    typescript: options.typescript || answers.typescript,
    git: options.git || answers.git,
    reactRouter: options.reactRouter || answers.reactRouter,
    communication: options.communication || answers.communication,
    storyBook: options.storyBook || answers.storyBook,
    styles: options.styles || answers.styles,
    prettier: options.prettier || answers.prettier,
  };
}

cli(process.argv);

async function cli(args) {
  const options = await getConfig(args);
  await createProject(options);
}

module.exports = { cli };

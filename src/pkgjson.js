import { taskListGenerator } from "./packages";

const fs = require("fs");
import execa from "execa";
// import Listr from 'listr'

function addToPackageJson(options) {
  const scripts = {
    start: "react-scripts start",
    build: "react-scripts build",
    test: "react-scripts test",
    eject: "react-scripts eject",
    format: 'prettier --write "**/*.+(js|jsx|json|css|md)"',
    "format:check": 'prettier --list-different "src/**/*.{js,jsx,json,css,md}"',
    storybook: options.storyBook ? "start-storybook -p 9009 -s public" : "",
    "build-storybook": options.storyBook ? "build-storybook -s public" : "",
  };

  const lintStaged = {
    "*.+(js|jsx|tsx)": ["eslint --fix"],
    "*.+(json|css|md)": ["prettier --write", "git add"],
  };

  const eslintConfig = {
    extends: ["react-app", "react-app/jest"],
  };

  const browserslist = {
    production: [">0.2%", "not dead", "not op_mini all"],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version",
    ],
  };

  // Open Package.json for editing

  const filename = `${options.targetDirectory}/package.json`;

  const rawData = fs.readFileSync(filename);
  const data = JSON.parse(rawData);
  try {
    fs.unlinkSync(filename);
  } catch (err) {
    console.log("file not found");
  }

  const newData = {
    ...data,
    scripts,
    browserslist,
    "lint-staged": lintStaged,
    eslintConfig,
  };
  const newJSONData = JSON.stringify(newData, null, 2);
  fs.writeFileSync(filename, newJSONData);
}

export const npmSetup = (options) => {
  const npmInit = {
    title: "NPM Init",
    task: async () => {
      const result = await execa("npm", ["init", "-y"], {
        cwd: options.targetDirectory,
      });
      if (result.failed) {
        throw new Error("Error initializing NPM");
      }
    },
  };
  const packageJson = {
    title: "Add Scripts to Package.json",
    task: async () => addToPackageJson(options),
  };

  return taskListGenerator(
    "Initializing Project",
    [npmInit, packageJson],
    true
  );
};

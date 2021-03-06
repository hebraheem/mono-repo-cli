import execa from "execa";
import Listr from "listr";

const packages = {
  react: ["react", "react-dom", "react-scripts", "babel-loader@8.1.0"],
  decodeJwt: ["jwt-decode"],
  reactRouter: ["react-router-dom"],
  testing: [
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
  ],
  "material-ui": [
    "@material-ui/core",
    "@material-ui/lab",
    "@material-ui/icons",
    "@material-ui/styles",
    "@material-ui/pickers",
  ],
  antd: ["antd"],
  "react-query": ["react-query", "react-query-devtools"],
  graphQL: [
    "graphql",
    "@apollo/client",
    "apollo-link-context",
    "apollo-upload-client",
  ],
};

const devPackages = {
  typescript: ["typescript"],
  reactTypes: ["@types/react", "@types/node", "@types/react-dom"],
  reactRouterTypes: ["@types/react-router-dom"],
  gitTools: ["husky", "lint-staged"],
  prettier: ["prettier"],
  testingTypes: ["@types/jest"],
  storyBook: [
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addons",
    "@storybook/preset-create-react-app",
    "@storybook/react",
  ],
  "prop-types": ["prop-types"],
};

const packageListGenerator = (pkgMgr, flags, packages, options) => {
  return packages.map((pkg) => ({
    title: `Installing ${pkg}`,
    task: async () => {
      const result = await execa(pkgMgr, [...flags, pkg], {
        cwd: options.targetDirectory,
      });
      if (result.failed) {
        throw new Error(`Failed to install ${pkg}`);
      }
    },
  }));
};

export const taskListGenerator = (title, tasks, enable) => ({
  title,
  enabled: () => enable,
  task: () => new Listr(tasks),
});

export const packageList = (options) => {
  const packageManager = options.pkgMgr === "Yarn" ? "yarn" : "npm";
  const packageManagerFlags = packageManager === "yarn" ? ["add"] : ["i"];
  const packageManagerDevFlags =
    packageManager === "yarn"
      ? [...packageManagerFlags, "--dev"]
      : [...packageManagerFlags, "-D"];

  const packageList = {};

  Object.keys(packages).forEach((pkgs) => {
    packageList[pkgs] = packageListGenerator(
      packageManager,
      packageManagerFlags,
      packages[pkgs],
      options
    );
  });
  Object.keys(devPackages).forEach((pkgs) => {
    packageList[pkgs] = packageListGenerator(
      packageManager,
      packageManagerDevFlags,
      devPackages[pkgs],
      options
    );
  });

  const reactTask = taskListGenerator("React", packageList["react"], true);
  const reactRouterTask = taskListGenerator(
    "React Router",
    packageList["reactRouter"],
    options.reactRouter
  );
  const typeScriptSubTask = taskListGenerator(
    "TypeScript",
    packageList["typescript"],
    options.typescript
  );
  const reactTypeScriptTask = taskListGenerator(
    "Types for React",
    packageList["reactTypes"],
    true
  );
  const decodeJWT = taskListGenerator(
    "decodejwt",
    packageList["jwt-decode"],
    options.decodeJWT
  );
  const reactRouterTypesTask = taskListGenerator(
    "Types for React Router",
    packageList["reactRouterTypes"],
    options.reactRouter
  );
  const gitToolsTasks = taskListGenerator(
    "Commit Tools",
    packageList["gitTools"],
    true
  );
  const prettierTasks = taskListGenerator(
    "Prettier",
    packageList["prettier"],
    true
  );
  const testingTypescriptTask = taskListGenerator(
    "Types for Jest",
    packageList["testingTypes"],
    true
  );
  const typescriptTask = taskListGenerator(
    "TypeScript",
    [
      typeScriptSubTask,
      reactTypeScriptTask,
      testingTypescriptTask,
      reactRouterTypesTask,
    ],
    options.typescript
  );
  const testingTasks = taskListGenerator(
    "Testing",
    packageList["testing"],
    true
  );
  const storyBook = taskListGenerator(
    "storyBook",
    packageList["storyBook"],
    options.storyBook
  );
  const propTypes = taskListGenerator(
    "prop-types",
    packageList["prop-types"],
    !options.typescript
  );
  const stylePattern =
    options.styles === "MUI"
      ? taskListGenerator("material-ui", packageList["material-ui"], true)
      : taskListGenerator("antd", packageList["antd"], true);
  const communication =
    options.communication === "React-query"
      ? taskListGenerator("react-query", packageList["react-query"], true)
      : taskListGenerator("graphQL", packageList["graphQL"], true);

  const allPackages = [
    reactTask,
    testingTasks,
    reactRouterTask,
    gitToolsTasks,
    prettierTasks,
    typescriptTask,
    stylePattern,
    communication,
    storyBook,
    propTypes,
    decodeJWT,
  ];

  return taskListGenerator("Package Install", allPackages, true);
};

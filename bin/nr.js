#!/usr/bin/env node

const { resolve } = require("path");
const pkgPath = resolve(process.cwd(), "package.json");
const { match, run } = require("../src/utils");
const inquirer = require("inquirer");

let pkg;

try {
  pkg = require(pkgPath);
} catch (err) {
  throw new Error(`Failed to import ${pkgPath}`);
}

if (!pkg || !pkg.scripts) {
  throw new Error(`No scripts found in ${pkgPath}`);
}

const scriptNames = Object.keys(pkg.scripts);
const needle = process.argv[2] || "";
const matchedScriptNames = match(needle, scriptNames);

if (!matchedScriptNames.length) {
  throw new Error(`"${needle}" doesn't match any script name`);
}

if (matchedScriptNames.length === 1) {
  runNPM(matchedScriptNames[0]);
} else {
  inquirer
    .prompt({
      name: "name",
      type: "list",
      choices: matchedScriptNames
    })
    .then(({ name }) => {
      runNPM(name);
    });
}

function runNPM(name) {
  const extra = process.argv.slice(3);
  if (extra.length) {
    extra.unshift("--");
  }
  return run("npm", ["run", name].concat(extra));
}

// Import the needed libraries
const fs = require("fs");
const path = require("path");

const Walker = require("node-source-walk");
const types = require("ast-module-types");
const dependencyTree = require("dependency-tree");

const config = require("./webpack.config.js");

// usefull constants
const currentDir = path.resolve(__dirname, ".");
const pathToOutput = config.output.path + "/" + config.output.filename;

// helper parse dependencies from source code
// return example: ["./a.js","./b.js"]
const getDependencies = function(content) {
  const walker = new Walker();

  const dependencies = [];

  walker.walk(content, function(node) {
    let dependency;

    if (!types.isRequire(node) || !node.arguments || !node.arguments.length) {
      return;
    }

    if (
      node.arguments[0].type === "Literal" ||
      node.arguments[0].type === "StringLiteral"
    ) {
      dependency = node.arguments[0].value;
      dependencies.push(dependency);
    }
  });

  return dependencies;
};

// helper function for absolut path
const getAbsolutePathFromDependency = function(dependencyPath, filepath) {
  if (path.isAbsolute(dependencyPath)) {
    return dependencyPath;
  }

  return path.join(path.dirname(filepath), dependencyPath);
};

// read the source and replace dependencies
const getSourceForFile = function(filepath) {
  const data = fs.readFileSync(filepath, "utf8");

  const dependencies = getDependencies(data);
  let source = data;
  dependencies.forEach(depFilepath => {
    const absolute = getAbsolutePathFromDependency(depFilepath, filepath);

    const index = dependencyList.indexOf(absolute);
    source = source.replace(
      'require("' + depFilepath + '")',
      "require(" + index + ")"
    );
  });

  return source;
};

// Build dependency list
const dependencyList = dependencyTree
  .toList({
    filename: config.entry,
    directory: currentDir
  })
  .reverse();

// from dependencyList build sources array
const sources = [];
for (index = 0; index < dependencyList.length; index++) {
  const filepath = dependencyList[index];
  sources[index] = getSourceForFile(filepath);
}

// remove old bundle
if (fs.existsSync(pathToOutput)) {
  fs.unlink(pathToOutput, err => {
    if (err) throw err;
  });
}

// templates we are using to write final file
const templateStart = `(function(modules) {
    var installedModules = {};
    function require(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = (installedModules[moduleId] = {
            exports: {}
        });
        modules[moduleId](module, module.exports, require);
        return module.exports;
    }
    return require(0);
})([
`;
const templateEnd = `])`;

const sourceStart = `function(module, exports, require) {
`;
const sourceEnd = `
},`;

// writing the output file
fs.writeFile(pathToOutput, templateStart, function(err) {
  if (err) {
    return console.log(err);
  }
});

for (index = 0; index < dependencyList.length; index++) {
  fs.appendFile(
    pathToOutput,
    sourceStart + sources[index] + sourceEnd,
    function(err) {
      if (err) {
        return console.log(err);
      }
    }
  );
}

fs.appendFile(pathToOutput, templateEnd, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log(`Finished, bundle has been written to: ${pathToOutput}`);
});

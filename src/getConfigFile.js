const getConfigFile = function (moduleName) {
    return `const name = '${moduleName}';

const config = {
    name: name,
    path: \`/\${name}\`,
};

module.exports = config;`;
}

module.exports = getConfigFile;
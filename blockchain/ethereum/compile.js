const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
const serverPath = path.resolve(__dirname, "..", "..", "backend", "blockchain", "contracs");
const contractsPath = path.resolve(__dirname, "contracts");

const jaggeryPath = path.resolve(contractsPath, "Jaggery.sol");
const jaggerySalePath = path.resolve(contractsPath, "JaggerySale.sol");
const registryPath = path.resolve(contractsPath, "Registry.sol");

const getSource = (filePath) => {
    return fs.readFileSync(filePath, "utf8");
}

const resolveImports = (importPath) => {
    return { contents: getSource(path.resolve(contractsPath, importPath)) };
}

fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

fs.removeSync(serverPath);
fs.ensureDirSync(serverPath);

const compileInput = {
    language: "Solidity",
    sources: {
        "Jaggery.sol": { content: getSource(jaggeryPath) },
        "JaggerySale.sol": { content: getSource(jaggerySalePath) },
        "Registry.sol": { content: getSource(registryPath) }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": [ "*" ]
            }
        }
    }
}

const compileOutput = JSON.parse(solc.compile(JSON.stringify(compileInput), resolveImports));

const contracts = Object.values(compileOutput.contracts);

contracts.forEach((contract) => {
    const name = Object.keys(contract)[0];
    fs.outputJSONSync(
        path.resolve(buildPath, name + ".json"),
        contract[name]
    );
    fs.outputJSONSync(
        path.resolve(serverPath, name + ".json"),
        contract[name]
    );
});
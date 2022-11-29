const fs = require('fs');
const { commands, window, workspace, Uri, } = require('vscode');
const getConfigFile = require('./src/getConfigFile');

let modulePath = './modules';

const createModule = async function () {
	const moduleName = await window.showInputBox({
		value: 'ModuleName',
		placeHolder: 'Please type a module name',
	});
	if (!moduleName) return;

	window.showInformationMessage('Creating Module: ' + moduleName);

	if (!fs.existsSync(modulePath)) {
		fs.mkdirSync(modulePath);
	}
	if (!fs.existsSync(`${modulePath}\\${moduleName}`)) {
		fs.mkdirSync(`${modulePath}\\${moduleName}`);
	}
	fs.writeFile(`${modulePath}\\${moduleName}\\config.js`, getConfigFile(moduleName), { flag: "a+" }, (err) => {
		if (err) throw err;
		console.log('The file is created if not existing!!');
	});



	// workspace.updateWorkspaceFolders(0, undefined, { uri: Uri.parse(`${modulePath}\\${moduleName}`) });


};

function activate(context) {

	if (workspace.workspaceFolders !== undefined) {
		// let wf = workspace.workspaceFolders[0].uri.path;
		let f = workspace.workspaceFolders[0].uri.fsPath;
		modulePath = `${f}\\modules`;
	}
	commands.registerCommand('restmodule.createModule', createModule);
	context.subscriptions.push(createModule);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}

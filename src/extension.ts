// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import initCommands from './initCommands';
import ReactPanel from './ReactPanel';
import {loadConfig} from './Commands/LoadConfigCommand';

const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	initCommands(context);

	loadConfig().then(config => {
		context.subscriptions.push(vscode.commands.registerCommand('theiatutorialextension.displayContent', () => {
			ReactPanel.createOrShow(context.extensionPath);
		}));


		vscode.commands.executeCommand('theiatutorialextension.displayContent').then(() => {
			ReactPanel.currentPanel?.sendToView({command: 'setTutorials', tutorials: config});
		});
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }

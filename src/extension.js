"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require('vscode');
const book = require("./bookUtil");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const bookObj = new book.Book();

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "status-read" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// 老板键
    let bossHide = vscode_1.commands.registerCommand('statusRead.bossHide', () => {
		// 停掉自动刷新
		if (bookObj.automatic){
			bookObj.automatic = false;
			vscode_1.workspace.getConfiguration().update('statusRead.automatic', bookObj.automatic, true);
		}
		if(bookObj.intervalId){
			clearInterval(bookObj.intervalId);
			bookObj.intervalId = undefined;
		}
        vscode_1.window.setStatusBarMessage("fmt.Println(\"Hello World!\)");
    });
	 // 下一行
	 let getNextLine = vscode_1.commands.registerCommand('statusRead.getNextLine', () => {
		// 手动翻页时禁用自动翻页
		if (bookObj.automatic){
			bookObj.automatic = false;
			vscode_1.workspace.getConfiguration().update('statusRead.automatic', bookObj.automatic, true);
		}
		if(bookObj.intervalId){
			clearInterval(bookObj.intervalId);
			bookObj.intervalId = undefined;
		}
		vscode_1.window.setStatusBarMessage(bookObj.getNextLine());
    });
    // 上一行
    let getPreviousLine = vscode_1.commands.registerCommand('statusRead.getPreviousLine', () => {
		// 手动翻页时禁用自动翻页
		if (bookObj.automatic){
			bookObj.automatic = false;
			vscode_1.workspace.getConfiguration().update('statusRead.automatic', bookObj.automatic, true);
		}
		if(bookObj.intervalId){
			clearInterval(bookObj.intervalId);
			bookObj.intervalId = undefined;
		}
        vscode_1.window.setStatusBarMessage(bookObj.getPreviousLine());
    });
	// 重新加载
	let reLoad = vscode_1.commands.registerCommand('statusRead.reLoad', () => {
		// 停掉自动刷新
		if (bookObj.automatic){
			bookObj.automatic = false;
			vscode_1.workspace.getConfiguration().update('statusRead.automatic', bookObj.automatic, true);
		}
		if(bookObj.intervalId){
			clearInterval(bookObj.intervalId);
			bookObj.intervalId = undefined;
		}
        bookObj.init();
    });
	// 自动翻页
	let automatic = vscode_1.commands.registerCommand('statusRead.automatic', () => {
        bookObj.automatic = !bookObj.automatic;
		vscode_1.workspace.getConfiguration().update('statusRead.automatic', bookObj.automatic, true);
		console.log(bookObj.automatic);
		// 先停掉之前可能存在的定时任务
		if (bookObj.intervalId){
			clearInterval(bookObj.intervalId);
			bookObj.intervalId = undefined;
		}
		// 如果是开启，则新建一个定时任务
		if(bookObj.automatic){
			bookObj.intervalId = setInterval(() => {
				vscode_1.window.setStatusBarMessage(bookObj.getNextLine());
			}, bookObj.autoInterval);
		}
    });
	context.subscriptions.push(bossHide);
    context.subscriptions.push(getNextLine);
    context.subscriptions.push(getPreviousLine);
	context.subscriptions.push(reLoad);
	context.subscriptions.push(automatic);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

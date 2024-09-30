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
	// vscode_1.window.setStatusBarMessage("123");
	const statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 0);
	statusBarItem.text = '';
	statusBarItem.show();
	// 添加鼠标点击事件
	statusBarItem.command = 'statusRead.clickNextLine';
	statusBarItem.tooltip = "点击下一页";
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// 点击操作
	let clickNextLine = vscode_1.commands.registerCommand('statusRead.clickNextLine', () => {
		// 停掉自动刷新
		bookObj.stopTimer();
		statusBarItem.text = bookObj.getNextLine();
	});
	// 老板键
    let bossHide = vscode_1.commands.registerCommand('statusRead.bossHide', () => {
		// 停掉自动刷新
		bookObj.stopTimer();
		bookObj.isShow = !bookObj.isShow;
		if (bookObj.isShow){
			statusBarItem.show();
		}else{
			statusBarItem.hide();
		}
    });
	 // 下一行
	 let getNextLine = vscode_1.commands.registerCommand('statusRead.getNextLine', () => {
		// 手动翻页时禁用自动翻页
		bookObj.stopTimer();
		statusBarItem.text = bookObj.getNextLine();
    });
    // 上一行
    let getPreviousLine = vscode_1.commands.registerCommand('statusRead.getPreviousLine', () => {
		// 手动翻页时禁用自动翻页
		bookObj.stopTimer();
        statusBarItem.text = bookObj.getPreviousLine();
    });
	// 重新加载
	let reLoad = vscode_1.commands.registerCommand('statusRead.reLoad', () => {
		// 停掉自动刷新
		bookObj.stopTimer();
        bookObj.init();
		statusBarItem.text = "reload";
    });
	// 自动翻页
	let automatic = vscode_1.commands.registerCommand('statusRead.automatic', () => {
        bookObj.automatic = !bookObj.automatic;
		console.log(bookObj.automatic);
		// 先停掉之前可能存在的定时任务
		if (bookObj.intervalId){
			clearInterval(bookObj.intervalId);
			bookObj.intervalId = undefined;
		}
		// 如果是开启，则新建一个定时任务
		if(bookObj.automatic){
			bookObj.intervalId = setInterval(() => {
				statusBarItem.text = bookObj.getNextLine();
			}, bookObj.autoInterval);
		}
    });
	// 跳转
	let jumpPage = vscode_1.commands.registerCommand('statusRead.jumpPage', () => {
		bookObj.stopTimer();
		// 弹书输入框，输入页码
        vscode_1.window.showInputBox({
            placeHolder: "请输入行数",
            validateInput: (text) => {
                if (text === "") {
                    return "请输入行数";
                }
                if (isNaN(Number(text))) {
                    return "请输入数字";
                }
                if (Number(text) < 1 || Number(text) > bookObj.lineList.length) {
                    return "请输入1到" + bookObj.lineList.length + "之间的数字";
                }
            },
        })
        .then((value) => {
            if (value === undefined) {
                return;
            }
            bookObj.currLineNum = Number(value);
            bookObj.linePos = 0;
            console.log("jumpPage: " + bookObj.currLineNum);
            statusBarItem.text = bookObj.getNextLine();
        });
    });

	context.subscriptions.push(statusBarItem);
	context.subscriptions.push(clickNextLine);
	context.subscriptions.push(bossHide);
    context.subscriptions.push(getNextLine);
    context.subscriptions.push(getPreviousLine);
	context.subscriptions.push(reLoad);
	context.subscriptions.push(automatic);
	context.subscriptions.push(jumpPage);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

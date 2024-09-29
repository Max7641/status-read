"use strict";
const vscode_1 = require("vscode");
const fs = require("fs");
class Book {
    constructor() {
        this.filePath = ""; // 文件路径
        this.displaySize = 40; // 每次显示字数
        this.linePos = 0; // 当前行的显示位置
        this.lineList = []; //小说内容
        this.currLineNum = 1; //当前行号，从1开始
        this.automatic = false;
        this.autoInterval = 1;
        this.intervalId;
        this.displayLineNum = true;
    }
    init() {
        console.log("init");
        this.filePath = vscode_1.workspace.getConfiguration().get('statusRead.filePath');
        if (this.filePath === "" || typeof (this.filePath) === "undefined") {
            vscode_1.window.showWarningMessage("请填写TXT格式的小说文件路径");
            return false;
        }
        this.automatic = vscode_1.workspace.getConfiguration().get('statusRead.automatic');
        this.autoInterval = vscode_1.workspace.getConfiguration().get('statusRead.autoInterval')*1000;
        this.displaySize = vscode_1.workspace.getConfiguration().get('statusRead.displaySize');
        this.displayLineNum = vscode_1.workspace.getConfiguration().get('statusRead.displayLineNum');
        if (this.displaySize < 1){
            this.displaySize = 50;
        }
        this.currLineNum = vscode_1.workspace.getConfiguration().get('statusRead.currLineNum');
        let data = fs.readFileSync(this.filePath, 'utf-8');
        if (data.length === 0) {
            vscode_1.window.showWarningMessage("文件不存在或无法读取");
            return false;
        }
        // this.bookContext = data.toString().replace(/\n/g, line_break).replace(/\r/g, " ").replace(/　　/g, " ").replace(/ /g, " ");
        this.lineList = [];
        for(let line of data.toString().split("\n")){
            line = line.trim();
            if(line.length > 0){
                this.lineList.push(line);
            }
        }
        if (this.intervalId){
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        if(this.automatic){
            this.intervalId = setInterval(()=>{
                vscode_1.window.setStatusBarMessage(this.getNextLine());
            }, this.autoInterval);
        }
        return true;
    }
    getPreviousLine() {
        console.log("getPreviousLine");
        if(this.lineList.length == 0){
            if (!this.init()){
                return "初始化失败！";
            }
        }
        // 不管当前行是否显示完，直接跳到上一行显示
        if(this.currLineNum <= 1){
            this.currLineNum = 1;
        }else{
            this.currLineNum -= 1;
            vscode_1.workspace.getConfiguration().update('statusRead.currLineNum', this.currLineNum, true);
        }
        let line = "";
        if(this.displayLineNum){
            let page_info = this.currLineNum.toString() + "/" + this.lineList.length.toString();
            line = page_info + "> " + this.lineList[this.currLineNum-1].substr(0, this.linePos);
        }else{
            line = this.lineList[this.currLineNum-1].substr(0, this.linePos);
        }
        this.linePos = this.displaySize;
        return line;
    }
    getNextLine() {
        console.log("getNextLine");
        if(this.lineList.length == 0){
            if (!this.init()){
                return "初始化失败！";
            }
        }
        // 先判断当前行是否已经显示完，如果没有则显示剩下内容，如果显示完了，就显示下一行
        let line;
        if(this.linePos >= this.lineList[this.currLineNum-1].length){
            if(this.currLineNum < this.lineList.length){
                this.currLineNum += 1;
                vscode_1.workspace.getConfiguration().update('statusRead.currLineNum', this.currLineNum, true);
            }
            if(this.displayLineNum){
                let page_info = this.currLineNum.toString() + "/" + this.lineList.length.toString();
                line = page_info + "> " + this.lineList[this.currLineNum-1].substr(0, this.displaySize);
            }else{
                line = this.lineList[this.currLineNum-1].substr(0, this.displaySize);
            }
            this.linePos = this.displaySize;
        }else{
            if(this.displayLineNum){
                let page_info = this.currLineNum.toString() + "/" + this.lineList.length.toString();
                line = page_info + "> " + this.lineList[this.currLineNum-1].substr(this.linePos, this.displaySize);
            }else{
                line = this.lineList[this.currLineNum-1].substr(this.linePos, this.displaySize);
            }
            this.linePos += this.displaySize;
        }
        return line;
    }
}
exports.Book = Book;

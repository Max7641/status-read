# status-read

一个在状态栏摸鱼看小说的插件

![不显示行号](https://raw.githubusercontent.com/Max7641/status-read/main/images/no-line-num.gif)

![显示行号](https://raw.githubusercontent.com/Max7641/status-read/main/images/line-num.gif)

可以【手动翻页】【自动翻页】【跳转】【老板键】

手动翻页或重载等操作会退出自动翻页

reLoad会重新加载配置并读取小说到内存中

所有配置修改后，都需要重新加载才能生效

## 默认配置

**需要填写小说路径才可以使用此插件，小说必须为utf-8格式**

| ID                          | 说明                     | 默认值   |
| :-------------------------- | :----------------------- | :------- |
| `statusRead.filePath`       | utf-8格式小说文件绝对路径    | ""       |
| `statusRead.autoInterval`   | 自动翻页间隔(单位秒)     | 1.5     |
| `statusRead.currLineNum`    | 当前阅读的行号          | 1     |
| `statusRead.displayLineNum` | 是否显示行号             | true  |
| `statusRead.displaySize`    | 最大显示字数             | 40    |

阅读时当前行会实时保存到配置currLineNum中

## 路径格式

- **Mac** or **Linux** : /path/to/book.txt
- **Win** : C:\\\path\\\to\\\book.txt or C:/path/to/book.txt

## 快捷键

> 所有快捷键都必须在文本聚焦(编辑代码)的时候，才可以使用

**MAC**

`Cmd+1` 上一页

`Cmd+2` 下一页

`Cmd+3` 老板键(切换隐藏与显示)

`Cmd+4` 是否自动翻页

`Cmd+5` 跳转到指定行

`Cmd+6` 重新加载

**WIN**

`alt+1` 上一页

`alt+2` 下一页

`alt+3` 老板键(切换隐藏与显示)

`Cmd+4` 是否自动翻页

`Cmd+5` 跳转到指定行

`Cmd+6` 重新加载

ps: 本人是mac环境，所以win下的快捷键是否冲突未测试，若冲突就在快捷键设置里改下

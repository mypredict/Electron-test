const { app, BrowserWindow, ipcMain } = require('electron');

// 关闭安全警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

class AppWindow extends BrowserWindow {
  constructor(loadFile, config = {}) {
    const basicConfig = {
      width: 800,
      height: 600,
      center: true,
      backgroundColor: '#eee',
      parent: null, // 设置本窗口的父窗口(是否为模态窗同时设置)
      modal: true,  // 禁用父窗口的子窗口(是否为模态窗同时设置)
      show: true,  // 窗口显示|隐藏(最初的可见性状态将为visible)
      opacity: 1,
      // titleBarStyle: 'hiddenInset',
      webPreferences: {
        // 开启node
        nodeIntegration: true,
        devTools: true
      },
      webContents: {
        // openDevTools: () => {}
      }
    };
    const finalConfig = { ...basicConfig, ...config };
    super(finalConfig);
    // 开启的窗口文件
    this.loadFile(loadFile);
    // 渲染进程第一次渲染时没有视觉闪烁(第一次完成绘制时触发)
    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

let win;

function createWindow() {
  win = new AppWindow('index.html');
  // win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
  ipcMain.on('addMusic', (event, data) => {
    console.log(data);
    if (data) {
      event.sender.send('reply', `${data}-----`);
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

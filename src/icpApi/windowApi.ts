
const ipcWindowsApiRoute ={
    test: 'controller.example.test',
    WindowMax: 'controller.example.WindowMax', //窗体最大化
    WindowClose:'controller.example.WindowClose', //关闭应用程序
    WindowHide:'controller.example.WindowHide', //窗口隐藏
    winStart:'controller.example.winstart',  //窗口拖拽相关
    winMove:'controller.example.winmove',  //窗口拖拽相关

    getPrinterList:'controller.hardware.getPrinterList', //获取所有打印机
    getTheme:'controller.hardware.getTheme', //获取系统主题
    setTheme:'controller.hardware.setTheme', //设置系统主题
}

export default ipcWindowsApiRoute

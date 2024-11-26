import * as SignalR from '@microsoft/signalr';
import { ElNotification } from 'element-plus';
import { getToken,getTempToken } from '/@/utils/axios-utils';
let connection = new SignalR.HubConnectionBuilder()
.configureLogging(SignalR.LogLevel.Information)
.withUrl(`${window.__env__.VITE_API_URL}/hubs/cem?regId=1&recordId=1&token=${getToken()}`, { transport: SignalR.HttpTransportType.WebSockets, skipNegotiation: true })
.withAutomaticReconnect({
    nextRetryDelayInMilliseconds: () => {
        return 5000; // 每5秒重连一次
    },
})
.build();
const cemStart = (regId,recordId)=>{
// 初始化SignalR对象
connection.stop();
connection = new SignalR.HubConnectionBuilder()
.configureLogging(SignalR.LogLevel.Information)
.withUrl(`${window.__env__.VITE_API_URL}/hubs/cem?regId=${regId}&recordId=${recordId}&token=${getToken()}`, { transport: SignalR.HttpTransportType.WebSockets, skipNegotiation: true })
.withAutomaticReconnect({
    nextRetryDelayInMilliseconds: () => {
        return 5000; // 每5秒重连一次
    },
})
.build();
connection.keepAliveIntervalInMilliseconds = 15 * 1000; // 心跳检测15s
connection.serverTimeoutInMilliseconds = 30 * 60 * 1000; // 超时时间30m

// 启动连接
connection.start().then(() => {
	console.log('启动连接');
});
// 断开连接
connection.onclose(async () => {
	console.log('断开连接');
});
// 重连中
connection.onreconnecting(() => {
	// ElNotification({
	// 	title: '提示',
	// 	message: '服务器已断线...',
	// 	type: 'error',
	// 	position: 'bottom-right',
	// });
});
// 重连成功
connection.onreconnected(() => {
	// ElNotification({
	// 	title: '提示',
	// 	message: '服务已连接',
	// 	type: 'success',
	// 	position: 'bottom-right',
	// });
}); 

connection.on('CemSuccess', (_) => {
    console.log(_)
});

// return connection;
}
// connection.on('LoginRefresh', () => {});

export { cemStart,connection as signalR };

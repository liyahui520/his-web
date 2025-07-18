import * as SignalR from '@microsoft/signalr';
import { ElNotification } from 'element-plus';
import { getTempToken } from '/@/utils/axios-utils';

// 初始化SignalR对象
const connection = new SignalR.HubConnectionBuilder()
	.configureLogging(SignalR.LogLevel.Error)
	.withUrl(`${window.__env__.VITE_API_URL}/hubs/onlineUser?access_temp_token=${getTempToken()}`, { transport: SignalR.HttpTransportType.WebSockets, skipNegotiation: true })
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
	//console.log('启动连接');
});
// 断开连接
connection.onclose(async () => {
	//console.log('断开连接');
});
// 重连中
connection.onreconnecting(() => {
	ElNotification({
		title: '提示',
		message: '服务器已断线...',
		type: 'error',
		position: 'bottom-right',
	});
});
// 重连成功
connection.onreconnected(() => {
	ElNotification({
		title: '提示',
		message: '服务已连接',
		type: 'success',
		position: 'bottom-right',
	});
});

// connection.on('LoginRefresh', () => {});

export { connection as SignalR };

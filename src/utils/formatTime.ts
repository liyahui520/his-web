/**
 * 时间日期转换
 * @param date 当前时间，new Date() 格式
 * @param format 需要转换的时间格式字符串
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @returns 返回拼接后的时间字符串
 */
export function formatDate(date: Date, format: string): string {
	let we = date.getDay(); // 星期
	let z = getWeek(date); // 周
	let qut = Math.floor((date.getMonth() + 3) / 3).toString(); // 季度
	const opt: { [key: string]: string } = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		'q+': qut, // 季度
	};
	// 中文数字 (星期)
	const week: { [key: string]: string } = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六',
	};
	// 中文数字（季度）
	const quarter: { [key: string]: string } = {
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
	};
	if (/(W+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' + week[we] : '周' + week[we]) : week[we]);
	if (/(Q+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut]);
	if (/(Z+)/.test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 3 ? '第' + z + '周' : z + '');
	for (let k in opt) {
		let r = new RegExp('(' + k + ')').exec(format);
		// 若输入的长度不为1，则前面补零
		if (r) format = format.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0'));
	}
	return format;
}

/**
 * 获取当前日期是第几周
 * @param dateTime 当前传入的日期值
 * @returns 返回第几周数字值
 */
export function getWeek(dateTime: Date): number {
	let temptTime = new Date(dateTime.getTime());
	// 周几
	let weekday = temptTime.getDay() || 7;
	// 周1+5天=周六
	temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
	let firstDay = new Date(temptTime.getFullYear(), 0, 1);
	let dayOfWeek = firstDay.getDay();
	let spendDay = 1;
	if (dayOfWeek != 0) spendDay = 7 - dayOfWeek + 1;
	firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
	let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
	let result = Math.ceil(d / 7);
	return result;
}

/**
 * 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @param param 当前时间，new Date() 格式或者字符串时间格式
 * @param format 需要转换的时间格式字符串
 * @description param 10秒：  10 * 1000
 * @description param 1分：   60 * 1000
 * @description param 1小时： 60 * 60 * 1000
 * @description param 24小时：60 * 60 * 24 * 1000
 * @description param 3天：   60 * 60* 24 * 1000 * 3
 * @returns 返回拼接后的时间字符串
 */
export function formatPast(param: string | Date, format: string = 'YYYY-mm-dd'): string {
	// 传入格式处理、存储转换值
	let t: any, s: number;
	// 获取js 时间戳
	let time: number = new Date().getTime();
	// 是否是对象
	typeof param === 'string' || 'object' ? (t = new Date(param).getTime()) : (t = param);
	// 当前时间戳 - 传入时间戳
	time = Number.parseInt(`${time - t}`);
	if (time < 10000) {
		// 10秒内
		return '刚刚';
	} else if (time < 60000 && time >= 10000) {
		// 超过10秒少于1分钟内
		s = Math.floor(time / 1000);
		return `${s}秒前`;
	} else if (time < 3600000 && time >= 60000) {
		// 超过1分钟少于1小时
		s = Math.floor(time / 60000);
		return `${s}分钟前`;
	} else if (time < 86400000 && time >= 3600000) {
		// 超过1小时少于24小时
		s = Math.floor(time / 3600000);
		return `${s}小时前`;
	} else if (time < 259200000 && time >= 86400000) {
		// 超过1天少于3天内
		s = Math.floor(time / 86400000);
		return `${s}天前`;
	} else {
		// 超过3天
		let date = typeof param === 'string' || 'object' ? new Date(param) : param;
		return formatDate(date, format);
	}
}

/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns 返回拼接后的时间字符串
 */
export function formatAxis(param: Date): string {
	let hour: number = new Date(param).getHours();
	if (hour < 6) return '凌晨好';
	else if (hour < 9) return '早上好';
	else if (hour < 12) return '上午好';
	else if (hour < 14) return '中午好';
	else if (hour < 17) return '下午好';
	else if (hour < 19) return '傍晚好';
	else if (hour < 22) return '晚上好';
	else return '夜里好';
}
/**
 * 将时间转换为年龄值  XX岁XX月XX天
 * @param param 当前时间，new Date() 格式或者字符串时间格式
 * @returns 返回拼接后的时间字符串
 */
export function formatAge(param: string | Date): string {
	if (param == '' || param == undefined || param == null || param == 'null') return '';
	// 判断当前月天数
	function getDays(mouth, year) {
		let days = 30
		if (mouth === 2) {
			days = year % 4 === 0 ? 29 : 28
		} else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
			// 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
			days = 31
		}
		return days
	}
	let start: any = new Date(param)
	const end: any = new Date()
	// 获取年
	const startYear = start.getFullYear()
	const endYear = end.getFullYear()
	// 获取月
	const startMouth = start.getMonth() + 1
	const endMouth = end.getMonth() + 1
	// 获取日
	const startDay = start.getDate()
	const endDay = end.getDate()
	// 获取小时
	const startHours = start.getHours()
	const endHours = end.getHours()
	// 获取分
	const startMinutes = start.getMinutes()
	const endMinutes = end.getMinutes()
	// 获取秒
	const startSeconds = start.getSeconds()
	const endSeconds = end.getSeconds()
	// 相差年份月份
	const diffYear = endYear - startYear
	const startDays = getDays(startMouth, startYear)
	const endDays = getDays(endMouth, endYear)
	const diffStartMouth = (startDays - (startDay + ((startHours * 60 + startMinutes + startSeconds / 60) / 60 / 24) - 1)) / startDays
	const diffEndMouth = (endDay + ((endHours * 60 + endMinutes + endSeconds / 60) / 60 / 24) - 1) / endDays
	const diffMouth = diffStartMouth + diffEndMouth + (12 - startMouth - 1) + endMouth + (diffYear - 1) * 12
	let result = '';
	if (diffYear > 0) {
		result = diffYear + '岁';
		let month=Math.ceil(Math.ceil(diffMouth/12)-diffYear)
		if(month!=0) result=result+month+'个月'
	}
	else{
		result =Math.ceil(diffMouth) + '个月';
	}
	return result
	
}

/**
 * 返回指定日期加上指定天数 
 * @param date 传入的日期值
 * @param days 需要添加的天数
 * @returns 返回拼接后的时间字符串 例：1900-01-01 12:00:00
 */
export function addDaysToDate(date:Date, days:number) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days);
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0');
	const day = String(newDate.getDate()).padStart(2, '0');
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');
	const seconds = String(newDate.getSeconds()).padStart(2, '0');
 
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 返回指定日期加上指定周数 
 * @param date 传入的日期值
 * @param weeks 需要添加的周数
 * @returns 返回拼接后的时间字符串 例：1900-01-01
 */
export function addWeeksToDateReturnDate(date:Date, weeks:number) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + weeks*7);
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0');
	const day = String(newDate.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
/**
 * 返回指定日期加上指定周数 
 * @param date 传入的日期值
 * @param weeks 需要添加的周数
 * @returns 返回拼接后的时间字符串 例：1900-01-01 12:00:00
 */
export function addWeeksToDate(date:Date, weeks:number) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + weeks*7);
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0');
	const day = String(newDate.getDate()).padStart(2, '0');
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');
	const seconds = String(newDate.getSeconds()).padStart(2, '0');
 
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 返回指定日期加上指定月数 
 * @param date 传入的日期值
 * @param months 需要添加的月数
 * @returns 返回拼接后的时间字符串 例：1900-01-01 12:00:00
 */
export function addMonthsToDate(date:Date, months:number) {
	const newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + months);
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0');
	const day = String(newDate.getDate()).padStart(2, '0');
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');
	const seconds = String(newDate.getSeconds()).padStart(2, '0');
 
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 返回指定日期加上指定年数
 * @param date 传入的日期值
 * @param years 需要添加的年数
 * @returns 返回拼接后的时间字符串 例：1900-01-01 12:00:00
 */
export function addYearsToDate(date:Date, years:number) {
	const newDate = new Date(date);
	newDate.setFullYear(newDate.getFullYear() + years);
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0');
	const day = String(newDate.getDate()).padStart(2, '0');
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');
	const seconds = String(newDate.getSeconds()).padStart(2, '0');
 
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 返回指定日期之间的相隔天数
 * @param date1 小日期
 * @param date2 大日期
 * @returns 返回大日期减去小日期的天数
 */
export function calculateDaysBetweenDates(date1:Date, date2:Date) {
    // 去除时分秒，只保留日期部分
    const start = new Date(date1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date2);
    end.setHours(0, 0, 0, 0);

    // 计算两个日期的毫秒数差
    const diffInMilliseconds = end.getTime() - start.getTime();

    // 将毫秒数差转换为天数
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.max(1,Math.round(diffInDays));
}

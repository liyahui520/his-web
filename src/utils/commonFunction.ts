// 通用函数
import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';
import { formatDate } from '/@/utils/formatTime';
import { useI18n } from 'vue-i18n';
import Decimal from 'decimal.js';
import { EmptyArrayType } from '/@/types/global';

export default function () {
	const { t } = useI18n();
	const { toClipboard } = useClipboard();

	// 百分比格式化
	const percentFormat = (row: EmptyArrayType, column: number, cellValue: string) => {
		return cellValue ? `${cellValue}%` : '-';
	};

	//保留两位小数
	const twoFloorNum = (num: any) => {
		var num2 = parseFloat(num);
		if (isNaN(num2)) {
			return '0.00';
		}
		num2 = Math.floor(num * 100) / 100;
		var num2Ts = num2.toString();
		var decI = num2Ts.indexOf('.');
		if (decI < 0) {
			decI = num2Ts.length;
			num2Ts += '.';
		}
		while (num2Ts.length <= decI + 2) {
			num2Ts += '0';
		}
		return num2Ts;
	};
	// 列表日期时间格式化
	const dateFormatYMD = (row: EmptyArrayType, column: number, cellValue: string) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	};
	const dateEntityFormatYMD = (cellValue: string) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd');
	};

	// 列表日期时间格式化
	const dateFormatYMDHMS = (row: EmptyArrayType, column: number, cellValue: string) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
	};

	const dateEntityFormatYMDHMS = (cellValue: string) => {
		if (!cellValue) return '-';
		return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS');
	};
	// 列表日期时间格式化
	const dateFormatHMS = (row: EmptyArrayType, column: number, cellValue: string) => {
		if (!cellValue) return '-';
		let time = 0;
		if (typeof row === 'number') time = row;
		if (typeof cellValue === 'number') time = cellValue;
		return formatDate(new Date(time * 1000), 'HH:MM:SS');
	};
	// 小数格式化
	const scaleFormat = (value: string = '0', scale: number = 4) => {
		return Number.parseFloat(value).toFixed(scale);
	};
	// 小数格式化
	const scale2Format = (value: string = '0') => {
		return Number.parseFloat(value).toFixed(2);
	};
	// 千分符，默认保留两位小数
	const groupSeparator = (value: number, minimumFractionDigits: number = 2) => {
		return value.toLocaleString('en-US', {
			minimumFractionDigits: minimumFractionDigits,
			maximumFractionDigits: 2,
		});
	};
	// 点击复制文本
	const copyText = (text: string) => {
		return new Promise((resolve, reject) => {
			try {
				//复制
				toClipboard(text);
				//下面可以设置复制成功的提示框等操作
				ElMessage.success(t('message.layout.copyTextSuccess'));
				resolve(text);
			} catch (e) {
				//复制失败
				ElMessage.error(t('message.layout.copyTextError'));
				reject(e);
			}
		});
	};
	// 去掉Html标签(取前面5个字符)
	const removeHtmlSub = (value: string) => {
		var str = value.replace(/<[^>]+>/g, '');
		if (str.length > 50) return str.substring(0, 50) + '......';
		else return str;
	};
	// 去掉Html标签
	const removeHtml = (value: string) => {
		return value.replace(/<[^>]+>/g, '');
	};
	// 获取枚举描述
	const getEnumDesc = (key: any, lstEnum: any) => {
		return lstEnum.find((x: any) => x.value == key)?.describe;
	};
	//生成GUID
	const generateGUID = () => {
		var guid = '';
		for (var i = 1; i <= 32; i++) {
			var n = Math.floor(Math.random() * 16.0).toString(16);
			guid += n;
			if (i == 8 || i == 12 || i == 16 || i == 20) guid += '-';
		}
		return guid.toUpperCase();
	};
	/**
	 * 计算金额
	 * @param originalAmounts 要分配的数据集合
	 * @param originalTotal 原始总额
	 * @param newTotal 新总额
	 * @returns 平均分配后的值  保留两位小数 例如：[0.34,0.33,0.33]
	 */
	const adjustAmounts = (originalAmounts: any, originalTotal: number, newTotal: number) => {
		// 将每个金额按比例调整
		let adjustedAmounts = originalAmounts.map((amount) => new Decimal(amount).div(new Decimal(originalTotal)).mul(new Decimal(newTotal)));

		// 四舍五入到两位小数，并确保总和为新的总金额
		function adjustRounding(amounts, targetTotal) {
			let roundedAmounts = amounts.map((amount) => parseFloat(amount.toFixed(2, Decimal.ROUND_HALF_UP)));
			let roundingError = new Decimal(targetTotal).sub(new Decimal(roundedAmounts.reduce((a, b) => new Decimal(a).add(new Decimal(b)), 0))).toNumber();

			// 分配舍入误差
			for (let i = 0; i < roundedAmounts.length; i++) {
				if (roundingError === 0) break;

				if (roundingError > 0) {
					roundedAmounts[i] = new Decimal(roundedAmounts[i]).add(new Decimal(0.01)).toNumber();
					roundingError = new Decimal(roundingError).sub(new Decimal(0.01)).toNumber();
				} else if (roundingError < 0) {
					roundedAmounts[i] = new Decimal(roundedAmounts[i]).sub(new Decimal(0.01)).toNumber();
					roundingError = new Decimal(roundingError).add(new Decimal(0.01)).toNumber();
				}
			}

			return roundedAmounts;
		}

		return adjustRounding(adjustedAmounts, newTotal);
	};
	/**
	 * 处理等分  结果保留两位小数  例如 5/7 结果 ['0.71', '0.71', '0.71', '0.71', '0.72', '0.72', '0.72']
	 * @param amount 等分的值
	 * @param count 份数
	 */
	const equalDivision = (amount: number, count: number) => {
		let results = [] as any;
		let total = amount;
		let spendPrice = total / count;
		let value = Math.ceil(Math.round(spendPrice * 1000) / 10) / 100; // 向上取整到最接近的两位小数

		for (let i = 0; i < count; i++) {
			let residue = count - 1 - i;
			if (residue === 0) {
				results.push(total.toFixed(2)); // 直接使用剩余的总额，确保总和精确
				break;
			}
			let c = getNumber(total, residue, value);
			value = Math.min(value, c);
			results.push(value.toFixed(2));
			total -= value;
		}
		function getNumber(total: number, residue: number, value: number) {
			let residueValue = total - value;
			return Math.ceil(Math.round((residueValue / residue) * 1000) / 10) / 100; // 向上取整到最接近的两位小数
		}
		return results.sort((current: number, next: number) => current - next);
	};
	/**
	 * 获取数组当中的指定位置开始到指定位置结束的数组内容
	 * @param array 要处理的数组
	 * @param startIndex 开始位置
	 * @param length 结束位置
	 */
	const getSubArray = (array: any, startIndex: number, length: number) => {
		return array.slice(startIndex, startIndex + length);
	};

	return {
		percentFormat,
		dateFormatYMD,
		dateFormatYMDHMS,
		dateFormatHMS,
		scaleFormat,
		scale2Format,
		groupSeparator,
		copyText,
		removeHtmlSub,
		removeHtml,
		dateEntityFormatYMDHMS,
		dateEntityFormatYMD,
		twoFloorNum,
		getEnumDesc,
		generateGUID,
		adjustAmounts,
		equalDivision,
		getSubArray
	};
}

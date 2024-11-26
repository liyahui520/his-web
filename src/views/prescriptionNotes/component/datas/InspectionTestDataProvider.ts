import { hiprint } from 'vue-plugin-hiprint-signalr';
import logoImg from '/@/assets/logo.png';

export const InspectionTestDataProvider = function () {

	var addElementTypes = function (context: any) {
		// context.removePrintElementTypes('InspectionTestModule');
		// context.PrintElementTypeManager.registerType('myCustomFormatter', customerFormatter);
		// context.formatterModule.renderFormatter('myCustomFormatter', customerFormatter);
		context.addPrintElementTypes('InspectionTestModule',
			[
				new hiprint.PrintElementTypeGroup('【公共组件】', [
					{
						tid: 'aProviderModule.barcode',
						title: '条形码',
						data: '18020030720',
						type: 'text',
						options: {
							field: 'barCode',
							testData: 'ZUO18020030720',
							height: 32,
							fontSize: 12,
							lineHeight: 18,
							fontWeight: '700',
							textAlign: 'left',
							textContentVerticalAlign: 'middle',
							textType: 'barcode',
						},
					},
					{
						tid: 'aProviderModule.qrcode',
						title: '二维码',
						data: 'ZUO18020030720',
						type: 'text',
						options: {
							field: 'qrCode',
							testData: 'ZUO18020030720',
							height: 64,
							width: 64,
							fontSize: 12,
							lineHeight: 18,
							fontWeight: '700',
							textAlign: 'left',
							textContentVerticalAlign: 'middle',
							textType: 'qrcode',
						},
					},
					{
						tid: 'aProviderModule.table',
						title: '表格',
						type: 'table',
						options: {
							field: 'table',
							tableHeaderRepeat: 'first',
							tableFooterRepeat: 'last',
							fields: [
								{ text: '名称', field: 'NAME' },
								{ text: '数量', field: 'SL' },
								{ text: '规格', field: 'GG' },
								{ text: '条码', field: 'TM' },
								{ text: '单价', field: 'DJ' },
								{ text: '金额', field: 'JE' },
							],
						},
						editable: true,
						columnDisplayEditable: true, //列显示是否能编辑
						columnDisplayIndexEditable: true, //列顺序显示是否能编辑
						columnTitleEditable: true, //列标题是否能编辑
						columnResizable: true, //列宽是否能调整
						columnAlignEditable: true, //列对齐是否调整
						isEnableEditField: true, //编辑字段
						isEnableContextMenu: true, //开启右键菜单 默认true
						isEnableInsertRow: true, //插入行
						isEnableDeleteRow: true, //删除行
						isEnableInsertColumn: true, //插入列
						isEnableDeleteColumn: true, //删除列
						isEnableMergeCell: true, //合并单元格
						columns: [
							[
								{ title: '名称', align: 'center', field: 'NAME', width: 150 },
								{ title: '数量', align: 'center', field: 'SL', width: 80 },
								{ title: '规格', align: 'center', field: 'GG', width: 80, checked: false },
								{ title: '条码', align: 'center', field: 'TM', width: 100, checked: false },
								{ title: '单价', align: 'center', field: 'DJ', width: 100 },
								{ title: '金额', align: 'center', field: 'JE', width: 100, checked: false },
							],
						],
						// footerFormatter: function (options: unknown, rows: unknown, data: any, currentPageGridRowsData: unknown) {
						//   if (data && data['totalCap']) {
						//     return `<td style="padding:0 10px" colspan="100">${'应收金额大写: ' + data['totalCap']}</td>`
						//   }
						//   return '<td style="padding:0 10px" colspan="100">应收金额大写: </td>'
						// },
					},
					{
						tid: 'aProviderModule.customText',
						title: '文本',
						customText: '自定义文本',
						custom: true,
						type: 'text',
						options: {
							width: 200,
							testData: '长文本分页/不分页测试',
						},
					},
					{
						tid: 'aProviderModule.longText',
						title: '长文本',
						type: 'longText',
						options: {
							field: 'test.longText',
							width: 200,
							testData: '长文本分页/不分页测试',
						},
					},
					{ tid: 'aProviderModule.logo', title: 'Logo', data: logoImg, type: 'image', options: { field: 'imageUrl' } },
					{ tid: 'aProviderModule.hline', title: '横线', type: 'hline' },
					{ tid: 'aProviderModule.vline', title: '竖线', type: 'vline' },
					{ tid: 'aProviderModule.rect', title: '矩形', type: 'rect' },
					{ tid: 'aProviderModule.oval', title: '椭圆', type: 'oval' },
				]),
				new hiprint.PrintElementTypeGroup('【医院信息】', [
					{
						tid: 'InspectionTestDataProvider.verticalbar',
						title: '单据表头',
						data: '检验报告单',
						type: 'text',
						options: {
							field: 'title',
							testData: '检验报告单',
							height: 17,
							fontSize: 12,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'center',
							hideTitle: true,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.orderNo',
						title: '单据号',
						data: 'R00000001',
						type: 'text',
						options: {
							field: 'orderNo',
							testData: 'R00000001',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.date',
						title: '检查日期',
						data: '2023-07-20',
						type: 'text',
						options: {
							field: 'createTime',
							testData: '2023-07-20',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.orgAddress',
						title: '医院地址',
						data: '上海市嘉定区',
						type: 'text',
						options: {
							field: 'orgAddress',
							testData: '上海市嘉定区',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.platform',
						title: '医院名称',
						data: '测试医院',
						type: 'text',
						options: {
							field: 'orgName',
							testData: '测试医院',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{ tid: 'aProviderModule.orgImg', title: 'Logo', data: logoImg, type: 'image', options: { field: 'orgImg' } },
					{
						tid: 'InspectionTestDataProvider.doctorName',
						title: '检验医生',
						data: '李医生',
						type: 'text',
						options: {
							field: 'doctorName',
							testData: '李医生',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.doctorPhone',
						title: '医生电话',
						data: '17777777777',
						type: 'text',
						options: {
							field: 'doctorPhone',
							testData: '17777777777',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.orgPhone',
						title: '医院电话',
						data: '021-25639281',
						type: 'text',
						options: {
							field: 'orgPhone',
							testData: '021-25639281',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					}
				]),
				new hiprint.PrintElementTypeGroup('【用户/宠物】', [

					{
						tid: 'InspectionTestDataProvider.customerName',
						title: '宠主姓名',
						data: '张三',
						type: 'text',
						options: {
							field: 'customerName',
							testData: '张三',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.cellPhone',
						title: '宠主电话',
						data: '18888888888',
						type: 'text',
						options: {
							field: 'cellPhone',
							testData: '18888888888',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.sex',
						title: '宠主性别',
						data: '男',
						type: 'text',
						options: {
							field: 'sex',
							testData: '男',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petName',
						title: '宠物名称',
						data: '木子',
						type: 'text',
						options: {
							field: 'petName',
							testData: '木子',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petOrder',
						title: '病历号',
						data: 'B00000001',
						type: 'text',
						options: {
							field: 'petOrder',
							testData: 'B00000001',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petZL',
						title: '宠物种类',
						data: '猫',
						type: 'text',
						options: {
							field: 'petZL',
							testData: '猫',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petPZ',
						title: '宠物种类',
						data: '短尾猫',
						type: 'text',
						options: {
							field: 'petPZ',
							testData: '短尾猫',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},

					{
						tid: 'InspectionTestDataProvider.petSex',
						title: '宠物性别',
						data: '雌',
						type: 'text',
						options: {
							field: 'petSex',
							testData: '雌',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petAge',
						title: '宠物年龄',
						data: '1年10月',
						type: 'text',
						options: {
							field: 'petAge',
							testData: '1年10月',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petWeight',
						title: '宠物体重',
						data: '2.6Kg',
						type: 'text',
						options: {
							field: 'petWeight',
							testData: '2.6Kg',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},
					{
						tid: 'InspectionTestDataProvider.petColor',
						title: '宠物颜色',
						data: '红色',
						type: 'text',
						options: {
							field: 'petColor',
							testData: '红色',
							height: 16,
							fontSize: 9,
							fontFamily: 'Microsoft YaHei',
							fontWeight: '500',
							textAlign: 'left',
							hideTitle: false,
							textContentVerticalAlign: 'middle',
						},
					},

				]),
				new hiprint.PrintElementTypeGroup('【表格】', [
					{
						tid: 'InspectionTestDataProvider.result',
						title: '化验结果',
						type: 'table',
						fontSize: 9,
						fontFamily: 'Microsoft YaHei',
						fontWeight: '500',
						options: {
							field: 'testItems',
							fields: [
								{ text: '项目名称', field: 'name' },
								{ text: '单位', field: 'unitName' },
								{ text: '检测结果', field: 'resultValue' },
								{ text: '参考范围', field: 'singPrice' },
							],
						},
						editable: true,
						columnDisplayEditable: true, //列显示是否能编辑
						columnDisplayIndexEditable: true, //列顺序显示是否能编辑
						columnTitleEditable: true, //列标题是否能编辑
						columnResizable: true, //列宽是否能调整
						columnAlignEditable: true, //列对齐是否调整
						border: "noBorder",
						tableHeaderBorder: "noBorder",
						tableHeaderCellBorder: "noBorder",
						tableHeaderBackground: "#b3c2f2",
						tableHeaderFontWeight: "500",
						tableBodyRowBorder: "noBorder",
						tableBodyCellBorder: "noBorder",
						columns: [
							[
								{ title: '项目名称', align: 'left', field: 'name' },
								{ title: '单位', align: 'left', field: 'unit' },
								{ title: '检测结果', align: 'left', field: 'resultValue' },
								{
									title: '参考范围', align: 'left', field: 'singPrice',
									formatter: function (value, row, index, options) {
										var resultHtml = '<div ><div style="height:20px;border: solid 1px #ccc;display: flex;flex-wrap: wrap;position: relative;box-sizing: border-box;"><div style="max-width: 33.33%;flex: 0 0 33.33%;">';
										if (row.resultValue < row.minValue) {
											var shiftingProportion = (row.minValue - row.resultValue) / (row.maxValue - row.minValue);
											var result = shiftingProportion > 1 ? 0 : (1 - shiftingProportion) >= 0.95 ? 95 : (1 - shiftingProportion) * 100;
											resultHtml = resultHtml + '<div style="width: 10%;background-color: #909399;height: 100%;margin-left: ' + result + '%;" ></div>';
										}
										resultHtml = resultHtml + '</div><div style="max-width: 33.33%;flex: 0 0 33.33%;border-left: solid 2px #ccc;border-right: solid 2px #ccc;" >';
										if (row.resultValue >= row.minValue && row.resultValue <= row.maxValue) {
											var shiftingProportion = row.resultValue / (row.maxValue - row.minValue) * 100
											resultHtml = resultHtml + '<div style="width: 10%;background-color: #67C23A;height: 100%;margin-left: ' + shiftingProportion + '%;" ></div>';
										}
										resultHtml = resultHtml + '</div><div style="max-width: 33.33%;flex: 0 0 33.33%;">';
										if (row.resultValue > row.maxValue) {
											const shiftingProportion = (row.resultValue - row.maxValue) / (row.maxValue - row.minValue);
											var result = shiftingProportion > 1 ? 95 : shiftingProportion * 100;
											resultHtml = resultHtml + '<div style="width: 10%;background-color: #F56C6C;height: 100%;margin-left: ' + result + '%;" >';
										}
										resultHtml = resultHtml + '</div></div></div></div>';
										return resultHtml;
									}
								}
							],
						],
						// footerFormatter: function (options: unknown, rows: unknown, data: any, currentPageGridRowsData: unknown) {
						// 	if (data && data['singPrice']) {
						// 		return `<td style="padding:0 10px" colspan="100">${'应收金额大写: ' + data['singPrice']}</td>`
						// 	}
						// 	return '<td style="padding:0 10px" colspan="100">应收金额大写: </td>'
						// },
					},
				]),
				new hiprint.PrintElementTypeGroup('【其他】', [
					{
						tid: 'InspectionTestDataProvider.remark',
						title: '项目描述',
						type: 'table',
						fontSize: 9,
						fontFamily: 'Microsoft YaHei',
						fontWeight: '500',
						options: {
							field: 'InspectionTestDataProviderRemark',
							fields: [
								{ text: '项目名称', field: 'name' },
								{ text: '临床意义', field: 'remark' },
							],
						},
						editable: true,
						columnDisplayEditable: true, //列显示是否能编辑
						columnDisplayIndexEditable: true, //列顺序显示是否能编辑
						columnTitleEditable: true, //列标题是否能编辑
						columnResizable: true, //列宽是否能调整
						columnAlignEditable: true, //列对齐是否调整
						tableBorder: "noBorder",
						tableHeaderBorder: "noBorder",
						tableHeaderCellBorder: "noBorder",
						tableHeaderBackground: "#b3c2f2",
						tableHeaderFontWeight: "500",
						tableBodyRowBorder: "noBorder",
						tableBodyCellBorder: "noBorder",
						columns: [
							[
								{ title: '项目名称', align: 'left', field: 'name' },
								{ title: '临床意义', align: 'left', field: 'remark' },
							],
						],
						// footerFormatter: function (options: unknown, rows: unknown, data: any, currentPageGridRowsData: unknown) {
						//   if (data && data['totalCap']) {
						//     return `<td style="padding:0 10px" colspan="100">${'应收金额大写: ' + data['totalCap']}</td>`
						//   }
						//   return '<td style="padding:0 10px" colspan="100">应收金额大写: </td>'
						// },
					},
				]),
			]);
	};
	return {
		addElementTypes: addElementTypes,
	};
}

export default 
	{
		name: '检验报告设计',
		value: 'InspectionTestModule',
		type: 4,
		f: InspectionTestDataProvider(),
        paperType:'A4'
	}

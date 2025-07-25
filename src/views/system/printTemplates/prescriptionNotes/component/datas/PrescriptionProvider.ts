
import { hiprint } from 'vue-plugin-hiprint-signalr';

//处方签
export const PrescriptionProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('PrescriptionProviderModule');
		context.addPrintElementTypes('PrescriptionProviderModule', [
			new hiprint.PrintElementTypeGroup('【基础数据】', [
				{ tid: 'PrescriptionProvider.hline', title: '横线', type: 'hline' },
				{ tid: 'PrescriptionProvider.vline', title: '竖线', type: 'vline' },
				{ tid: 'PrescriptionProvider.rect', title: '矩形', type: 'rect' },
				{
					tid: 'PrescriptionProvider.customText',
					title: '文本',
					customText: '自定义文本',
					custom: true,
					type: 'text',
					options: {
						width: 200,
						fontFamily: "Microsoft YaHei",
						testData: '长文本分页/不分页测试',
					},
				},
				{
					tid: 'PrescriptionProvider.printTime',
					title: '打印时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'printTime',
						testData: '2000-01-01',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.createTime',
					title: '开具日期',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'createTime',
						testData: '2000-01-01',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.createOrgName',
					title: '医院名称',
					data: '测试医院',
					type: 'text',
					hideTitle: true,
					options: {
						field: 'createOrgName',
						testData: '测试医院处方笺',
						height: 25,
						fontSize: 18,
						width: "350",
						fontWeight: '400',
						textAlign: 'center',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.customerName',
					title: '动物主人/饲养单位',
					data: '卡尔',
					type: 'text',
					options: {
						field: 'customerName',
						testData: '卡尔',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.cellPhone',
					title: '手机号码',
					data: '166XXXXXXXX',
					type: 'text',
					options: {
						field: 'cellPhone',
						testData: '166XXXXXXXX',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.cardNumber',
					title: '用户编号',
					data: 'C20200101001',
					type: 'text',
					options: {
						field: 'cardNumber',
						testData: 'C20200101001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petName',
					title: '动物名称',
					data: '黑犬',
					type: 'text',
					options: {
						field: 'petName',
						testData: '黑犬',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petGenderText',
					title: '动物性别',
					data: '公',
					type: 'text',
					options: {
						field: 'petGenderText',
						testData: '公',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.serialNumber',
					title: '病例号',
					data: 'A20200101001',
					type: 'text',
					options: {
						field: 'serialNumber',
						testData: 'A20200101001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petWeight',
					title: '体重',
					data: '2.3',
					type: 'text',
					options: {
						field: 'petWeight',
						testData: '2.3',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petAge',
					title: '年（日）龄',
					data: '2年3个月',
					type: 'text',
					options: {
						field: 'petAge',
						testData: '2年3个月',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petKindText',
					title: '动物种类',
					data: '犬',
					type: 'text',
					options: {
						field: 'petKindText',
						testData: '犬',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petVarietieText',
					title: '动物品种',
					data: '柯基',
					type: 'text',
					options: {
						field: 'petVarietieText',
						testData: '柯基',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petIdentityNumber',
					title: '犬证号码',
					data: 'P20200101001',
					type: 'text',
					options: {
						field: 'petIdentityNumber',
						testData: 'P20200101001',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.petColorText',
					title: '动物毛色',
					data: '黑色',
					type: 'text',
					options: {
						field: 'petColorText',
						testData: '黑色',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.diagnose',
					title: '诊断',
					data: '柯基',
					type: 'text',
					options: {
						field: 'diagnose',
						testData: '柯基',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.totalAmount',
					title: '总金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'totalAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.discountAmount',
					title: '折扣金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'discountAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.downIntegerAmount',
					title: '抹零金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'downIntegerAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.actlyAmount',
					title: '实付金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'actlyAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.payTime',
					title: '付款时间',
					data: '2000-01-02 09:00:00',
					type: 'text',
					options: {
						field: 'payTime',
						testData: '2000-01-02 09:00:00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.doctorIdNumber',
					title: '兽医证号',
					data: 'A12345678901',
					type: 'text',
					options: {
						field: 'doctorIdNumber',
						testData: 'A12345678901',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.doctorName',
					title: '执业兽医师',
					data: '楚云飞',
					type: 'text',
					options: {
						field: 'doctorName',
						testData: '楚云飞',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'PrescriptionProvider.doctorName',
					title: '发药人',
					data: '楚云飞',
					type: 'text',
					options: {
						field: 'doctorName',
						testData: '楚云飞',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: "Microsoft YaHei",
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【明细】', [
				{
					tid: 'PrescriptionProvider.table',
					title: '明细数据',
					type: 'table',
					options: {
						field: 'billDetails',
						fields: [
							{ text: '分组', field: 'orderName' },
							{ text: '兽药名称', field: 'productName' },
							{ text: '单位', field: 'unitName' },
							{ text: '规格', field: 'specific' },
							{ text: '用量', field: 'useDose' },
							{ text: '用法', field: 'useMethods' },
							{ text: '天数', field: 'dayNum' },
							{ text: '单价', field: 'salePrice' },
							{ text: '数量', field: 'count' },
							{ text: '总金额', field: 'totalPrice' },
							// { text: '实付金额', field: 'actualPrice' },
							// { text: '备注', field: 'remark' },
						],
						tableBorder: "noBorder",
						tableHeaderBorder: "noBorder",
						tableHeaderCellBorder: "noBorder",
						tableHeaderBackground: "#ffffff",
						tableHeaderFontSize: 9,
						tableBodyRowBorder: "noBorder",
						tableBodyCellBorder: "noBorder",
						tableFooterBorder: "noBorder",
						tableFooterCellBorder: "noBorder",
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					columns: [
						[
							{ title: '分组', align: 'left', field: 'orderName', width: 100 },
							{ title: '兽药名称', align: 'left', field: 'productName', width: 180 },
							{ title: '单位', align: 'left', field: 'unitName', width: 100 },
							{ title: '规格', align: 'left', field: 'specific', width: 100 },
							{ title: '用量', align: 'left', field: 'useDose', width: 60 },
							{ title: '用法', align: 'left', field: 'useMethods', width: 60 },
							{ title: '天数', align: 'left', field: 'dayNum', width: 60 },
							{ title: '单价', align: 'left', field: 'salePrice', width: 80 },
							{ title: '数量', align: 'left', field: 'count', width: 60 },
							{ title: '总金额', align: 'left', field: 'totalPrice', width: 80 },
							{ title: '实付金额', align: 'left', field: 'actualPrice', width: 80 },
							{ title: '备注', align: 'left', field: 'remark', width: 100 },
						],
					],
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
}
export default {
    name: '处方签设计',
    value: 'PrescriptionProviderModule',
    type: 5,
    f: PrescriptionProvider(), 
	paperType:'A5'
}
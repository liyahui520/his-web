/* eslint-disable */
import { hiprint } from 'vue-plugin-hiprint-signalr';
import logoImg from '/@/assets/logo.png';

export const extendCss =
	'<style>.products{display:flex;flex-wrap:wrap;position:relative;box-sizing:border-box;border:0 solid #c8c9cc;padding:5pt;margin-bottom:5pt}.products .mg-row{display:flex;margin-bottom:5pt}.col-25{max-width:25%;flex:0 0 25%}.col-33{max-width:33.3333333333%;flex:0 0 33.3333333333%}.col-50{max-width:50%;flex:0 0 50%}.col-75{max-width:75%;flex:0 0 75%}.col-100{width:100%;flex:0 0 100%}.custom-table{width:100%} .left{text-align:left} .right{text-align:right} .center{text-align:center} .custom-th, .custom-tr{display:block;font-size:0} .custom-th div:last-child, .custom-tr div:last-child{border-right:0 solid #000} .custom-th div, .custom-tr div{font-size:10pt;display:inline-block;padding:2pt 0;border-left:0 solid #000;border-bottom:0 solid #000;vertical-align:top} .custom-th div span, .custom-tr div span{margin:0 5pt} .custom-th div{border-top:0 solid #000;padding:5px 5px 5px 0;font-weight:500} .w-9{width:9%} .w-10{width:10%} .w-15{width:15%} .w-20{width:20%} .w-25{width:25%} .w-30{width:30%} .w-40{width:40%}</style>';
// 自定义设计元素1
export const aProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('aProviderModule');
		context.addPrintElementTypes('aProviderModule', [
			new hiprint.PrintElementTypeGroup('【公共组件】', [
				{
					tid: 'aProviderModule.barcode',
					title: '条形码',
					data: '18012345678',
					type: 'text',
					options: {
						field: 'barCode',
						testData: 'Z18012345678',
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
					data: 'Z18012345678',
					type: 'text',
					options: {
						field: 'qrCode',
						testData: 'Z18012345678',
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
						testData:
							'<img data-v-d7d37748="" src="https://oldwarmpicture.oss-cn-qingdao.aliyuncs.com/HMSFiles/7990/CEMRecordImg/712793012/store_adb4330f2d02841982fee7577ae26741202407230207303673.jpg?1723015527487" alt="" class="record-img"><img data-v-d7d37748="" src="https://oldwarmpicture.oss-cn-qingdao.aliyuncs.com/HMSFiles/7990/CEMRecordImg/712793012/store_9f41e7484c4e624600c3dffd3fdf0b9b202407131906432383.jpg" alt="" class="record-img">' +
							'<p style="text-indent: 32.15pt; text-align: center; line-height: 2.5;"><strong>{&lt;所属机构&gt;}和解协议</strong></p><p style="text-indent: 24.1pt; text-align: center; line-height: 2.5;"><strong> </strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>甲方：</strong><span style="color: black; font-family: 宋体;">【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 】 &nbsp; &nbsp;</span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>身份证号：</strong><span style="color: black; font-family: 宋体;">【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>住址：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong> </strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>乙方：</strong><span style="color: black; font-family: 宋体;">【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】（以下简称</span><span style="color: black;">“</span><span style="color: black; font-family: 宋体;">本院</span><span style="color: black;">”</span><span style="color: black; font-family: 宋体;">） </span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>地址：【 &nbsp; &nbsp;】</strong></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>鉴于：</strong></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">【 &nbsp; 】年【 &nbsp;】月【 &nbsp; 】日，甲方携带其宠物【 &nbsp; &nbsp; &nbsp; 】（以下称</span><strong>“甲方宠物”</strong><span style="color: black; font-family: 宋体;">）到乙方经营场所进行治疗,因甲方宠物在后续治疗过程中未达预期效果，甲乙双方在自愿、诚信和互谅互让的基础上，经友好协商达成如下和解协议：</span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong> </strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>一、</strong><span style="color: black; font-family: 宋体;">乙方在本协议签署后的【 &nbsp; 】个工作日内一次性向甲方支付人民币【 &nbsp; &nbsp; &nbsp;】元（以下简称</span><strong>“协议款项”</strong><span style="color: black; font-family: 宋体;">）；甲方收到该笔款项当日应为乙方出具正式收据，并归还乙方已开具的所有收费票据、病历、检验报告以及照片、录音、录像等音视频资料。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">二、双方确认，上述协议款项已涵盖全部赔偿及补偿费用；甲方确认在收到协议款项后，甲乙双方除本协议约定的其他各项权利义务外，均不存在任何形式的纠纷，双方均不再向对方主张其他任何权利，承担任何义务。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">三、除本协议另有规定外，自本协议签署之日起，一方即不可撤销地向另一方放弃了就本协议所涉事宜而采取任何法律救济措施的权利，包括但不限于提起医疗事故鉴定、诉讼、仲裁、申请调解、要求赔礼道歉、赔偿物质或精神损失等。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">四、甲方在收到协议款项后，不得就本协议所涉事宜向媒体、广播、网站、兽医主管部门、工商等任何相关机构进行传播或投诉，甲方同意尽全力配合乙方消除此事产生的相关负面影响（如有）。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">五、双方应严格履行保密义务，对于所有与本协议所涉事项相关的部分或全部信息（乙方品牌相关的资料和信息），双方均应作为秘密信息对待。除非经另一方事先书面许可，或因政府部门及法律法规的强制性要求而披露，双方均应当保守该秘密信息，并不得将该秘密信息以任何方式泄露予第三方。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">六、甲方在收取全部协议款项后，若出现以下行为的，应向乙方全额返还协议款项，若给乙方造成损失的，甲方还应予以赔偿：</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（1）通过任何媒体及/或渠道曲解、丑化本协议所涉事宜，给乙方品牌造成负面影响的；</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（2）违反本协议项下保密义务；</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（3）继续向乙方提出索赔、主张或通过任何形式追究乙方责任的；</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（4）存在其他任何影响乙方工作场所正常经营秩序的行为。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">七、如因履行本协议产生纠纷的，首先双方应协商解决，协商不成，任何一方均可向乙方所在地有管辖权的人民法院起诉。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">八、双方已完全知悉以上内容，本协议自甲方签字、乙方盖章之日起生效。本协议壹式贰份，双方各执壹份，具有同等法律效力。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">甲方指定收款账户：</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">开户名：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">开户行：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">银行账号：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 】</span></p><p style="text-indent: 24pt; text-align: center; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（以下无正文）</span></p><p style="text-indent: 24pt; text-align: center; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24pt; text-align: center; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24.1pt; text-align: left; line-height: 2.5;"><strong>甲方</strong><span style="color: black; font-family: 宋体;"><strong>（签字按手印）： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 乙方（盖章）：</strong></span></p><p style="text-indent: 24pt; text-align: left; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">签订日期： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;签订日期：</span></p><p style="line-height: 2.5;"> </p><p style="line-height: 2.5;"> </p><p style="line-height: 2.5;"> </p><p style="line-height: 2.5;"> </p>' +
							'\n<style>' +
							'table {\n' +
							'    border: none;\n' +
							'    border-collapse: collapse;\n' +
							'  }\n' +
							'  table td,\n' +
							'  table th{\n' +
							'    border: 1px solid #ccc;\n' +
							'    padding: 3px 5px;\n' +
							'    min-width: 50px;\n' +
							'    height: 20px;\n' +
							'  }\n' +
							'  table th {\n' +
							'    border-right: 1px solid #ccc;\n' +
							'    border-bottom: 2px solid #ccc;\n' +
							'    text-align: center;\n' +
							'    background-color: #f1f1f1;\n' +
							'  }\n' +
							'  blockquote{\n' +
							'    display: block;\n' +
							'    border-left: 8px solid #d0e5f2;\n' +
							'    padding: 5px 10px;\n' +
							'    margin: 10px 0;\n' +
							'    line-height: 1.4;\n' +
							'    font-size: 100%;\n' +
							'    background-color: #f1f1f1;\n' +
							'  }\n' +
							'  code{\n' +
							'    display: inline-block;\n' +
							'    *display: inline;\n' +
							'    *zoom: 1;\n' +
							'    background-color: #f1f1f1;\n' +
							'    border-radius: 3px;\n' +
							'    padding: 3px 5px;\n' +
							'    margin: 0 3px;\n' +
							'  }\n' +
							'  pre code {\n' +
							'    display: block;\n' +
							'  }\n' +
							'  ul, ol{\n' +
							'    margin: 10px 0 10px 20px;\n' +
							'  }\n' +
							'  pre {\n' +
							'    border: 1px solid #ccc;\n' +
							'    background-color: #f8f8f8;\n' +
							'    padding: 10px;\n' +
							'    margin: 5px 0px;\n' +
							'    font-size: 0.8em;\n' +
							'    border-radius: 3px;\n' +
							'  }\n' +
							'  .ql-editor ul li {\n' +
							'    list-style-type: disc;    // 解决序列li前面的.不展示问题\n' +
							'  }\n' +
							'  .ql-editor ol li {\n' +
							'    list-style-type: decimal;   // 解决序列li前面的数字不展示问题\n' +
							'  }' +
							'</style>',
					},
				},
				{ tid: 'aProviderModule.logo', title: 'Logo', data: logoImg, type: 'image', options: { field: 'imageUrl' } },
				{ tid: 'aProviderModule.hline', title: '横线', type: 'hline' },
				{ tid: 'aProviderModule.vline', title: '竖线', type: 'vline' },
				{ tid: 'aProviderModule.rect', title: '矩形', type: 'rect' },
				{ tid: 'aProviderModule.oval', title: '椭圆', type: 'oval' },
				{
					tid: 'aProviderModule.html',
					title: 'html',
					type: 'html',
					options: {
						field: 'test.content',
						width: 400,
						content:
							'<p style="text-indent: 32.15pt; text-align: center; line-height: 2.5;"><strong>{&lt;所属机构&gt;}和解协议</strong></p><p style="text-indent: 24.1pt; text-align: center; line-height: 2.5;"><strong> </strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>甲方：</strong><span style="color: black; font-family: 宋体;">【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 】 &nbsp; &nbsp;</span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>身份证号：</strong><span style="color: black; font-family: 宋体;">【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>住址：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong> </strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>乙方：</strong><span style="color: black; font-family: 宋体;">【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】（以下简称</span><span style="color: black;">“</span><span style="color: black; font-family: 宋体;">本院</span><span style="color: black;">”</span><span style="color: black; font-family: 宋体;">） </span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>地址：【 &nbsp; &nbsp;】</strong></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>鉴于：</strong></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">【 &nbsp; 】年【 &nbsp;】月【 &nbsp; 】日，甲方携带其宠物【 &nbsp; &nbsp; &nbsp; 】（以下称</span><strong>“甲方宠物”</strong><span style="color: black; font-family: 宋体;">）到乙方经营场所进行治疗,因甲方宠物在后续治疗过程中未达预期效果，甲乙双方在自愿、诚信和互谅互让的基础上，经友好协商达成如下和解协议：</span></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong> </strong></p><p style="text-indent: 24.1pt; line-height: 2.5;"><strong>一、</strong><span style="color: black; font-family: 宋体;">乙方在本协议签署后的【 &nbsp; 】个工作日内一次性向甲方支付人民币【 &nbsp; &nbsp; &nbsp;】元（以下简称</span><strong>“协议款项”</strong><span style="color: black; font-family: 宋体;">）；甲方收到该笔款项当日应为乙方出具正式收据，并归还乙方已开具的所有收费票据、病历、检验报告以及照片、录音、录像等音视频资料。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">二、双方确认，上述协议款项已涵盖全部赔偿及补偿费用；甲方确认在收到协议款项后，甲乙双方除本协议约定的其他各项权利义务外，均不存在任何形式的纠纷，双方均不再向对方主张其他任何权利，承担任何义务。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">三、除本协议另有规定外，自本协议签署之日起，一方即不可撤销地向另一方放弃了就本协议所涉事宜而采取任何法律救济措施的权利，包括但不限于提起医疗事故鉴定、诉讼、仲裁、申请调解、要求赔礼道歉、赔偿物质或精神损失等。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">四、甲方在收到协议款项后，不得就本协议所涉事宜向媒体、广播、网站、兽医主管部门、工商等任何相关机构进行传播或投诉，甲方同意尽全力配合乙方消除此事产生的相关负面影响（如有）。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">五、双方应严格履行保密义务，对于所有与本协议所涉事项相关的部分或全部信息（乙方品牌相关的资料和信息），双方均应作为秘密信息对待。除非经另一方事先书面许可，或因政府部门及法律法规的强制性要求而披露，双方均应当保守该秘密信息，并不得将该秘密信息以任何方式泄露予第三方。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">六、甲方在收取全部协议款项后，若出现以下行为的，应向乙方全额返还协议款项，若给乙方造成损失的，甲方还应予以赔偿：</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（1）通过任何媒体及/或渠道曲解、丑化本协议所涉事宜，给乙方品牌造成负面影响的；</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（2）违反本协议项下保密义务；</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（3）继续向乙方提出索赔、主张或通过任何形式追究乙方责任的；</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（4）存在其他任何影响乙方工作场所正常经营秩序的行为。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">七、如因履行本协议产生纠纷的，首先双方应协商解决，协商不成，任何一方均可向乙方所在地有管辖权的人民法院起诉。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">八、双方已完全知悉以上内容，本协议自甲方签字、乙方盖章之日起生效。本协议壹式贰份，双方各执壹份，具有同等法律效力。</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">甲方指定收款账户：</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">开户名：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">开户行：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;】</span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">银行账号：【 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 】</span></p><p style="text-indent: 24pt; text-align: center; line-height: 2.5;"><span style="color: black; font-family: 宋体;">（以下无正文）</span></p><p style="text-indent: 24pt; text-align: center; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24pt; text-align: center; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24.1pt; text-align: left; line-height: 2.5;"><strong>甲方</strong><span style="color: black; font-family: 宋体;"><strong>（签字按手印）： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 乙方（盖章）：</strong></span></p><p style="text-indent: 24pt; text-align: left; line-height: 2.5;"><span style="color: black;"> </span></p><p style="text-indent: 24pt; line-height: 2.5;"><span style="color: black; font-family: 宋体;">签订日期： &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;签订日期：</span></p><p style="line-height: 2.5;"> </p><p style="line-height: 2.5;"> </p><p style="line-height: 2.5;"> </p><p style="line-height: 2.5;"> </p>' +
							'\n<style>' +
							'table {\n' +
							'    border: none;\n' +
							'    border-collapse: collapse;\n' +
							'  }\n' +
							'  table td,\n' +
							'  table th{\n' +
							'    border: 1px solid #ccc;\n' +
							'    padding: 3px 5px;\n' +
							'    min-width: 50px;\n' +
							'    height: 20px;\n' +
							'  }\n' +
							'  table th {\n' +
							'    border-right: 1px solid #ccc;\n' +
							'    border-bottom: 2px solid #ccc;\n' +
							'    text-align: center;\n' +
							'    background-color: #f1f1f1;\n' +
							'  }\n' +
							'  blockquote{\n' +
							'    display: block;\n' +
							'    border-left: 8px solid #d0e5f2;\n' +
							'    padding: 5px 10px;\n' +
							'    margin: 10px 0;\n' +
							'    line-height: 1.4;\n' +
							'    font-size: 100%;\n' +
							'    background-color: #f1f1f1;\n' +
							'  }\n' +
							'  code{\n' +
							'    display: inline-block;\n' +
							'    *display: inline;\n' +
							'    *zoom: 1;\n' +
							'    background-color: #f1f1f1;\n' +
							'    border-radius: 3px;\n' +
							'    padding: 3px 5px;\n' +
							'    margin: 0 3px;\n' +
							'  }\n' +
							'  pre code {\n' +
							'    display: block;\n' +
							'  }\n' +
							'  ul, ol{\n' +
							'    margin: 10px 0 10px 20px;\n' +
							'  }\n' +
							'  pre {\n' +
							'    border: 1px solid #ccc;\n' +
							'    background-color: #f8f8f8;\n' +
							'    padding: 10px;\n' +
							'    margin: 5px 0px;\n' +
							'    font-size: 0.8em;\n' +
							'    border-radius: 3px;\n' +
							'  }\n' +
							'  .ql-editor ul li {\n' +
							'    list-style-type: disc;    // 解决序列li前面的.不展示问题\n' +
							'  }\n' +
							'  .ql-editor ol li {\n' +
							'    list-style-type: decimal;   // 解决序列li前面的数字不展示问题\n' +
							'  }' +
							'</style>',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【视图字段】', [
				{
					tid: 'aProviderModule.creater',
					title: '制表人',
					data: 'Admin.NET',
					type: 'text',
					options: {
						field: 'creater',
						testData: 'Admin.NET',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'aProviderModule.printDate',
					title: '打印时间',
					data: '2023-07-20 09:00',
					type: 'text',
					options: {
						field: 'printDate',
						testData: '2023-07-20 09:00',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'aProviderModule.signer',
					title: '库管签字',
					data: 'Admin.NET',
					type: 'text',
					options: {
						field: 'signer',
						testData: 'Admin.NET',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'aProviderModule.director',
					title: '经理签字',
					data: 'Admin.NET',
					type: 'text',
					options: {
						field: 'director',
						testData: 'Admin.NET',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};

// 自定义设计元素2
export const bProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('bProviderModule');
		context.addPrintElementTypes('bProviderModule', [
			new hiprint.PrintElementTypeGroup('【常规】', [
				{
					tid: 'bProviderModule.header',
					title: '单据表头',
					data: '单据表头',
					type: 'text',
					options: {
						testData: '单据表头',
						height: 17,
						fontSize: 16.5,
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
					},
				},
				{
					tid: 'bProviderModule.type',
					title: '单据类型',
					data: '单据类型',
					type: 'text',
					options: {
						testData: '单据类型',
						height: 16,
						fontSize: 15,
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
					},
				},
				{
					tid: 'bProviderModule.order',
					title: '订单编号',
					data: 'Z18012345678',
					type: 'text',
					options: {
						field: 'orderId',
						testData: 'Z18012345678',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
						hideTitle: true,
					},
				},
				{
					tid: 'bProviderModule.date',
					title: '业务日期',
					data: '2023-07-20',
					type: 'text',
					options: {
						field: 'date',
						testData: '2023-07-20',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
						hideTitle: true,
					},
				},
				{
					tid: 'bProviderModule.barcode',
					title: '条形码',
					data: '18012345678',
					type: 'text',
					options: {
						testData: 'Z18012345678',
						height: 32,
						fontSize: 12,
						lineHeight: 18,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
						textType: 'barcode',
						hideTitle: true,
					},
				},
				{
					tid: 'bProviderModule.qrcode',
					title: '二维码',
					data: 'Z18012345678',
					type: 'text',
					options: {
						testData: 'Z18012345678',
						height: 64,
						width: 64,
						fontSize: 12,
						lineHeight: 18,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
						textType: 'qrcode',
						hideTitle: true,
					},
				},
				{
					tid: 'bProviderModule.platform',
					title: '平台名称',
					data: '平台名称',
					type: 'text',
					options: {
						testData: '平台名称',
						height: 17,
						fontSize: 16.5,
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
					},
				},
				{ tid: 'bProviderModule.image', title: 'Logo', data: logoImg, type: 'image' },
			]),
			new hiprint.PrintElementTypeGroup('【客户】', [
				{
					tid: 'bProviderModule.khname',
					title: '客户名称',
					data: '高级客户',
					type: 'text',
					options: {
						field: 'name',
						testData: '高级客户',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'bProviderModule.tel',
					title: '客户电话',
					data: '18012345678',
					type: 'text',
					options: {
						field: 'tel',
						testData: '18012345678',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【表格/其他】', [
				{
					tid: 'bProviderModule.table',
					title: '订单数据',
					type: 'table',
					options: {
						field: 'table',
						fields: [
							{ text: '名称', field: 'NAME' },
							{ text: '数量', field: 'SL' },
							{ text: '规格', field: 'GG' },
							{ text: '条码', field: 'TM' },
							{ text: '单价', field: 'DJ' },
							{ text: '金额', field: 'JE' },
							{ text: '备注', field: 'DETAIL' },
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
							{ title: '名称', align: 'center', field: 'NAME', width: 100 },
							{ title: '数量', align: 'center', field: 'SL', width: 100 },
							{ title: '条码', align: 'center', field: 'TM', width: 100 },
							{ title: '规格', align: 'center', field: 'GG', width: 100 },
							{ title: '单价', align: 'center', field: 'DJ', width: 100 },
							{ title: '金额', align: 'center', field: 'JE', width: 100 },
							{ title: '备注', align: 'center', field: 'DETAIL', width: 100 },
						],
					],
					// footerFormatter: function (options: unknown, rows: unknown, data: any, currentPageGridRowsData: unknown) {
					//   if (data && data['totalCap']) {
					//     return `<td style="padding:0 10px" colspan="100">${'应收金额大写: ' + data['totalCap']}</td>`
					//   }
					//   return '<td style="padding:0 10px" colspan="100">应收金额大写: </td>'
					// },
				},
				{ tid: 'bProviderModule.customText', title: '文本', customText: '自定义文本', custom: true, type: 'text' },
				{
					tid: 'bProviderModule.longText',
					title: '长文本',
					type: 'longText',
					options: {
						field: 'test.longText',
						width: 200,
						testData: '长文本分页/不分页测试',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【辅助】', [
				{
					tid: 'bProviderModule.hline',
					title: '横线',
					type: 'hline',
				},
				{
					tid: 'bProviderModule.vline',
					title: '竖线',
					type: 'vline',
				},
				{
					tid: 'bProviderModule.rect',
					title: '矩形',
					type: 'rect',
				},
				{
					tid: 'bProviderModule.oval',
					title: '椭圆',
					type: 'oval',
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};

//入库单设计
export const InStoreProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('InStoreProviderModule');
		context.addPrintElementTypes('InStoreProviderModule', [
			new hiprint.PrintElementTypeGroup('【常规】', [
				{
					tid: 'InStoreProvider.header',
					title: '单据表头',
					data: '单据表头',
					type: 'text',
					options: {
						field: 'title',
						testData: '入库单',
						height: 17,
						fontSize: 16.5,
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InStoreProvider.type',
					title: '单据类型',
					data: '采购入库',
					type: 'text',
					options: {
						field: 'typeName',
						testData: '采购入库',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InStoreProvider.order',
					title: '单号',
					data: 'ZUO18020030720',
					type: 'text',
					options: {
						field: 'orderNo',
						testData: 'R18020030720',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
						hideTitle: true,
					},
				},
				{
					tid: 'InStoreProvider.date',
					title: '业务日期',
					data: '2023-07-20',
					type: 'text',
					options: {
						field: 'createTime',
						testData: '2023-07-20',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						textContentVerticalAlign: 'middle',
						hideTitle: true,
					},
				},
				{
					tid: 'InStoreProvider.platform',
					title: '医院名称',
					data: '医院名称',
					type: 'text',
					options: {
						field: 'orgName',
						testData: '测试医院',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InStoreProvider.iExamineName',
					title: '审核人',
					data: '张三',
					type: 'text',
					options: {
						field: 'examineName',
						testData: '张三',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InStoreProvider.iAmount',
					title: '总金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'amount',
						testData: '0.00',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InStoreProvider.iinCount',
					title: '总量',
					data: '0',
					type: 'text',
					options: {
						field: 'inCount',
						testData: '0',
						height: 16,
						fontSize: 6.75,
						fontWeight: '700',
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【表格/其他】', [
				{
					tid: 'InStoreProvider.table',
					title: '明细数据',
					type: 'table',
					options: {
						field: 'inStorageDetails',
						fields: [
							{ text: '产品名称', field: 'productName' },
							{ text: '产品类型', field: 'productType' },
							{ text: '产品编码', field: 'productCode' },
							{ text: '单位', field: 'unitName' },
							{ text: '采购数', field: 'procureCount' },
							{ text: '赠品数', field: 'giveCount' },
							{ text: '总金额', field: 'amount' },
							{ text: '入库单价', field: 'singPrice' },
							{ text: '采购单价', field: 'inPrice' },
						],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					columns: [
						[
							{ title: '产品名称', align: 'center', field: 'productName', width: 150 },
							{ title: '产品类型', align: 'center', field: 'productType', width: 120 },
							{ title: '产品编码', align: 'center', field: 'productCode', width: 120 },
							{ title: '单位', align: 'center', field: 'unitName', width: 80 },
							{ title: '赠品数', align: 'center', field: 'giveCount', width: 80 },
							{ title: '总金额', align: 'center', field: 'amount', width: 80 },
							{ title: '入库单价', align: 'center', field: 'singPrice', width: 100 },
							{ title: '采购单价', align: 'center', field: 'inPrice', width: 100 },
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
};

//检验报告单
export const InspectionTestDataProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('InspectionTestModule');
		context.addPrintElementTypes('InspectionTestModule', [
			new hiprint.PrintElementTypeGroup('【公共组件】', [
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
				{ tid: 'aProviderModule.hline', title: '横线', type: 'hline' },
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
					title: '病历号',
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
					tid: 'InspectionTestDataProvider.orgName',
					title: '医院名称',
					data: '测试医院',
					type: 'text',
					hideTitle: true,
					options: {
						field: 'orgName',
						testData: '测试医院',
						height: 25,
						fontSize: 18,
						width: '350',
						fontWeight: '400',
						textAlign: 'center',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{ tid: 'aProviderModule.orgImg', title: 'Logo', data: logoImg, type: 'image', options: { field: 'orgImg', width: 50, height: 50 } },
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
				},
			]),
			new hiprint.PrintElementTypeGroup('【用户/宠物】', [
				{
					tid: 'InspectionTestDataProvider.customerName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.cellPhone',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.cardNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petGenderText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petOrder',
					title: '病例号',
					data: 'A20200101001',
					type: 'text',
					options: {
						field: 'petOrder',
						testData: 'A20200101001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petWeight',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petAgeText',
					title: '年（日）龄',
					data: '2年3个月',
					type: 'text',
					options: {
						field: 'petAgeText',
						testData: '2年3个月',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petKindText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petVarietieText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petIdentityNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.petColorText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.orderNo',
					title: '病例号',
					data: 'B000000000001',
					type: 'text',
					options: {
						field: 'orderNo',
						testData: 'B000000000001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'InspectionTestDataProvider.doctorIdNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【化验结果】', [
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
							{ text: '单位', field: 'unit' },
							{ text: '最大值', field: 'maxValue' },
							{ text: '最小值', field: 'minValue' },
							{ text: '检测结果', field: 'resultValue' },
							{ text: '', field: 'resultImage' },
						],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					border: 'noBorder',
					tableHeaderBorder: 'noBorder',
					tableHeaderCellBorder: 'noBorder',
					tableHeaderBackground: '#b3c2f2',
					tableHeaderFontWeight: '500',
					tableBodyRowBorder: 'noBorder',
					tableBodyCellBorder: 'noBorder',
					columns: [
						[
							{ title: '项目名称', align: 'left', field: 'name' },
							{ title: '单位', align: 'left', field: 'unit' },
							{ title: '最大值', align: 'left', field: 'maxValue' },
							{ title: '最小值', align: 'left', field: 'minValue' },
							{ title: '检测结果', align: 'left', field: 'resultValue' },
							{
								title: '参考范围',
								align: 'left',
								field: 'resultValue',
								formatter: function (value, row, index, options) {
									if (!isNaN(row.resultValue)) {
										var resultHtml =
											'<div ><div style="height:20px;border: solid 1px #ccc;display: flex;flex-wrap: wrap;position: relative;box-sizing: border-box;"><div style="max-width: 33.33%;flex: 0 0 33.33%;">';
										if (row.resultValue < row.minValue) {
											var shiftingProportion = (row.minValue - row.resultValue) / (row.maxValue - row.minValue);
											var result = shiftingProportion > 1 ? 0 : 1 - shiftingProportion >= 0.95 ? 95 : (1 - shiftingProportion) * 100;
											resultHtml = resultHtml + '<div style="width: 10%;background-color: #909399;height: 100%;margin-left: ' + result + '%;" ></div>';
										}
										resultHtml = resultHtml + '</div><div style="max-width: 33.33%;flex: 0 0 33.33%;border-left: solid 2px #ccc;border-right: solid 2px #ccc;" >';
										if (row.resultValue >= row.minValue && row.resultValue <= row.maxValue) {
											var shiftingProportion = (row.resultValue / (row.maxValue - row.minValue)) * 100;
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
								},
							},
						],
					],
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};

//A4账单
export const BillA4Provider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('BillA4ProviderModule');
		context.addPrintElementTypes('BillA4ProviderModule', [
			new hiprint.PrintElementTypeGroup('【基础数据】', [
				{ tid: 'aProviderModule.hline', title: '横线', type: 'hline' },
				{ tid: 'aProviderModule.vline', title: '竖线', type: 'vline' },
				{
					tid: 'BillA4Provider.printTime',
					title: '打印时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'printTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.createOrgName',
					title: '医院名称',
					data: '测试医院',
					type: 'text',
					hideTitle: true,
					options: {
						field: 'createOrgName',
						testData: '测试医院',
						height: 25,
						fontSize: 21,
						fontWeight: '700',
						textAlign: 'center',
						hideTitle: true,
						width: 300,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.cashierName',
					title: '收银员',
					data: '张三',
					type: 'text',
					options: {
						field: 'cashierName',
						testData: '张三',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.serialNumber',
					title: '订单编号',
					data: 'PXXXXXXXXXXXXXX',
					type: 'text',
					options: {
						field: 'serialNumber',
						testData: 'PXXXXXXXXXXXXXX',
						height: 16,
						width: 175,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.address',
					title: '地址',
					data: '北京市海淀区海淀西路软件园1号楼',
					type: 'text',
					options: {
						field: 'address',
						testData: '北京市海淀区海淀西路软件园1号楼',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.contactInfo',
					title: '联系方式',
					data: '18888888888',
					type: 'text',
					options: {
						field: 'contactInfo',
						testData: '18888888888',
						height: 16,
						width: 160,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.customerName',
					title: '用户名称',
					data: '卡尔',
					type: 'text',
					options: {
						field: 'customerName',
						testData: '卡尔',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.cellPhone',
					title: '手机号码',
					data: '18888888888',
					type: 'text',
					options: {
						field: 'cellPhone',
						testData: '18888888888',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.cardNumber',
					title: '会员编号',
					data: 'C8888888888',
					type: 'text',
					options: {
						field: 'cardNumber',
						testData: 'C8888888888',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.levelText',
					title: '会员级别',
					data: '超级VIP',
					type: 'text',
					options: {
						field: 'levelText',
						testData: '超级VIP',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.totalAmount',
					title: '账单金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'totalAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.discountAmount',
					title: '折扣金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'discountAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.downIntegerAmount',
					title: '抹零金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'downIntegerAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.actlyAmount',
					title: '实付金额',
					data: '0.00',
					type: 'text',
					options: {
						field: 'actlyAmount',
						testData: '0.00',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BillA4Provider.createTime',
					title: '付款时间',
					data: '2000-01-02 09:00:00',
					type: 'text',
					options: {
						field: 'createTime',
						testData: '2000-01-02 09:00:00',
						height: 16,
						width: 160,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【明细】', [
				{
					tid: 'BillA4Provider.table',
					title: '明细数据',
					type: 'table',
					options: {
						field: 'billDetails',
						fields: [
							{ text: '宠物名称', field: 'petName' },
							{ text: '种类', field: 'petKindText' },
							{ text: '年龄', field: 'ageText' },
							{ text: '费用类型', field: 'costTypeText' },
							{ text: '项目', field: 'productName' },
							{ text: '单价', field: 'settlementPrice' },
							{ text: '数量', field: 'count' },
							{ text: '实付金额', field: 'actualPrice' },
							{ text: '下单时间', field: 'placeOrderTime' },
						],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					columns: [
						[
							{ title: '宠物名称', align: 'left', field: 'petName', width: 100 },
							{ title: '种类', align: 'left', field: 'petKindText', width: 100 },
							{ title: '年龄', align: 'left', field: 'ageText', width: 120 },
							{ title: '费用类型', align: 'left', field: 'costTypeText', width: 100 },
							{ title: '项目', align: 'left', field: 'productName', width: 180 },
							{ title: '单价', align: 'left', field: 'settlementPrice', width: 80 },
							{ title: '数量', align: 'left', field: 'count', width: 60 },
							{ title: '实付金额', align: 'left', field: 'actualPrice', width: 80 },
							{ title: '下单时间', align: 'left', field: 'placeOrderTime', width: 100 },
						],
					],
				},
				{
					tid: 'BillA4Provider.tableMethod',
					title: '支付方式',
					type: 'table',
					options: {
						field: 'billPayMethods',
						fields: [
							{ text: '付款方式', field: 'typeName' },
							{ text: '付款金额', field: 'amount' }
						],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					tableHeaderRepeat: "none",
					tableBorder: "noBorder",
					tableHeaderBorder: "noBorder",
					tableHeaderCellBorder: "noBorder",
					tableHeaderBackground: "#ffffff",
					tableBodyRowBorder: "noBorder",
					tableBodyCellBorder: "noBorder",
					tableFooterBorder: "noBorder",
					tableFooterCellBorder: "noBorder",
					columns: [
						[
							{ title: '付款方式', align: 'left', field: 'typeName', width: 105 },
							{ title: '付款金额', align: 'left', field: 'amount', width: 47 },
						],
					],
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};

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
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						width: '350',
						fontWeight: '400',
						textAlign: 'center',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
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
						tableBorder: 'noBorder',
						tableHeaderBorder: 'noBorder',
						tableHeaderCellBorder: 'noBorder',
						tableHeaderBackground: '#ffffff',
						tableHeaderFontSize: 9,
						tableBodyRowBorder: 'noBorder',
						tableBodyCellBorder: 'noBorder',
						tableFooterBorder: 'noBorder',
						tableFooterCellBorder: 'noBorder',
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
					]
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};

export const CEMRecord = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('CEMRecordModule');
		context.addPrintElementTypes('CEMRecordModule', [
			new hiprint.PrintElementTypeGroup('【基础数据】', [
				{ tid: 'hline', title: '横线', type: 'hline' },
				{ tid: 'vline', title: '竖线', type: 'vline' },
				{ tid: 'rect', title: '矩形', type: 'rect' },
				{
					tid: 'CEMRecord.html',
					title: 'html',
					type: 'html',
					options: {
						field: 'test.content',
						width: 400,
						content: ` <div class='products'><div class='mg-row col-100'><span class='title'>开单时间：</span><span class='info'>2024-07-30 16:39:10</span></div><div class='custom-table'><div class='custom-th'><div class='w-20 center'><span>名称</span></div><div class='w-10 left'><span>单位</span></div><div class='w-10 center'><span>规格</span></div><div class='w-10 center'><span>用量</span></div><div class='w-10 left'><span>天数</span></div><div class='w-15 left'><span>单价</span></div><div class='w-10 left'><span>数量</span></div><div class='w-15 left'><span>总金额</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div><div class='custom-tr'><div class='w-20 center'><span>氟欣安</span></div><div class='w-10 left'><span>瓶</span></div><div class='w-10 center'><span>1*50ml</span></div><div class='w-10 center'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>1</span></div><div class='w-10 left'><span>1</span></div><div class='w-15 left'><span>11</span></div></div></div></div>`,
					},
				},
				{
					tid: 'CEMRecord.customText',
					title: '文本',
					customText: '自定义文本',
					custom: true,
					type: 'text',
					options: {
						width: 200,
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						fontFamily: 'Microsoft YaHei',
						testData: '长文本分页/不分页测试',
						hideTitle: true,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'longtext',
					title: '长文本',
					data: '长文本',
					type: 'longText',
					options: {
						field: 'longtext',
						testData: '长文本',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 12.75,
					},
				},
				{
					tid: 'CEMRecord.printTime',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.title',
					title: '标题',
					data: '测试中心医院病例（个体动物）',
					type: 'text',
					options: {
						field: 'title',
						testData: '测试中心医院病例',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.customerName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.customerPhone',
					title: '手机号码',
					data: '166XXXXXXXX',
					type: 'text',
					options: {
						field: 'customerPhone',
						testData: '166XXXXXXXX',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.cardNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petGenderText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.serialNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petWeight',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petAge',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petKindText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petVarietieText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petIdentityNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.petColorText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.visitDoctorName',
					title: '责任医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'visitDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.orderNo',
					title: '病例号',
					data: 'B000000000001',
					type: 'text',
					options: {
						field: 'orderNo',
						testData: 'B000000000001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.doctorIdNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.zhuSu.zhuSu',
					title: '主诉',
					data: '主诉',
					type: 'longText',
					options: {
						field: 'zhuSu.zhuSu',
						testData: '主诉',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 15,
					},
				},
				{
					tid: 'CEMRecord.zhuSu.pastHistory',
					title: '现病史',
					data: '现病史',
					type: 'longText',
					options: {
						field: 'zhuSu.pastHistory',
						testData: '现病史现病史现病史现病史',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 15,
					},
				},
				{
					tid: 'CEMRecord.zhuSu.allergyHistory',
					title: '既往史',
					data: '既往史',
					type: 'longText',
					options: {
						field: 'zhuSu.allergyHistory',
						testData: '既往史',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 15,
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【体格检查】', [
				{
					tid: 'CEMRecord.physical.temperature',
					title: '体温',
					customText: '16℃',
					custom: true,
					type: 'text',
					options: {
						field: 'physical.temperature',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '16℃',
					},
				},
				{
					tid: 'CEMRecord.physical.heartRate',
					title: '心率',
					customText: '12',
					custom: true,
					type: 'text',
					options: {
						field: 'physical.heartRate',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '16℃',
					},
				},
				{
					tid: 'CEMRecord.physical.petWeight',
					title: '体重',
					customText: '12Kg',
					custom: true,
					type: 'text',
					options: {
						field: 'physical.petWeight',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '12Kg',
					},
				},
				{
					tid: 'CEMRecord.physical.respiratoryRate',
					title: '呼吸',
					customText: '34',
					custom: true,
					type: 'text',
					options: {
						field: 'physical.respiratoryRate',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '34',
					},
				},
				{
					tid: 'CEMRecord.physical.crt',
					title: 'CRT(S)',
					customText: '34',
					custom: true,
					type: 'text',
					options: {
						field: 'physical.crt',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '34',
					},
				},
				{
					tid: 'CEMRecord.physical.bcs',
					title: 'BCS',
					customText: '34',
					custom: true,
					type: 'text',
					options: {
						field: 'physical.bcs',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '34',
					},
				},
				{
					tid: 'CEMRecord.physicalRemark',
					title: '检查结果',
					data: '检查结果',
					type: 'longText',
					options: {
						field: 'physicalRemark',
						testData: '检查结果',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【处方明细】', [
				{
					tid: 'CEMRecord.prescriptions',
					title: '明细数据',
					type: 'table',
					options: {
						field: 'prescriptions',
						fields: [
							// { text: '产品明细', field: 'itemdetails' },
							{ text: '名称', field: 'itemName' },
							// { text: '类型', field: 'typeText' },
							{ text: '单位', field: 'unitName' },
							{ text: '规格', field: 'specific' },
							{ text: '用量', field: 'useDose' },
							{ text: '天数', field: 'dayNum' },
							{ text: '单价', field: 'salePrice' },
							{ text: '数量', field: 'count' },
							{ text: '总金额', field: 'amountPrice' },
							{ text: '开单时间', field: 'billingTime' },
						],

						// {
						// 	width: 546,
						// 	title: "类型",
						// 	field: "product_type",
						// 	checked: true,
						// 	columnId: "product_type",
						// 	fixed: false,
						// 	rowspan: 1,
						// 	colspan: 1,
						// 	align: "left",
						// 	renderFormatter: "function(value,row,index,options){let rowTemplate = '';rowTemplate+= ` <div class='products'><div class='mg-row col-25'><span class='title'>开单时间：</span><span class='info'>${row.billingTime}</span></div><div class='custom-table'><div class='custom-th'><div class='w-20 center'><span>名称</span></div><div class='w-10 left'><span>单位</span></div><div class='w-10 center'><span>规格</span></div><div class='w-10 center'><span>用量</span></div><div class='w-10 left'><span>天数</span></div><div class='w-10 left'><span>单价</span></div><div class='w-10 left'><span>数量</span></div><div class='w-10 left'><span>总金额</span></div></div>`;for(var i = 0;i < row.items?.length;i++){rowTemplate+= `<div class='custom-tr'><div class='w-20 center'><span>${row.items[i].itemName}</span></div><div class='w-10 left'><span>${row.items[i].unitName}</span></div><div class='w-10 center'><span>${row.items[i].specific}</span></div><div class='w-10 center'><span>${row.items[i].useDose}</span></div><div class='w-10 left'><span>${row.items[i].dayNum}</span></div><div class='w-10 left'><span>${row.items[i].salePrice}</span></div><div class='w-10 left'><span>${row.items[i].count}</span></div><div class='w-10 left'><span>${row.items[i].amountPrice}</span></div></div>`}rowTemplate+= `</div></div>`;return rowTemplate}",
						// 	tableQRCodeLevel: 0,
						// 	tableSummaryTitle: true,
						// 	tableSummary: ""
						// 	}
						tableBorder: 'noBorder',
						tableHeaderBorder: 'noBorder',
						tableHeaderCellBorder: 'noBorder',
						tableHeaderBackground: '#ffffff',
						tableHeaderFontSize: 9,
						tableBodyRowBorder: 'noBorder',
						tableBodyCellBorder: 'noBorder',
						tableFooterBorder: 'noBorder',
						tableFooterCellBorder: 'noBorder',
					},
					groupFields: ['billingTime'],
					groupFieldsFormatter: "function(type,options,d){ return ['billingTime'] }",
					// groupFormatter: "function(colTotal,tableData,printData,groupData,options){ console.log('groupData',groupData) return groupData.billingTime }",
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整

					groupFormatter: `function(colTotal,tableData,printData,groupData,options){ return '<td colspan="4">开单时间：'+groupData.billingTime+'</td>' }`,
					columns: [
						[
							// 	{
							// 	width: 546,
							// 	title: "类型",
							// 	field: "itemdetails",
							// 	checked: true,
							// 	columnId: "itemdetails",
							// 	fixed: false,
							// 	rowspan: 1,
							// 	colspan: 1,
							// 	align: "left",
							// 	renderFormatter: "function(value,row,index,options){let rowTemplate = '';rowTemplate+= ` <div class='products'><div class='mg-row col-100'><span class='title'>开单时间：</span><span class='info'>${row.billingTime}</span></div><div class='custom-table'><div class='custom-th'><div class='w-20 center'><span>名称</span></div><div class='w-10 left'><span>单位</span></div><div class='w-10 center'><span>规格</span></div><div class='w-10 center'><span>用量</span></div><div class='w-10 left'><span>天数</span></div><div class='w-15 left'><span>单价</span></div><div class='w-10 left'><span>数量</span></div><div class='w-15 left'><span>总金额</span></div></div>`;for(var i = 0;i < row.items?.length;i++){rowTemplate+= `<div class='custom-tr'><div class='w-20 center'><span>${row.items[i].itemName}</span></div><div class='w-10 left'><span>${row.items[i].unitName}</span></div><div class='w-10 center'><span>${row.items[i].specific}</span></div><div class='w-10 center'><span>${row.items[i].useDose}</span></div><div class='w-10 left'><span>${row.items[i].dayNum}</span></div><div class='w-15 left'><span>${row.items[i].salePrice}</span></div><div class='w-10 left'><span>${row.items[i].count}</span></div><div class='w-15 left'><span>${row.items[i].amountPrice}</span></div></div>`}rowTemplate+= `</div></div><style>.products{display:flex;flex-wrap:wrap;position:relative;box-sizing:border-box;border:0 solid #c8c9cc;padding:5pt;margin-bottom:5pt}.products .mg-row{display:flex;margin-bottom:5pt}.col-25{max-width:25%;flex:0 0 25%}.col-33{max-width:33.3333333333%;flex:0 0 33.3333333333%}.col-50{max-width:50%;flex:0 0 50%}.col-75{max-width:75%;flex:0 0 75%}.col-100{width:100%;flex:0 0 100%}.custom-table{width:100%}.custom-table .left{text-align:left}.custom-table .right{text-align:right}.custom-table .center{text-align:center}.custom-table .custom-th,.custom-table .custom-tr{display:block;font-size:0}.custom-table .custom-th div:last-child,.custom-table .custom-tr div:last-child{border-right:0 solid #000}.custom-table .custom-th div,.custom-table .custom-tr div{font-size:10pt;display:inline-block;padding:2pt 0;border-left:0 solid #000;border-bottom:0 solid #000;vertical-align:top}.custom-table .custom-th div span,.custom-table .custom-tr div span{margin:0 5pt}.custom-table .custom-th div{border-top:0 solid #000;padding:5px 5px 5px 0;font-weight:500}.custom-table .w-9{width:9%}.custom-table .w-10{width:10%}.custom-table .w-15{width:15%}.custom-table .w-20{width:20%}.custom-table .w-25{width:25%}.custom-table .w-30{width:30%}.custom-table .w-40{width:40%}</style>`;return rowTemplate}",
							// 	tableQRCodeLevel: 0,
							// 	tableSummaryTitle: false,
							// 	tableSummary: ""
							// }
							{ title: '名称', align: 'left', field: 'itemName', width: 100 },
							// { title: '开单时间', align: 'left', field: 'billingTime', width: 100 },
							{ title: '单位', align: 'left', field: 'unitName', width: 100 },
							{ title: '规格', align: 'left', field: 'specific', width: 100 },
							{ title: '用量', align: 'left', field: 'useDose', width: 60 },
							{ title: '天数', align: 'left', field: 'dayNum', width: 60 },
							{ title: '单价', align: 'left', field: 'salePrice', width: 80 },
							{ title: '数量', align: 'left', field: 'count', width: 60 },
							{ title: '总金额', align: 'left', field: 'amountPrice', width: 80 },
						],
					],
				},
				{
					tid: 'CEMRecord.prescriptions1',
					title: '处方集合',
					data: '<p class="html-prescriptions" style="margin:0;font-size:13px">开单时间：2024/08/14 11:01:57</p><table class="cus-table" style="width:100%;table-layout:auto"><thead><tr><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">项目名称</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">单位</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">规格</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">单次用量</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">数量</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">单价</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">总金额</th></tr></thead><tbody><tr><td>双氧水</td><td>瓶</td><td>-</td><td>1.0000</td><td>1</td><td>￥2.80</td><td>￥2.80</td></tr><tr><td>碘伏</td><td>瓶</td><td>-</td><td>1.0000</td><td>1</td><td>￥6.20</td><td>￥6.20</td></tr><tr><td>酒精</td><td>瓶</td><td>-</td><td>1.0000</td><td>1</td><td>￥4.64</td><td>￥4.64</td></tr><tr><td>新洁尔灭</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥3.00</td><td>￥3.00</td></tr><tr><td>氟欣安</td><td>瓶</td><td>1*50ml</td><td>1.0000</td><td>1</td><td>￥2.60</td><td>￥2.60</td></tr><tr><td>奥普乐注射液</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥3.20</td><td>￥3.20</td></tr><tr><td>素高捷疗眼膏</td><td>g</td><td></td><td>1.0000</td><td>1</td><td>￥40.00</td><td>￥40.00</td></tr><tr><td>拜有利针剂100ml</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥2.20</td><td>￥2.20</td></tr><tr><td>赛瑞宁20ml</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥34.00</td><td>￥34.00</td></tr><tr><td>痛立定针</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥1.83</td><td>￥1.83</td></tr><tr><td>2%麻佛微素注射液</td><td>ml</td><td>100ml/瓶</td><td>1.0000</td><td>1</td><td>￥2.60</td><td>￥2.60</td></tr><tr><td>止血宁</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥30.00</td><td>￥30.00</td></tr><tr><td>通灭</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥3.00</td><td>￥3.00</td></tr><tr><td>科特壮</td><td></td><td></td><td>1.0000</td><td>1</td><td>￥1.80</td><td>￥1.80</td></tr><tr><td>润康滴眼液</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥17.85</td><td>￥17.85</td></tr><tr><td>维克 眼净125ml</td><td>瓶</td><td>125ml</td><td>1.0000</td><td>1</td><td>￥75.00</td><td>￥75.00</td></tr><tr><td>贝复舒</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥38.00</td><td>￥38.00</td></tr><tr><td>托百士</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥26.94</td><td>￥26.94</td></tr><tr><td>百灵金方明目液</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥20.00</td><td>￥20.00</td></tr><tr><td>acyliovir滴眼液</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥6.00</td><td>￥6.00</td></tr></tbody></table>',
					type: 'longText',
					options: {
						field: 'prescriptions',
						testData:
							'<p class="html-prescriptions" style="margin:0;font-size:13px">开单时间：2024/08/14 11:01:57</p><table class="cus-table" style="width:100%;table-layout:auto"><thead><tr><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">项目名称</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">单位</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">规格</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">单次用量</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">数量</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">单价</th><th style="letter-spacing:2px;text-align:left;padding:6px 6px 6px 12px">总金额</th></tr></thead><tbody><tr><td>双氧水</td><td>瓶</td><td>-</td><td>1.0000</td><td>1</td><td>￥2.80</td><td>￥2.80</td></tr><tr><td>碘伏</td><td>瓶</td><td>-</td><td>1.0000</td><td>1</td><td>￥6.20</td><td>￥6.20</td></tr><tr><td>酒精</td><td>瓶</td><td>-</td><td>1.0000</td><td>1</td><td>￥4.64</td><td>￥4.64</td></tr><tr><td>新洁尔灭</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥3.00</td><td>￥3.00</td></tr><tr><td>氟欣安</td><td>瓶</td><td>1*50ml</td><td>1.0000</td><td>1</td><td>￥2.60</td><td>￥2.60</td></tr><tr><td>奥普乐注射液</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥3.20</td><td>￥3.20</td></tr><tr><td>素高捷疗眼膏</td><td>g</td><td></td><td>1.0000</td><td>1</td><td>￥40.00</td><td>￥40.00</td></tr><tr><td>拜有利针剂100ml</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥2.20</td><td>￥2.20</td></tr><tr><td>赛瑞宁20ml</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥34.00</td><td>￥34.00</td></tr><tr><td>痛立定针</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥1.83</td><td>￥1.83</td></tr><tr><td>2%麻佛微素注射液</td><td>ml</td><td>100ml/瓶</td><td>1.0000</td><td>1</td><td>￥2.60</td><td>￥2.60</td></tr><tr><td>止血宁</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥30.00</td><td>￥30.00</td></tr><tr><td>通灭</td><td>ml</td><td></td><td>1.0000</td><td>1</td><td>￥3.00</td><td>￥3.00</td></tr><tr><td>科特壮</td><td></td><td></td><td>1.0000</td><td>1</td><td>￥1.80</td><td>￥1.80</td></tr><tr><td>润康滴眼液</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥17.85</td><td>￥17.85</td></tr><tr><td>维克 眼净125ml</td><td>瓶</td><td>125ml</td><td>1.0000</td><td>1</td><td>￥75.00</td><td>￥75.00</td></tr><tr><td>贝复舒</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥38.00</td><td>￥38.00</td></tr><tr><td>托百士</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥26.94</td><td>￥26.94</td></tr><tr><td>百灵金方明目液</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥20.00</td><td>￥20.00</td></tr><tr><td>acyliovir滴眼液</td><td>瓶</td><td></td><td>1.0000</td><td>1</td><td>￥6.00</td><td>￥6.00</td></tr></tbody></table>',
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'CEMRecord.cemRecordPrescriptionRemark',
					title: '治疗计划',
					customText: '治疗计划',
					custom: true,
					type: 'longText',
					options: {
						field: 'cemRecordPrescriptionRemark',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '治疗计划',
						lineHeight: 15,
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【诊断】', [
				{
					tid: 'CEMRecord.diagnosesNames',
					title: '疾病诊断',
					customText: '疾病诊断',
					custom: true,
					type: 'longText',
					options: {
						field: 'diagnosesNames',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '疾病诊断',
						lineHeight: 15,
					},
				},
				{
					tid: 'CEMRecord.diagnosesRemark',
					title: '诊断描述',
					customText: '诊断描述',
					custom: true,
					type: 'longText',
					options: {
						field: 'diagnosesRemark',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '诊断描述',
						lineHeight: 15,
					},
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};
//B超
export const BSCanProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('BSCanModule');
		context.addPrintElementTypes('BSCanModule', [
			new hiprint.PrintElementTypeGroup('【基础数据】', [
				{ tid: 'hline', title: '横线', type: 'hline' },
				{ tid: 'vline', title: '竖线', type: 'vline' },
				{ tid: 'rect', title: '矩形', type: 'rect' },
				{ tid: 'BSCan.logo', title: 'Logo', data: logoImg, type: 'image', options: { field: 'BSCan.logo', width: 50, height: 50 } },
				{
					tid: 'longtext',
					title: '长文本',
					data: '长文本',
					type: 'longText',
					options: {
						field: 'longtext',
						testData: '长文本',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 12.75,
					},
				},
				{
					tid: 'BSCan.printTime',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.createOrgName',
					title: '医院名称',
					data: '测试医院',
					type: 'text',
					hideTitle: true,
					options: {
						field: 'createOrgName',
						testData: '测试医院',
						height: 25,
						fontSize: 18,
						width: '350',
						fontWeight: '400',
						textAlign: 'center',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.customerName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.customerPhone',
					title: '手机号码',
					data: '166XXXXXXXX',
					type: 'text',
					options: {
						field: 'customerPhone',
						testData: '166XXXXXXXX',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.cardNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petGenderText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.serialNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petWeight',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petAgeText',
					title: '年（日）龄',
					data: '2年3个月',
					type: 'text',
					options: {
						field: 'petAgeText',
						testData: '2年3个月',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petKindText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petVarietieText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petIdentityNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.petColorText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.orderNo',
					title: '病例号',
					data: 'B000000000001',
					type: 'text',
					options: {
						field: 'orderNo',
						testData: 'B000000000001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.doctorIdNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【影像】', [
				{
					tid: 'BSCan.imageList',
					title: '影像结果',
					type: 'table',
					fontSize: 9,
					fontFamily: 'Microsoft YaHei',
					fontWeight: '500',
					options: {
						field: 'imageList',
						tableHeaderBorder: 'noBorder',
						tableHeaderCellBorder: 'noBorder',
						tableHeaderBackground: '#ffffff',
						tableHeaderFontWeight: '500',
						tableBodyRowBorder: 'noBorder',
						tableBodyCellBorder: 'noBorder',
						border: 'noBorder',
						tableBorder: 'noBorder',
						fields: [{ text: 'image', field: 'image' }],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					columns: [
						[
							{
								title: '',
								align: 'left',
								field: 'image',
								formatter: function (value, row, index, options) {
									if (value && value.length > 0) {
										var content = '<div style="display: flex;flex-wrap: wrap;justify-content: space-between;">';
										for (var i = 0; i < value.length; i++) {
											content += '<img style="width:300px;height:300px;margin-bottom:10px;" src="' + value[i].bscanImageUrl + '" />';
										}
										content += '</div>';
										return content;
									}
								},
							},
						],
					],
				},
			]),
			new hiprint.PrintElementTypeGroup('【诊断】', [
				{
					tid: 'BSCan.bscanDescribe',
					title: '超声描述',
					customText: '超声描述',
					custom: true,
					type: 'longText',
					options: {
						field: 'bscanDescribe',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '超声描述',
						lineHeight: 15,
					},
				},
				{
					tid: 'BSCan.bscanTips',
					title: '超声提示',
					customText: '超声提示',
					custom: true,
					type: 'longText',
					options: {
						field: 'bscanTips',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '超声提示',
						lineHeight: 15,
					},
				},
				{
					tid: 'BSCan.bscanPropose',
					title: '超声建议',
					customText: '超声建议',
					custom: true,
					type: 'longText',
					options: {
						field: 'bscanPropose',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '超声建议',
						lineHeight: 15,
					},
				},
				{
					tid: 'BSCan.checkTime',
					title: '检查时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'checkTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.checkDoctorName',
					title: '检查医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'checkDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.reportTime',
					title: '报告时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'reportTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'BSCan.reportDoctorName',
					title: '报告医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'reportDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};
//X光
export const XRayProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('XRayModule');
		context.addPrintElementTypes('XRayModule', [
			new hiprint.PrintElementTypeGroup('【基础数据】', [
				{ tid: 'hline', title: '横线', type: 'hline' },
				{ tid: 'vline', title: '竖线', type: 'vline' },
				{ tid: 'rect', title: '矩形', type: 'rect' },
				{ tid: 'XRay.logo', title: 'Logo', data: logoImg, type: 'image', options: { field: 'XRay.logo', width: 50, height: 50 } },
				{
					tid: 'longtext',
					title: '长文本',
					data: '长文本',
					type: 'longText',
					options: {
						field: 'longtext',
						testData: '长文本',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 12.75,
					},
				},
				{
					tid: 'XRay.printTime',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.createOrgName',
					title: '医院名称',
					data: '测试医院',
					type: 'text',
					hideTitle: true,
					options: {
						field: 'createOrgName',
						testData: '测试医院',
						height: 25,
						fontSize: 18,
						width: '350',
						fontWeight: '400',
						textAlign: 'center',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.customerName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.customerPhone',
					title: '手机号码',
					data: '166XXXXXXXX',
					type: 'text',
					options: {
						field: 'customerPhone',
						testData: '166XXXXXXXX',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.cardNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petGenderText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.serialNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petWeight',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petAgeText',
					title: '年（日）龄',
					data: '2年3个月',
					type: 'text',
					options: {
						field: 'petAgeText',
						testData: '2年3个月',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petKindText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petVarietieText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petIdentityNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.petColorText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.orderNo',
					title: '病例号',
					data: 'B000000000001',
					type: 'text',
					options: {
						field: 'orderNo',
						testData: 'B000000000001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.doctorIdNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【影像】', [
				{
					tid: 'XRay.imageList',
					title: '影像结果',
					type: 'table',
					fontSize: 9,
					fontFamily: 'Microsoft YaHei',
					fontWeight: '500',
					options: {
						field: 'imageList',
						tableHeaderBorder: 'noBorder',
						tableHeaderCellBorder: 'noBorder',
						tableHeaderBackground: '#ffffff',
						tableHeaderFontWeight: '500',
						tableBodyRowBorder: 'noBorder',
						tableBodyCellBorder: 'noBorder',
						border: 'noBorder',
						tableBorder: 'noBorder',
						tableFooterBorder: 'noBorder',
						tableFooterCellBorder: 'noBorder',
						fields: [{ text: 'image', field: 'image' }],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					columns: [
						[
							{
								title: '',
								align: 'left',
								field: 'image',
								formatter: function (value, row, index, options) {
									if (value && value.length > 0) {
										var content = '<div style="display: flex;flex-wrap: wrap;justify-content: space-between;">';
										for (var i = 0; i < value.length; i++) {
											content +=
												'<div style="margin-bottom:5px;"><img style="width:300px;height:300px;margin-bottom:5px;" src="' +
												value[i].xrayImageUrl +
												'" /><div style="text-align:center">' +
												value[i].xrayImagePartName +
												'</div></div>';
										}
										content += '</div>';
										return content;
									}
								},
							},
						],
					],
				},
			]),
			new hiprint.PrintElementTypeGroup('【诊断】', [
				{
					tid: 'XRay.xrayDescribe',
					title: '超声描述',
					customText: '超声描述',
					custom: true,
					type: 'longText',
					options: {
						field: 'xrayDescribe',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '超声描述',
						lineHeight: 15,
					},
				},
				{
					tid: 'XRay.xrayTips',
					title: '超声提示',
					customText: '超声提示',
					custom: true,
					type: 'longText',
					options: {
						field: 'xrayTips',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '超声提示',
						lineHeight: 15,
					},
				},
				{
					tid: 'XRay.xrayPropose',
					title: '超声建议',
					customText: '超声建议',
					custom: true,
					type: 'longText',
					options: {
						field: 'xrayPropose',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '超声建议',
						lineHeight: 15,
					},
				},
				{
					tid: 'XRay.checkTime',
					title: '检查时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'checkTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.checkDoctorName',
					title: '检查医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'checkDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.reportTime',
					title: '报告时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'reportTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'XRay.reportDoctorName',
					title: '报告医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'reportDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};
//显微镜
export const MicroProvider = function () {
	var addElementTypes = function (context: any) {
		context.removePrintElementTypes('MicroModule');
		context.addPrintElementTypes('MicroModule', [
			new hiprint.PrintElementTypeGroup('【基础数据】', [
				{ tid: 'hline', title: '横线', type: 'hline' },
				{ tid: 'vline', title: '竖线', type: 'vline' },
				{ tid: 'rect', title: '矩形', type: 'rect' },
				{ tid: 'Micro.logo', title: 'Logo', data: logoImg, type: 'image', options: { field: 'Micro.logo', width: 50, height: 50 } },
				{
					tid: 'longtext',
					title: '长文本',
					data: '长文本',
					type: 'longText',
					options: {
						field: 'longtext',
						testData: '长文本',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						lineHeight: 12.75,
					},
				},
				{
					tid: 'Micro.printTime',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.createOrgName',
					title: '医院名称',
					data: '测试医院',
					type: 'text',
					hideTitle: true,
					options: {
						field: 'createOrgName',
						testData: '测试医院',
						height: 25,
						fontSize: 18,
						width: '350',
						fontWeight: '400',
						textAlign: 'center',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.customerName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.customerPhone',
					title: '手机号码',
					data: '166XXXXXXXX',
					type: 'text',
					options: {
						field: 'customerPhone',
						testData: '166XXXXXXXX',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.cardNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petName',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petGenderText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.serialNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petWeight',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petAgeText',
					title: '年（日）龄',
					data: '2年3个月',
					type: 'text',
					options: {
						field: 'petAgeText',
						testData: '2年3个月',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petKindText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petVarietieText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petIdentityNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.petColorText',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.orderNo',
					title: '病例号',
					data: 'B000000000001',
					type: 'text',
					options: {
						field: 'orderNo',
						testData: 'B000000000001',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: true,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.doctorIdNumber',
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
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
			new hiprint.PrintElementTypeGroup('【影像】', [
				{
					tid: 'Micro.imageList',
					title: '影像结果',
					type: 'table',
					fontSize: 9,
					fontFamily: 'Microsoft YaHei',
					fontWeight: '500',
					options: {
						field: 'imageList',
						tableHeaderBorder: 'noBorder',
						tableHeaderCellBorder: 'noBorder',
						tableHeaderBackground: '#ffffff',
						tableHeaderFontWeight: '500',
						tableBodyRowBorder: 'noBorder',
						tableBodyCellBorder: 'noBorder',
						border: 'noBorder',
						tableBorder: 'noBorder',
						tableFooterBorder: 'noBorder',
						tableFooterCellBorder: 'noBorder',
						fields: [{ text: 'image', field: 'image' }],
					},
					editable: true,
					columnDisplayEditable: true, //列显示是否能编辑
					columnDisplayIndexEditable: true, //列顺序显示是否能编辑
					columnTitleEditable: true, //列标题是否能编辑
					columnResizable: true, //列宽是否能调整
					columnAlignEditable: true, //列对齐是否调整
					columns: [
						[
							{
								title: '',
								align: 'left',
								field: 'image',
								formatter: function (value, row, index, options) {
									if (value && value.length > 0) {
										var content = '<div style="display: flex;flex-wrap: wrap;justify-content: space-between;">';
										for (var i = 0; i < value.length; i++) {
											content +=
												'<div style="margin-bottom:5px;"><img style="width:300px;height:300px;margin-bottom:5px;" src="' +
												value[i].microImageUrl +
												'" /><div style="text-align:center">' +
												value[i].microImagePartName +
												'</div></div>';
										}
										content += '</div>';
										return content;
									}
								},
							},
						],
					],
				},
			]),
			new hiprint.PrintElementTypeGroup('【诊断】', [
				{
					tid: 'Micro.microInspectPart',
					title: '检查部位',
					customText: '检查部位',
					custom: true,
					type: 'longText',
					options: {
						field: 'microInspectPart',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '检查部位',
						lineHeight: 15,
					},
				},
				{
					tid: 'Micro.microDescribe',
					title: '描述',
					customText: '描述',
					custom: true,
					type: 'longText',
					options: {
						field: 'microDescribe',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '描述',
						lineHeight: 15,
					},
				},
				{
					tid: 'Micro.microTips',
					title: '镜检提示',
					customText: '镜检提示',
					custom: true,
					type: 'longText',
					options: {
						field: 'microTips',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '镜检提示',
						lineHeight: 15,
					},
				},
				{
					tid: 'Micro.microPropose',
					title: '建议',
					customText: '建议',
					custom: true,
					type: 'longText',
					options: {
						field: 'microPropose',
						height: 16,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
						testData: '建议',
						lineHeight: 15,
					},
				},
				{
					tid: 'Micro.checkTime',
					title: '检查时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'checkTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.checkDoctorName',
					title: '检查医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'checkDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.reportTime',
					title: '报告时间',
					data: '2000-01-01',
					type: 'text',
					options: {
						field: 'reportTime',
						testData: '2000-01-01 00:00:00',
						width: 160,
						height: 16,
						fontSize: 10.5,
						hideTitle: false,
						textContentVerticalAlign: 'middle',
					},
				},
				{
					tid: 'Micro.reportDoctorName',
					title: '报告医生',
					data: '李医生',
					type: 'text',
					options: {
						field: 'reportDoctorName',
						testData: '李医生',
						height: 16,
						width: 320,
						fontSize: 10.5,
						textAlign: 'left',
						hideTitle: false,
						fontFamily: 'Microsoft YaHei',
						textContentVerticalAlign: 'middle',
					},
				},
			]),
		]);
	};
	return {
		addElementTypes: addElementTypes,
	};
};

// type: 1供货商 2经销商
export default [
	{
		name: 'A设计',
		value: 'aProviderModule',
		type: 1,
		f: aProvider(),
	},
	{
		name: 'B设计',
		value: 'bProviderModule',
		type: 2,
		f: bProvider(),
	},
	{
		name: '入库单设计',
		value: 'InStoreProviderModule',
		type: 3,
		f: InStoreProvider(),
	},
	{
		name: '化验报告设计',
		value: 'InspectionTestModule',
		type: 4,
		f: InspectionTestDataProvider(),
	},
	{
		name: '账单-A4',
		value: 'BillA4ProviderModule',
		type: 5,
		f: BillA4Provider(),
	},
	{
		name: '处方签设计',
		value: 'PrescriptionProviderModule',
		type: 6,
		f: PrescriptionProvider(),
	},
	{
		name: '处方设计',
		value: 'CEMRecordModule',
		type: 7,
		f: CEMRecord(),
		extendCss: extendCss,
	},
	{
		name: 'B超打印模板',
		value: 'BSCanModule',
		type: 8,
		f: BSCanProvider(),
	},
	{
		name: 'X光打印模板',
		value: 'XRayModule',
		type: 9,
		f: XRayProvider(),
	},
	{
		name: '显微镜打印模板',
		value: 'MicroModule',
		type: 10,
		f: MicroProvider(),
	},
];

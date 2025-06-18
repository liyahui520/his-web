<template>
	<el-card shadow="never" header="近 15 日收款金额" v-loading="loading">
		<scEcharts ref="c1" height="340px" :option="option"></scEcharts>
	</el-card>
</template>

<script>
import scEcharts from '/@/components/scEcharts/index.vue';
import { getAPI } from '/@/utils/axios-utils';
import { OrderSummaryApi } from '/@/api-services';
import Decimal from 'decimal.js';

export default {
	title: '近 15 日收款金额',
	icon: 'ele-DataLine',
	description: '近 15 日收款金额',
	components: {
		scEcharts,
	},
	data() {
		return {
			loading: true,
			option: {},
		};
	},
	async created() {
		var option = {
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
					return params[0].data.extend;
				},
			},
			xAxis: {
				boundaryGap: false,
				type: 'category',
				data: [],
			},
			yAxis: [
				{
					type: 'value',
					name: '金额（元）',
				},
			],
			series: [
				{
					name: '收款',
					type: 'line',
					smooth: true,
					label: {
						show: true,
						position: 'top',
					},
					lineStyle: {
						width: 1,
						color: '#409EFF',
					},
					data: [],
				},
			],
		};
		this.option = option;
		await this.getData();
	},
	methods: {
		async getData() {
			let _this = this;
			_this.loading = true;
			await getAPI(OrderSummaryApi)
				.apiOrderSummaryLastFittenPayGet()
				.then((res) => {
					let result = res.data.result ?? [];
					_this.option.series[0].data.shift();
					_this.option.xAxis.data.shift();
					result.forEach((item) => {
						const markerTotal = '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#409EFF;"></span>';
						const markerReturn = '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#F56C6C;"></span>';
						const marker = '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#67C23A;"></span>';
						_this.option.series[0].data.push({
							name: item.date,
							value: new Decimal(item.amount ?? 0).toNumber().toFixed(2),
							extend: `${item.date}<br/>
						${markerTotal} 总收款金额：${new Decimal(item.amount ?? 0).toNumber().toFixed(2)}<br/>
						${markerReturn} 总退款金额：${new Decimal(item.returnAmount ?? 0).toNumber().toFixed(2)}<br/>
						${marker} 总营收金额：${new Decimal(item.totalAmount).toNumber().toFixed(2)}`,
						});
						_this.option.xAxis.data.push(item.date);
					});
					_this.loading = false;
				})
				.catch(() => {
					_this.loading = false;
				});
		},
	},
};
</script>

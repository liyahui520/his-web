<template>
	<el-card shadow="never" header="我的日程" class="item-background">
		<template #header>
			<el-icon style="display: inline; vertical-align: middle"> <ele-Calendar /> </el-icon>
			<span style=""> 我的日程 </span>
		</template>

		<div class="custome-canlendar">
			<el-calendar v-model="state.calendarValue" ref="calendar">
				<template #header="{ date }">
					<span>{{ date }}</span>
					<el-button-group>
						<el-button size="small" @click="selectDate('prev-month')"> 上个月 </el-button>
						<el-button size="small" @click="selectDate('today')">今天</el-button>
						<el-button size="small" @click="selectDate('next-month')"> 下个月 </el-button>
					</el-button-group>
				</template>
				<template #date-cell="{ data }">
					<div @click="handleClickDate(data)">
						<div class="spandate">{{ data.day.split('-').slice(2).join('-') }}</div>
						<div v-for="(item, key) in state.ScheduleData" :key="key">
							<el-badge v-if="FormatDate(data.day) == FormatDate(new Date(item.countDate)) && (item.vaccinationCount > 0 || item.reservationCount > 0)" is-dot class="item"></el-badge>
						</div>
						<div style="font-size: 10px">
							{{ solarDate2lunar(data.day) }}
						</div>
					</div>
				</template>
			</el-calendar>
		</div>
		<div class="schedule-list" v-loading="contentoading">
			<div class="item" v-for="(item, index) in state.TodayScheduleData" :key="index" style="margin-bottom: 15px">
				<div v-if="state.TodayScheduleData.length > 0">
					<div v-if="item.vaccinationCount > 0" @click="handleDia(0,item.countDate)">
						<el-icon class="icon"> <ele-Search /> </el-icon>
						<span class="content" style="padding-left: 10px">
							<el-text tag="b" type="warning" size="default" style="padding-left: 10px">{{ item.vaccinationCount }} / 预防</el-text>
						</span>
					</div>
					<div v-if="item.reservationCount > 0" @click="handleDia(1,item.countDate)">
						<el-icon class="icon"> <ele-Search /> </el-icon>
						<span class="content" style="padding-left: 10px">
							<el-text tag="b" type="success" size="default" style="padding-left: 10px">{{ item.reservationCount }} / 预约</el-text>
						</span>
					</div>
				</div>
			</div>
		</div>

		<vacciantionDia ref="vacciantionDiaRef" :title="'预防'" @handleQuery="handleQuery"> </vacciantionDia>
		<reservationDia ref="reservationDiaRef" :title="'预约'" @handleQuery="handleQuery"> </reservationDia>
	</el-card>
</template>

<script lang="ts">
export default {
	title: '日程',
	icon: 'ele-Calendar',
	description: '日程',
};
</script>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { dayjs, ElMessage, ElMessageBox } from 'element-plus';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
import calendarCom from '/@/utils/calendar.js';
import { getAPI } from '/@/utils/axios-utils';
import { OrderSummaryApi } from '/@/api-services/api';
import vacciantionDia from '/@/views/home/widgets/components/vacciantionDia.vue';
import reservationDia from '/@/views/home/widgets/components/reservationDia.vue';

const vacciantionDiaRef = ref();
const reservationDiaRef = ref();
const calendar = ref<CalendarInstance>();
const contentoading = ref<any>(false);
const state = reactive({
	ScheduleData: [] as any, // 日程列表数据
	TodayScheduleData: [] as any, // 当天列表数据
	calendarValue: new Date(),
	queryParams: {
		scheduleTime: new Date(),
		startTime: new Date(),
		endTime: new Date(),
	},
	editTitle: '',
	currentMonth: '',
});
const handleDia = (type: number,date:any) => {
	if (type == 1) {
		reservationDiaRef.value.openDialog([date,date]);
	} else {
		vacciantionDiaRef.value.openDialog([date,date]);
	}
};
// 页面初始化
onMounted(async () => {
	await handleQuery();
});

// 查询操作
const handleQuery = async () => {
	contentoading.value = true;
	state.queryParams.startTime = dayjs(GetMonthFirstDay(state.calendarValue)).add(-1, 'month').toDate();
	state.queryParams.endTime = dayjs(GetMonthLastDay(state.calendarValue)).add(1, 'month').toDate();

	let params = Object.assign(state.queryParams);
	var res = await getAPI(OrderSummaryApi).apiOrderSummaryGetCalendarListPost(params);
	state.ScheduleData = res.data.result ?? [];
	contentoading.value = false;
	state.TodayScheduleData = state.ScheduleData.filter((item) => {
		return FormatDate(item.countDate) == FormatDate(state.calendarValue) && (item.reservationCount > 0 || item.vaccinationCount > 0);
	});
	state.currentMonth = dayjs(state.calendarValue).format('YYYYMM');
};

const selectDate = async (val: CalendarDateType) => {
	if (!calendar.value) return;
	calendar.value.selectDate(val);
	await handleQuery();
};
// 农历转换
const solarDate2lunar = (solarDate: any) => {
	var solar = solarDate.split('-');
	var lunar = calendarCom.solar2lunar(solar[0], solar[1], solar[2]);
	return lunar.IMonthCn + lunar.IDayCn;
};

// 按天查询
const handleQueryByDate = async (date: any) => {
	contentoading.value = true;
	state.queryParams.startTime = FormatDateDelHMS(date);
	state.queryParams.endTime = FormatDateEndHMS(date);
	let params = Object.assign(state.queryParams);
	var res = await getAPI(OrderSummaryApi).apiOrderSummaryGetCalendarListPost(params);
	state.TodayScheduleData = res.data.result ?? [];
	contentoading.value = false;
};

// 点击日历中的日期
const handleClickDate = async (data: any) => {
	if (state.currentMonth != dayjs(data.day).format('YYYYMM')) {
		await handleQuery();
	}
	await handleQueryByDate(data.day);
	state.queryParams.scheduleTime = data.day;
};

// 获取当月第一天
const GetMonthFirstDay = (date: any) => {
	var newDate = new Date(date);
	newDate.setDate(1);
	newDate.setHours(0);
	newDate.setMinutes(0);
	newDate.setSeconds(0);
	return newDate;
};

// 获取当月最后一天
const GetMonthLastDay = (date: any) => {
	var newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + 1);
	newDate.setDate(0);
	newDate.setHours(0);
	newDate.setMinutes(0);
	newDate.setSeconds(0);
	return newDate;
};

// 去掉时分秒的日期
const FormatDateDelHMS = (date: any) => {
	var newDate = new Date(date);
	newDate.setHours(0);
	newDate.setMinutes(0);
	newDate.setSeconds(0);
	return newDate;
};

const FormatDateEndHMS = (date: any) => {
	var newDate = new Date(date);
	newDate.setHours(23);
	newDate.setMinutes(59);
	newDate.setSeconds(59);
	return newDate;
};

// 格式化日期
const FormatDate = (date: any) => {
	return dayjs(date).format('YYYY-MM-DD');
};
</script>

<style lang="scss" scoped>
.custome-canlendar {
	position: relative;
	text-align: center;

	:deep(.el-calendar) {
		.el-calendar-table .el-calendar-day {
			width: 100%;
			height: 100%;
		}

		.el-calendar__body {
			padding: 5px 0;
		}

		.el-calendar-table .el-calendar-day {
			position: relative;
		}

		td .spandate {
			margin: auto;
			width: 26px;
			height: 26px;
			line-height: 26px;
			border-radius: 50%;
		}
		td.is-selected .spandate {
			width: 26px;
			height: 26px;
			line-height: 26px;
			border-radius: 50%;
			color: #fff;
			background-color: var(--el-color-primary);
		}
		/*小红点样式*/
		.el-badge {
			position: absolute;
			left: 0;
			bottom: -8px;
			width: 100%;
		}
	}
}

// 日程列表
.schedule-list {
	overflow-y: auto;
	height: 150px;
	.item {
		position: relative;
		margin-bottom: 5px;
		padding: 0 11px;
		line-height: 24px;
		background-color: #f1f1f1;
		cursor: pointer;

		&::before {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			content: '';
			width: 3px;
			background: var(--el-color-primary);
		}

		.date {
			margin-right: 5px;
			font-size: 14px;
		}
		.content {
			color: #666;
			font-size: 14px;
		}
		.icon {
			display: inline;
			vertical-align: middle;
			color: var(--el-color-primary);
		}
		.finish {
			text-decoration: line-through 2px var(--el-color-danger) !important;
		}
	}
}
</style>

<template>
	<!-- <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="Male" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <el-statistic :value="outputValue" :precision="2" :prefix="'￥'" class="card-panel-num" />
          <div class="card-panel-text">
            新增客户（人）
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            实收金额（元）
          </div>
          <el-statistic :value="outputValue" :precision="2" :prefix="'￥'" class="card-panel-num" />
          <count-to :start-val="0" :end-val="outputValue" :prefix="'￥'" :duration="4000" :decimals="2" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待付款金额（元）
          </div>
          <el-statistic :value="outputValue" :precision="2" :prefix="'￥'" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row> -->
	<div>
		<el-card shadow="never" class="about">
			<template #header> 
			<span style=""> 当前时钟 </span>
			<span style="font-size: 12px;color: #999999;"> 更新时间：{{ formatDate(new Date(), 'YYYY-mm-dd HH:MM:SS') }} </span>
		</template>
			<el-space wrap>
				<template v-for="(item, index) in cardInfo">
					<el-col>
						<InfoCard :info="item" class="info-card" />
					</el-col>
				</template>
			</el-space>
		</el-card>

		<!-- <el-row :gutter="20" style="text-align: center;">
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
          <el-statistic title="今日登记" :value="dataObject.todayNewCustomer" :precision="0" class="card-panel-num" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
          <el-statistic title="今日挂号" :value="dataObject.todayRegistration" :precision="0" class="card-panel-num" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
          <el-statistic title="今日回访" :value="dataObject.todayReturnCustomer" :precision="0" class="card-panel-num" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
          <el-statistic title="今日住院" :value="dataObject.todayInHospital" :precision="0" class="card-panel-num" />
        </el-col>
      </el-row>
      <el-row :gutter="20" style="text-align: center;">
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
          <el-statistic title="今日收款" :value="dataObject.todayPayAmount" :precision="2" :prefix="'￥'"
            class="card-panel-num" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
          <el-statistic title="待付款金额" :value="dataObject.todayUnPayAmount" :precision="2" :prefix="'￥'"
            class="card-panel-num" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6" :span="6" style="width:100px;">

        </el-col>
      </el-row>  -->
	</div>
</template>

<script lang="ts">
export default {
	title: '资金汇总',
	icon: 'ele-QuestionFilled',
	description: '',
};
</script>
<script setup lang="ts" name="about">
import { defineAsyncComponent, nextTick, onMounted, reactive, h } from 'vue';
import { ElMessageBox, ElMessage, ElDivider } from 'element-plus';
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { Refresh } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { OrderSummaryApi } from '/@/api-services';
import Decimal from 'decimal.js';
import { addMonthsToDate, formatDate } from '/@/utils/formatTime';

const InfoCard = defineAsyncComponent(() => import('/@/components/cards/infoCard.vue'));

const dataObject = ref<any>({
	todayNewCustomer: 0,
	todayPayAmount: 0.0,
	todayUnPayAmount: 0.0,
	todayRegistration: 0,
	todayReturnCustomer: 0,
	todayInHospital: 0,
});

const cardInfo = ref<any>([]);

const reloadData = async () => {
	await loadNewCustomer();
	await loadPayAmount();
	await loadUnPayAmount();
	await loadRegistration();
	await loadReturnCustomer();
	await loadInHospital();

	cardInfo.value.push({ title: '今日登记', value: dataObject.value.todayNewCustomer, bgColor: '#fff', icon: 'fa fa-question-circle', color: '#000' });
	cardInfo.value.push({ title: '今日挂号', value: dataObject.value.todayRegistration, bgColor: '#fff', icon: 'Memo', color: '#000' });
	cardInfo.value.push({ title: '今日回访', value: dataObject.value.todayReturnCustomer, bgColor: '#fff', icon: 'ele-QuestionFilled', color: '#000' });
	cardInfo.value.push({ title: '今日住院', value: dataObject.value.todayInHospital, bgColor: '#fff', icon: 'ele-QuestionFilled', color: '#000' });
	cardInfo.value.push({ title: '今日收款', value: dataObject.value.todayPayAmount, bgColor: '#fff', icon: 'ele-QuestionFilled', color: '#000' });
	cardInfo.value.push({ title: '待付款金额', value: dataObject.value.todayUnPayAmount, bgColor: '#fff', icon: 'ele-QuestionFilled', color: '#000' });
};

const loadNewCustomer = async () => {
	let result = await getAPI(OrderSummaryApi).apiOrderSummaryTodayNewCustomerGet();
	dataObject.value.todayNewCustomer = result.data.result ?? 0;
};

const loadPayAmount = async () => {
	let result = await getAPI(OrderSummaryApi).apiOrderSummaryTodayPayGet();
	var amount = result.data.result ?? 0;
	dataObject.value.todayPayAmount = new Decimal(amount).toFixed(2);
};

const loadUnPayAmount = async () => {
	let result = await getAPI(OrderSummaryApi).apiOrderSummaryTodayUnPayGet();
	var amount = result.data.result ?? 0;
	dataObject.value.todayUnPayAmount = new Decimal(amount).toFixed(2);
};

const loadRegistration = async () => {
	let result = await getAPI(OrderSummaryApi).apiOrderSummaryTodayRegistrationGet();
	dataObject.value.todayRegistration = result.data.result ?? 0;
};

const loadReturnCustomer = async () => {
	let result = await getAPI(OrderSummaryApi).apiOrderSummaryTodayReturnCustomerGet();
	dataObject.value.todayReturnCustomer = result.data.result ?? 0;
};

const loadInHospital = async () => {
	let result = await getAPI(OrderSummaryApi).apiOrderSummaryTodayInHospitalGet();
	dataObject.value.todayInHospital = result.data.result ?? 0;
};

reloadData();
</script>

<style lang="scss" scoped>
 .about{
  min-height: 120px;
 }
</style>

<template>
	<div class="message-notices-send-message-container">
		<el-card shadow="always">
			<el-row :gutter="15">
				<el-col :span="20">
					<el-card shadow="never" :body-style="{ padding: '0' }">
						<el-form :model="queryParams" ref="queryForm" :inline="true">
							<el-row :gutter="35">
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<el-form-item label="会员名称">
										<el-input v-model="queryParams.name" clearable placeholder="请输入会员名称" />
									</el-form-item>
									<el-form-item label="手机号码">
										<el-input v-model="queryParams.cellPhone" clearable placeholder="请输入手机号码" />
									</el-form-item>

									<el-form-item>
										<el-button-group>
											<el-button type="primary" icon="ele-Search" @click="handleQuery"> 查询 </el-button>
											<el-button icon="ele-Refresh" @click="() => (queryParams = {})"> 重置</el-button>
										</el-button-group>
									</el-form-item>
									<el-form-item>
										<el-button icon="ele-More" circle @click="queryParams.showMore = !queryParams.showMore"></el-button>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="queryParams.showMore">
									<el-form-item label="会员级别">
										<el-checkbox-group v-model="queryParams.memberLevels">
											<el-checkbox v-for="level in memberLevelData" :key="level.id" :label="level.name" :value="level.id" />
										</el-checkbox-group>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-if="queryParams.showMore">
									<el-form-item label="客户来源">
										<el-checkbox-group v-model="queryParams.customerSources">
											<el-checkbox v-for="source in customerSourceData" :key="source.id" :label="source.value" :value="source.code" />
										</el-checkbox-group>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</el-card>
					<el-table ref="tableRef" :data="tableData" :height="'calc(100vh - ' + (queryParams.showMore ? '443' : '275') + 'px)'" v-loading="loading" tooltip-effect="light" row-key="id" border>
						<el-table-column type="selection" width="50" align="center" reserve-selection />
						<el-table-column prop="name" label="会员名称" align="center" />
						<el-table-column prop="cellPhone" label="手机号码" align="center" show-overflow-tooltip="" />
						<el-table-column prop="levelText" label="会员级别" align="center" show-overflow-tooltip="" />
						<el-table-column prop="amount" label="总消费金额" align="center" minWidth="100" show-overflow-tooltip="">
							<template #default="scope">
								<el-text>{{ verifyNumberComma(scope.row.amount.toFixed(2)) || '0.00' }}</el-text>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						v-model:currentPage="tableParams.page"
						v-model:page-size="tableParams.pageSize"
						:total="tableParams.total"
						:page-sizes="[10, 20, 50, 100]"
						background=""
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						layout="total, sizes, prev, pager, next, jumper"
					/>
				</el-col>
				<el-col :span="4">
					<el-form :model="ruleForm" ref="ruleFormRef" label-position="top" :rules="rules">
						<el-row :gutter="30">
							<el-col :span="24">
								<el-form-item label="短信模板" prop="type">
									<el-select v-model="ruleForm.type" size="default" @change="handleSMSTemplateChange">
										<el-option v-for="(item, index) in smsTemplateData" :key="index" :label="item.templateName" :value="item"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24" style="margin-top: 20px">
								<el-form-item label="短信内容" prop="content">
									<el-input size="default" type="textarea" v-model="ruleForm.content" clearable="" maxlength="500" disabled show-word-limit :rows="20" />
								</el-form-item>
							</el-col>
							<el-col :span="24" style="margin-top: 20px">
								<el-text type="danger" size="default">
									温馨提示：模板提示字数仅供参考；短信实际字数会根据应用参数等原因存在差异，以实际发送为准。（短信长度不超过70个字，按照一条短信计费；超过70个字，即为长短信，按照67字/条拆分多条计费）
								</el-text>
							</el-col>
						</el-row>
					</el-form>
					<el-container>
						<el-main>
							<el-button type="primary" round style="width: 100%; height: 50px" size="large" @click="sendMessage">发 送</el-button>
						</el-main>
					</el-container>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="messageNoticesSendMessage">
import { ref } from 'vue';

import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { PcustomerApi, SMSTemplateApi, MemberLevelApi,SysSmsSendApi } from '/@/api-services/api';
import { verifyNumberComma } from '/@/utils/toolsValidate';
import { SysSMSTemplateEnum } from '/@/api-services/models/template-json-manage/sys-smstemplate-enum';
import type { FormRules } from 'element-plus';
import { useUserInfo } from '/@/stores/userInfo';

const stores = useUserInfo();
const dictList = stores.dictList;
const ruleFormRef=ref();
const tableRef = ref();
const queryForm = ref();
const loading = ref(false);
const tableData = ref<any>([]);
const ruleForm = ref<any>({});
const queryParams = ref<any>({
	name: '',
	cellPhone: '',
	memberLevels: [],
	customerSources: [],
	showMore: false,
});
const tableParams = ref({
	page: 1,
	pageSize: 20,
	total: 0 as any,
});
const smsTemplateData = ref<any>([]);
const memberLevelData = ref<any>([]);
const customerSourceData = ref<any>([]);

//自行删除非必填规则
const rules = ref<FormRules>({
	type: [{ required: true, message: '请选择要发送的短信模板！', trigger: 'change' }],
	content: [{ required: true, message: '发送的短信内容不能为空！', trigger: 'blur' }],
});
/**
 * 加载基础数据
 */
const loadBaseSearchData = async () => {
	await getAPI(MemberLevelApi)
		.apiMemberLevelListPost({})
		.then((res) => {
			memberLevelData.value = res.data.result ?? [];
		});
	customerSourceData.value = dictList['code_customer_source'];
	queryParams.value.memberLevels = memberLevelData.value.map((item: any) => item.id);
	queryParams.value.customerSources = customerSourceData.value.map((item: any) => item.code);
};

/**
 * 发送短信
 */
const sendMessage = async () => {
	let selectionRows=tableRef.value.getSelectionRows();
	if(selectionRows.length==0){
		ElMessage.error("请选择要发送短信的客户！");
		return;
	}
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			await getAPI(SysSmsSendApi).apiSysSmsSendSendPromotionSmsPost({
				mobiles:selectionRows.map((item: any) => item.cellPhone),
				content: ruleForm.value.content,
			}).then((res) => {
				ElMessage.success('发送成功！');
			});
		}
	});
};
/**
 * 推广短信模板变更事件
 */
const handleSMSTemplateChange = (val: any) => {
	ruleForm.value.content = val.content;
};
/**
 * 加载短信模板
 */
const loadSMSTemplate = async () => {
	await getAPI(SMSTemplateApi)
		.apiSMSTemplateGetTemplateByTypePost({ type: SysSMSTemplateEnum.NUMBER_2 })
		.then((res) => {
			smsTemplateData.value = res.data.result ?? [];
		});
};

// 查询操作
const handleQuery = async () => {
	loading.value = true;
	var res = await getAPI(PcustomerApi).apiPcustomerGetCustomersForSmsPost(Object.assign(queryParams.value, tableParams.value));
	tableData.value = res.data.result?.items ?? [];
	tableParams.value.total = res.data.result?.total;
	loading.value = false;
};

// 改变页面容量
const handleSizeChange = (val: number) => {
	tableParams.value.pageSize = val;
	handleQuery();
};

// 改变页码序号
const handleCurrentChange = (val: number) => {
	tableParams.value.page = val;
	handleQuery();
};

handleQuery();
loadSMSTemplate();
loadBaseSearchData();
</script>

<style lang="scss" scoped>
.message-notices-send-message-container {
}
</style>

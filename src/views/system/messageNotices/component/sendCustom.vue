<template>
	<div class="message-notices-send-custom-container">
		<el-card shadow="always" style="height: calc(100vh - 20px)">
			<el-form :model="ruleForm" ref="ruleFormRef" label-position="top" :rules="rules">
				<el-row :gutter="30">
					<el-col :span="24">
						<el-form-item prop="cellPhones">
							<template #label>
								手机号码：
								<el-text type="danger" size="default" tag="b">(多个号码之间用英文逗号隔开 例如：166XXXXXXXX,188XXXXXXXX)</el-text>
							</template>
							<el-input size="default" type="textarea" v-model="ruleForm.cellPhones" clearable="" maxlength="2000" show-word-limit :rows="10" />
						</el-form-item>
					</el-col>
					<el-col :span="24" style="margin-top: 20px">
						<el-form-item label="短信内容" prop="content">
							<el-input size="default" type="textarea" v-model="ruleForm.content" clearable="" maxlength="500" show-word-limit :rows="10" />
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
				<el-main style="text-align: center">
					<el-button type="primary" round style="width: 30%; height: 50px" size="large" @click="sendMessage">发 送</el-button>
				</el-main>
			</el-container>
		</el-card>
	</div>
</template>

<script lang="ts" setup name="messageNoticesSendCustom">
import { ref, onMounted } from 'vue';
import { verifyPhone } from '/@/utils/toolsValidate';
import type { FormRules } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysSmsSendApi } from '/@/api-services/api';
import { ElMessage } from 'element-plus';

const ruleFormRef = ref();
const ruleForm = ref<any>({
	cellPhones: '',
	content: '',
});

const checkPhoneNumbers = (rule: any, value: any, callback: any) => {
	if (!value) {
		return callback(new Error('请输入要发送的手机号码'));
	}
	const phoneNumbers = ruleForm.value.cellPhones.split(',');
	for (const phoneNumber of phoneNumbers) {
		if (!verifyPhone(phoneNumber)) {
			callback(new Error('手机号码格式不正确'));
		}
	}
	callback();
};
//自行删除非必填规则
const rules = ref<FormRules>({
	cellPhones: [{ validator: checkPhoneNumbers, trigger: 'blur' }],
	content: [{ required: true, message: '请输入要发送的短信内容！', trigger: 'blur' }],
});

const sendMessage = () => {
	console.log('发送');
	ruleFormRef.value.validate(async (isValid: boolean, fields?: any) => {
		if (isValid) {
			await getAPI(SysSmsSendApi).apiSysSmsSendSendPromotionSmsPost({
				mobiles:ruleForm.value.cellPhones.split(','),
				content: ruleForm.value.content,
			}).then((res) => {
				ElMessage.success('发送成功！');
			});
		}
	});
};

// 页面加载时
onMounted(async () => {});
</script>

<template>
	<el-card class="inOroutCard" shadow="always">
		<template #header>
			<div style="justify-content: space-between; display: flex; background-color: #6a8aff; color: white; align-items: center">
				<div style="align-items: center; display: flex; line-height: 16px">
					<div>
						<el-image style="width: 20px; height: 20px; margin: 5px" src="src/assets/in-hospitals/jiyang.png" fit="fill" />
					</div>
					<div>
						<el-text>{{ props?.item?.roomName }}</el-text>
						<!-- <el-tooltip effect="dark" content="负责人" placement="top"> -->
						<el-link @click="openRooms(props.item)" type="warning">[更换笼位]</el-link>
						<!-- </el-tooltip> -->
					</div>
					<!-- <div style="margin-left: 10px">
						<el-tooltip effect="dark" content="住院时间" placement="top">
							<el-text>{{ formatDate(new Date(props?.item?.startTime), 'YYYY-mm-dd') }}</el-text>
						</el-tooltip>
					</div> -->
				</div>
				<div>
					<div style="justify-content: flex-start; display: flex">
						<div style="margin-left: 10px"></div>

						<div style="margin-left: 10px"></div>

						<div>
							<el-button type="success" style="height: 25px; font-size: 12px; margin-right: 10px" round plain @click="outHospital(props.item)">留观出院</el-button>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template #default>
			<el-row>
				<el-col :span="6">
					<el-avatar v-if="props?.item?.petImageUrl" :size="60" style="background-color: white" shape="square" :src="props?.item?.petImageUrl" />
					<el-avatar v-else :size="60" style="background-color: white" shape="square" src="src/assets/in-hospitals/animal.png" />
				</el-col>
				<el-col :span="18">
					<el-row :gutter="10" style="margin-bottom: 5px">
						<!-- <el-col :span="24">
							<el-text style="font-weight: 800; font-size: 18px">{{ props?.item?.customerName }}</el-text>
							<el-tag type="success" size="small" style="margin-left: 5px; margin-right: 5px" effect="dark">{{ props?.item?.levelText }}</el-tag>
							<el-tag type="primary" size="small">{{ props?.item?.cellPhone }}</el-tag>
						</el-col> -->
						<el-col :span="24">
							<el-text style="font-weight: 800; font-size: 18px">{{ props?.item?.customerName }}</el-text>
							<el-tag type="success" size="small" style="margin-left: 5px;" effect="dark">{{ props?.item?.levelText }}</el-tag>
						</el-col>
						<el-col style="margin-top: 2px;">
							<el-tag type="primary" size="small">{{ props?.item?.cellPhone }}</el-tag>
						</el-col>
					</el-row>
					<el-row :gutter="10" style="margin-bottom: 5px">
						<el-col :span="24">
							<el-breadcrumb separator="\" style="font-size: 12px">
								<el-breadcrumb-item>{{ props?.item?.petName ?? '-' }}</el-breadcrumb-item>
								<el-breadcrumb-item>
									<el-text truncated :title="props?.item?.petKindText">{{ props?.item?.petKindText ?? '-' }}</el-text>
								</el-breadcrumb-item>
								<el-breadcrumb-item truncated :title="props?.item?.petVarietieText">{{ props?.item?.petVarietieText ?? '-' }}</el-breadcrumb-item>
							</el-breadcrumb>
						</el-col>
					</el-row>
					<el-row :gutter="10">
						<el-col :span="24">
							<el-tag type="warning" size="small">{{ formatAge(props?.item?.petBirthDate) }}</el-tag>
							<el-tag type="primary" style="margin-left: 5px" size="small">{{ props?.item?.petWeight }}Kg</el-tag>
						</el-col>
						<!-- <el-col :span="8">{{ props.item.petKindText }}</el-col>
										<el-col :span="8">{{ props.item.petVarietieText }}</el-col> -->
					</el-row>
				</el-col>
			</el-row>
			<el-row style="font-size: 12px; margin-top: 10px" align="middle">
				<el-col :span="12">
					<el-text truncated style="font-size: 12px"> 入住时间： </el-text>
					<el-text truncated style="font-size: 12px">{{ formatDate(new Date(props?.item?.startTime), 'YYYY-mm-dd') }}</el-text>
					<el-text tag="mark" truncated style="font-size: 12px; margin-left: 10px">{{ calculateDaysBetweenDates(new Date(props?.item?.startTime), new Date()) }}天</el-text>
				</el-col>
				<el-col :span="12">
					<el-text truncated style="font-size: 12px"> 待结金额： </el-text>
					<el-text truncated style="font-size: 14px">{{ verifyNumberComma(props?.item?.totalAmount ?? 0) }}</el-text>
				</el-col>
			</el-row>
			<el-row style="font-size: 12px; margin-top: 5px" align="middle">
				<el-col :span="12">
					<el-text truncated style="font-size: 12px"> 护理人： </el-text>
					<el-text truncated style="font-size: 12px">{{ props?.item?.headName }}</el-text>
				</el-col>
				<!-- <el-col :span="12"> 
									<el-text truncated style="font-size: 12px;"> 负责人： </el-text>
									<el-text truncated style="font-size: 12px;">{{ formatDate(new Date(props?.item?.startTime),'YYYY-mm-dd') }}</el-text> 
								</el-col>  -->
			</el-row>
		</template>
		<template #footer>
			<el-row :gutter="10">
				<!-- <el-col :span="4">
									<div class="item-footer-class" @click="openPrescription(props.item)">
										<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/chufang.png" />
										<div><el-text>处方</el-text></div>
									</div>
								</el-col>
								<el-col :span="4">
									<div class="item-footer-class" @click="openTests(props.item)">
										<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/huayan.png" />
										<div><el-text>化验</el-text></div>
									</div>
								</el-col> -->
				<el-col :span="6">
					<div class="item-footer-class" @click="openRooms(props.item)">
						<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/longweiguanli.png" />
						<div><el-text>更换笼位</el-text></div>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="item-footer-class" @click="openNurses(props.item)">
						<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/huli.png" />
						<div><el-text>护理项目</el-text></div>
					</div>
				</el-col>
				<!-- <el-col :span="4">
									<div class="item-footer-class" @click="openRooms(props.item)">
										<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/longweiguanli.png" />
										<div><el-text>笼位</el-text></div>
									</div>
								</el-col> -->
				<el-col :span="6">
					<div class="item-footer-class" @click="openDays(props.item)">
						<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/richangjiandu.png" />
						<div><el-text>日常记录</el-text></div>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="item-footer-class" @click="outHospital(props.item)" v-loading="item?.outHospitalLoading">
						<el-avatar :size="25" style="background-color: white" shape="square" src="src/assets/in-hospitals/chuyuan.png" />
						<div><el-text>留观出院</el-text></div>
					</div>
				</el-col>
				<!-- <el-col :span="5">
									<div class="item-footer-class" @click="outHospital(props.item)" v-loading="item?.outHospitalLoading">
										<el-avatar :size="28" style="background-color: white" shape="square" src="src/assets/in-hospitals/chuyuan.png" />
										<div><el-text>结束留观</el-text></div>
									</div>
								</el-col> -->
			</el-row>
		</template>
	</el-card>
</template>

<script lang="ts" setup name="inHospital-nurseView">
import { ref, onMounted } from 'vue';
import { formatDate, formatAge, calculateDaysBetweenDates } from '/@/utils/formatTime';
import { verifyNumberComma } from '/@/utils/toolsValidate';
var props = defineProps({
	item: {
		type: Object,
		default: () => {},
	},
});
//父级传递来的函数，用于回调
const emit = defineEmits(['openPrescription', 'openTests', 'openNurses', 'openRooms', 'openDays', 'outHospital']);
//处方
const openPrescription = (row) => {
	emit('openPrescription', row);
};

//化验
const openTests = (row) => {
	emit('openTests', row);
};

//护理
const openNurses = (row) => {
	emit('openNurses', row);
};

//笼位
const openRooms = (row) => {
	emit('openRooms', row);
};

//日常
const openDays = (row) => {
	emit('openDays', row);
};

//出院
const outHospital = (row) => {
	emit('outHospital', row);
};

// 页面加载时
onMounted(async () => {});
//将属性或者函数暴露给父组件
defineExpose({});
</script>

<style lang="scss" scoped>
.inOroutCard {
	min-width: 380px;
	:deep(.el-card__header) {
		padding: 0px !important;
		.el-text {
			color: #ffffff;
			margin-right: 5px;
		}
	}
	:deep(.el-card__body) {
		padding: 10px;
	}
	:deep(.el-card__footer) {
		height: 68px;
		padding: 4px 4px !important;
		.item-footer-class {
			text-align: center;
			cursor: pointer;
			padding: 5px 5px !important;
		}
		.item-footer-class:hover {
			box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
		}
	}
}
</style>

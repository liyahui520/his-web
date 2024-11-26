<template>
	<div class="secondary-cards-container">
		<el-card shadow="always" style="height: calc(100vh)">
			<div class="secondary-cards-can-title">
				<div class="can-card-title">
					<div class="can-card-title-left"></div>
					<el-space alignment="flex-start">
						可用次卡
						<el-button circle @click="handleEnabledQuery">
							<el-icon>
								<RefreshRight />
							</el-icon>
						</el-button>
						<el-button type="primary" @click="openAddSecondaryCards" icon="ele-Plus" style="margin-left: 30px">新增次卡</el-button>
					</el-space>
				</div>
			</div>
			<div class="secondary-cards-content" v-loading="canLoading">
				<el-card v-for="(card, index) in cards" :key="index" class="box-card">
					<template #header>
						<div class="card-header">
							<el-row>
								<el-col :span="18">
									<el-tooltip :content="card.name" placement="top" effect="light">
										<el-text tag="b" size="large" truncated>{{ card.name }}</el-text>
									</el-tooltip>
								</el-col>
								<el-col :span="6" style="text-align: end">
									<el-text type="primary" size="default">￥{{ twoFloorNum(card.salePrice) }}</el-text>
								</el-col>
							</el-row>
						</div>
					</template>
					<template #default>
						<div class="card-content">
							<el-text
								>项目：<span v-for="(cardItem, index) in card.secondaryCardItems" :key="index">【{{ cardItem.productName }}】</span></el-text
							>
						</div>
					</template>
					<template #footer>
						<div class="card-footer">
							<el-row style="margin-bottom: 5px; margin-top: -5px">
								<el-col :span="19">
									<el-text size="default" style="margin-right: 5px">有效期至：{{ formatDate(new Date(card.endTime), 'YYYY-mm-dd') }}</el-text>
								</el-col>
								<el-col :span="5">
									<el-text size="default">次数：{{ card.totalCount }}</el-text>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="19">
									<el-button v-if="card.haveCustomerCount > 0" type="info" size="default" link @click="handleHaveCardMemberClick(card)"> 持卡客户：{{ card.haveCustomerCount }} </el-button>
									<el-text size="default" v-else style="margin-right: 5px">持卡客户：0</el-text>
								</el-col>
								<el-col :span="5">
									<el-button type="info" link @click="openEditSecondaryCards(card)">
										详情
										<el-icon class="el-icon--right">
											<ArrowRight />
										</el-icon>
									</el-button>
								</el-col>
							</el-row>
						</div>
					</template>
				</el-card>
			</div>
			<div class="secondary-cards-can-title">
				<div class="can-card-title">
					<div class="can-card-title-left"></div>
					<el-space alignment="flex-start">
						不可用次卡
						<el-button circle @click="handleDisableQuery">
							<el-icon>
								<RefreshRight />
							</el-icon>
						</el-button>
					</el-space>
				</div>
			</div>
			<div class="secondary-cards-disable-content" v-loading="disableLoading">
				<div class="box-card">
					<el-watermark
						v-for="(card, index) in disableCards"
						:key="index"
						:width="80"
						:height="80"
						style="margin-right: 20px"
						:image="card.status == 1 ? 'src/assets/secondcards/disable.png' : 'src/assets/secondcards/overdue.png'"
					>
						<el-card>
							<template #header>
								<div class="card-header">
									<el-row>
										<el-col :span="18">
											<el-tooltip :content="card.name" placement="top" effect="light">
												<el-text tag="b" size="large" truncated>{{ card.name }}</el-text>
											</el-tooltip>
										</el-col>
										<el-col :span="6" style="text-align: end">
											<el-text type="primary" size="default">￥{{ twoFloorNum(card.salePrice) }}</el-text>
										</el-col>
									</el-row>
								</div>
							</template>
							<template #default>
								<div class="card-content">
									<el-text
										>项目：<span v-for="(cardItem, index) in card.secondaryCardItems" :key="index">【{{ cardItem.productName }}】</span></el-text
									>
								</div>
							</template>
							<template #footer>
								<div class="card-footer">
									<el-row style="margin-bottom: 5px; margin-top: -5px">
										<el-col :span="19">
											<el-text size="default" style="margin-right: 5px">有效期至：{{ formatDate(new Date(card.endTime), 'YYYY-mm-dd') }}</el-text>
										</el-col>
										<el-col :span="5">
											<el-text size="default">次数：{{ card.totalCount }}</el-text>
										</el-col>
									</el-row>
									<el-row>
										<el-col :span="19">
											<el-button v-if="card.haveCustomerCount > 0" type="info" size="default" link @click="handleHaveCardMemberClick(card)"> 持卡客户：{{ card.haveCustomerCount }} </el-button>
											<el-text size="default" v-else style="margin-right: 5px">持卡客户：0</el-text>
										</el-col>
										<el-col :span="5">
											<el-button type="info" link @click="openEditSecondaryCards(card)">
												详情
												<el-icon class="el-icon--right">
													<ArrowRight />
												</el-icon>
											</el-button>
										</el-col>
									</el-row>
								</div>
							</template>
						</el-card>
					</el-watermark>
				</div>
			</div>
		</el-card>

		<editDialog ref="editDialogRef" :title="editTitle" @reloadTable="reloadData" />
		<haveCardCustomer ref="haveCardCustomerRef" :title="'持卡客户'" />
	</div>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, toRaw } from 'vue';
import editDialog from '/@/views/products/secondaryCards/component/editDialog.vue';
import haveCardCustomer from '/@/views/products/secondaryCards/component/haveCardCustomer.vue';
import { RefreshRight, ArrowRight, Switch } from '@element-plus/icons-vue';
import { getAPI } from '/@/utils/axios-utils';
import { SecondaryCardsApi } from '/@/api-services/api';
import { formatDate } from '/@/utils/formatTime';
import commonFunction from '/@/utils/commonFunction';
import { addYearsToDate } from '/@/utils/formatTime';
import { MemberCardStatusEnum } from '/@/api-services/models/card-manage';

const haveCardCustomerRef = ref();
const editDialogRef = ref();
const { twoFloorNum } = commonFunction();
const canLoading = ref(false);
const disableLoading = ref(false);
//父级传递来的函数，用于回调
const emit = defineEmits(['reloadTable']);
const editTitle = ref('编辑次卡');
const cards = ref<any>([]);
const disableCards = ref<any>([]);

const reloadData = async () => {
	await handleEnabledQuery();
	await handleDisableQuery();
};
/**
 * 查询所有可用次卡操作
 */
const handleEnabledQuery = async () => {
	canLoading.value = true;
	var res = await getAPI(SecondaryCardsApi).apiSecondaryCardsListGet();
	cards.value = res.data.result ?? [];
	canLoading.value = false;
};

/**
 * 查询所有不可用次卡操作
 */
const handleDisableQuery = async () => {
	disableLoading.value = true;
	var res = await getAPI(SecondaryCardsApi).apiDisableSecondaryCardsListGet();
	disableCards.value = res.data.result ?? [];
	disableLoading.value = false;
};
/**
 * 持卡客户
 * @param data
 */
const handleHaveCardMemberClick = (data: any) => {
	haveCardCustomerRef.value.openDialog({ cardId: data.id });
};

// 打开新增页面
const openAddSecondaryCards = () => {
	editTitle.value = '新增次卡';
	editDialogRef.value.openDialog({
		name: '',
		cardNumber: '',
		endTime: addYearsToDate(new Date(), 1),
		status: MemberCardStatusEnum.NUMBER_0,
		principalCount: 1,
		giftCount: 0,
		salePrice: 0,
		memberPrice: 0,
		remark: '',
		secondaryCardItems: [],
	});
};

// 打开编辑页面
const openEditSecondaryCards = (row: any) => {
	editTitle.value = '编辑次卡';
	let rowInfo = toRaw({ ...row });
	editDialogRef.value.openDialog(rowInfo);
};

handleEnabledQuery();
handleDisableQuery();
</script>
<style scoped lang="scss">
.layout-parent {
	.secondary-cards-container {
		.secondary-cards-can-title {
			.can-card-title {
				display: flex;
				line-height: 24px;
				margin-bottom: 20px;

				.can-card-title-left {
					width: 6px;
					height: 24px;
					background-color: var(--el-color-primary);
					margin-right: 20px;
				}
			}
		}

		.secondary-cards-content {
			display: flex !important;
			flex-direction: row !important;
			flex-wrap: wrap;
			background-color: transparent;
			min-height: 300px;
			.box-card {
				width: 400px;
				height: 240px !important;
				margin-bottom: 20px;
				margin-right: 20px;
				--el-card-bg-color: var(--el-fill-color-blank);

				.card-header {
					height: 10px;
				}

				.card-content {
					width: 100%;
					height: 90px;

					.el-text--small {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 5;
						line-height: 20px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				:deep(.el-card__footer) {
					background-color: rgba(255, 255, 255, 0);
					padding: 0;
					width: 100%;

					.card-footer {
						padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
						background-size: cover;
						background: var(--el-color-primary);

						.el-text {
							color: aliceblue;
						}

						.el-button > span {
							color: aliceblue;
						}
					}
				}
			}
		}

		.secondary-cards-disable-content {
			display: flex !important;
			flex-direction: row !important;
			flex-wrap: wrap;

			.box-card {
				display: flex;
				--el-card-bg-color: var(--el-fill-color-blank);

				.el-card {
					width: 400px;
					height: 240px !important;
				}

				.card-header {
					height: 10px;
				}

				.card-content {
					width: 100%;
					height: 90px;

					.el-text--small {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 5;
						line-height: 20px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				:deep(.el-card__footer) {
					background-color: rgba(255, 255, 255, 0);
					padding: 0;
					width: 100%;

					.card-footer {
						padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
						background: #bfbfbf;
						background-size: cover;

						.el-text {
							color: var(--el-text-color-primary);
						}

						.el-button > span {
							color: var(--el-text-color-primary);
						}
					}
				}
			}
		}
	}
}
</style>

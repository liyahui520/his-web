
<template>
    <div class="bar-chart">
        <el-row class="bar-row">
            <el-col :span="8">
                <div v-if="resultInLeft" class="bar-result-value-left" :style="{ marginLeft: resultShiftingLocal + '%' }"></div>
            </el-col>
            <el-col class="bar-center" :span="8">
                <div v-if="resultInCenter" class="bar-result-value-center" :style="{ marginLeft: resultShiftingLocal + '%' }">
                </div>
            </el-col>
            <el-col :span="8">
                <div v-if="resultInRight" class="bar-result-value-right" :style="{ marginLeft: resultShiftingLocal + '%' }"></div>
            </el-col>
        </el-row>
    </div>
</template>
  
<script lang="ts" setup name="laboratorysVerticalResultValue">
import { computed } from "vue";

//父级传递来的参数
var props = defineProps({
    maxValue: {
        type: Number,
        required: true,
    },
    minValue: {
        type: Number,
        required: true,
    },
    resultValue: {
        type: Number,
        required: true,
    }
});
const resultInLeft = computed(() => {
    return props.resultValue < props.minValue;
})
const resultInCenter = computed(() => {
    return props.resultValue >= props.minValue && props.resultValue <= props.maxValue;
})
const resultInRight = computed(() => {
    return props.resultValue > props.maxValue;
})
//计算结果的偏移量
const resultShiftingLocal = computed(() => {
    //第一种如果小于最小值
    if (props.resultValue < props.minValue) {
        const shiftingProportion = (props.minValue - props.resultValue) / (props.maxValue - props.minValue);
        return shiftingProportion > 1 ? 0 : (1 - shiftingProportion) >= 0.95 ? 95 : (1 - shiftingProportion) * 100;
    }
    else if (props.resultValue >= props.minValue && props.resultValue <= props.maxValue) {
        const shiftingProportion = props.resultValue / (props.maxValue - props.minValue) * 100
        return shiftingProportion;
    }
    else if (props.resultValue > props.maxValue) {
        const shiftingProportion = (props.resultValue - props.maxValue) / (props.maxValue - props.minValue);
        return shiftingProportion > 1 ? 95 : shiftingProportion * 100;
    }
});

</script>
  
<style scoped lang="scss">
.bar-row {
    height: 20px;
    border: solid 1px #ccc;
    
    .bar-center {
        border-left: solid 2px #ccc;
        border-right: solid 2px #ccc;

    }

    .bar-result-value-left {
        width: 5%;
        background-color: #909399;
        /* 结果值条形的颜色 */
        height: 100%;
    }
    .bar-result-value-center {
        width: 5%;
        background-color: #67C23A;
        /* 结果值条形的颜色 */
        height: 100%;
    }
    .bar-result-value-right {
        width: 5%;
        background-color: #F56C6C;
        /* 结果值条形的颜色 */
        height: 100%;
    }
}
</style>
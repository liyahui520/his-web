<template>
    <div class="segmented-bar">
        <el-row class="bar-row" :gutter="10">
            <el-col :span="8">
                <div class="par-class">
                    <div class="segment" v-for="(item, index) in segments" :key="index + 'Left'"
                        :class="{ 'highlight-left': resultInLeft ? item.highlight : false }"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="par-class">
                    <div class="segment" v-for="(item, index) in segments" :key="index + 'Center'"
                        :class="{ 'highlight-center': resultInCenter ? item.highlight : false }"></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="par-class">
                    <div class="segment" v-for="(item, index) in segments" :key="index + 'Right'"
                        :class="{ 'highlight-right': resultInRight ? item.highlight : false }"></div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>
  
<script lang="ts" setup name="laboratorysSlashResultValue">
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


const segments = computed(() => {
    const totalSegments = 5; // 总段数，根据需要调整
    if (props.resultValue < props.minValue) {
        const segmentRange = (props.maxValue - props.minValue) / totalSegments;
        const resultSegmentIndex = totalSegments - Math.floor((props.minValue - props.resultValue) / segmentRange) - 1;
        const resultSegmentIndexTwo = resultSegmentIndex < 0 ? 0 : resultSegmentIndex;
        return Array.from({ length: totalSegments }, (_, index) => ({
            id: index,
            highlight: index === resultSegmentIndexTwo
        }));
    }
    else if (props.resultValue >= props.minValue && props.resultValue <= props.maxValue) {
        const segmentRange = (props.maxValue - props.minValue) / totalSegments;
        const resultSegmentIndex = parseInt((props.resultValue - props.minValue) / segmentRange)
        const resultSegmentIndexTwo = resultSegmentIndex == 5 ? 4 : resultSegmentIndex;
        return Array.from({ length: totalSegments }, (_, index) => ({
            id: index,
            highlight: index === resultSegmentIndexTwo
        }));
    }
    else if (props.resultValue > props.maxValue) {
        const segmentRange = (props.maxValue - props.minValue) / totalSegments;
        const resultSegmentIndex = Math.floor((props.resultValue - props.maxValue) / segmentRange)
        console.log(resultSegmentIndex)
        const resultSegmentIndexTwo = resultSegmentIndex >= 4 ? 4 : resultSegmentIndex;
        return Array.from({ length: totalSegments }, (_, index) => ({
            id: index,
            highlight: index === resultSegmentIndexTwo
        }));
    }
})


</script>
  
<style scoped lang="scss">
.segmented-bar {
    .bar-row {
        height: 20px;

        .par-class {
            border:solid 1px #ccc;
            display:flex;
            background-color:#E4E1E1;
        }

        .segment {
            /* 调整间隔 */
            background-color: #ABA9A9;
            margin-left: 1%;
            margin-right: 1%;
            padding-top: 2px;
            padding-bottom: 2px;
            height: 30px;
            width: 18%;
            justify-content: space-between;
            align-items: center;
            transform: rotate(-5deg);
        }

        .highlight-left {
            background-color: black;
            /* 突出显示的段颜色 */
        }

        .highlight-center {
            background-color: #67C23A;
            /* 突出显示的段颜色 */
        }

        .highlight-right {
            background-color: #F56C6C;
            /* 突出显示的段颜色 */
        }
    }
}

</style>
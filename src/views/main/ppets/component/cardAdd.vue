<template>
    <el-card class="box-card" style="width:380px;height: 150px;border-radius: 15px;" :body-style="{ padding: '0px' }">
        <el-row :gutter="10" style="padding: 0px">
            <el-col :span="24" style="padding: 0px">
                <el-button @click="AddPet" color="var(--el-color-primary-light-5)" plain icon="el-icon-plus"  style="width: 100%;height: 150px;font-size: 18px;font-weight: bold;border: none">添加宠物
                </el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup name="cardAdd">
    const emit = defineEmits(["AddPetDialog"]);
    /**
     * 新增宠物
     * @constructor
     */
    const AddPet = async ()=>{
        emit("AddPetDialog");
    }

</script>

<style scoped>




</style>
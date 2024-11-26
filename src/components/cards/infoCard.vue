<template>
    <div class="info-card-container">
      <div class="top" >
        <div>{{ info.title }}</div>
        <div>
          <el-tooltip class="item" effect="light" :content="info.iconTip" placement="top">
            <i class="fa fa-question-circle" style="font-size:14px;margin-left:5px;color:#CCCCCCFF;" />
          </el-tooltip>
        </div>
      </div>
      <div class="bottom" >
        <div>{{ info.value }}</div>
        <div class="icon-div" :style="{'background-color':info.bgColor}"><i :class="[info.icon]" :style="{'font-size':'20px',color:info.color}" /></div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name="addCard">

//父级传递来的参数
var props = defineProps({
    info: {
        type: Object,
        default() { }
  },
});

//   export default {
//     data() {
//       return  {
//         windowWidth: document.documentElement.clientWidth,
//         isMinScreeen:false,
//       }
//     },
//     props: {
//       info: {
//         type: Object,
//         default() { }
//       }
//     },
  
//     created(){
  
//       if(this.windowWidth<1800){
//         this.isMinScreeen = true
//       }
//     }
//   }
  </script>
  
  <style lang="scss" scoped>
  .info-card-container{
      background-color: white;
      border-radius: 20px;
      padding: 20px 24px;
      min-width: 240px;
      width: 240px;
      .top{
        
          display: flex;
          justify-content: space-between;
          color: #333333 ;
          // ::v-deep .el-tooltip__popper.is-dark {
          //     color: rgba(0, 0, 0, 0.45);
          //     font-size: 14px;
          //     background-color: rgba(0, 0, 0, 0.08);;
          // }
      }
      .min-top{
        line-height: 16px;
        font-size: 14px;
      }
      
      .bottom{
          display: flex;
          font-size: 30px;
          margin-top: 5px;
          font-family: HelveticaNeue;
          color: rgba(0, 0, 0, 0.85);
          justify-content: space-between;
          .icon-div{
            width: 38px;
            height: 38px;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
      }
      .min-bottom{
        font-size: 28px;
      }
  }
  </style>
  
// 打印数据
import logoImg from '/@/assets/logo.png';
export default {
    title: '检验报告单',  //化验单表头 可为空
    orderNo: 'R00000001', //化验单号
    createTime: '2023-10-01 08:00',  //化验单检查时间
    orgName: '测试医院',//医院名称
    orgAddress:'上海市嘉定区', //医院地址
    orgImg:logoImg, //医院logo
    customerName:'张三',  //用户名称
    cellPhone:'18888888888', //用户手机号
    sex:'男',  //用户性别
    petName:'木子',  //宠物名称
    petOrder:'B00000001',  //宠物病历号
    petZL:'猫',  //宠物品种
    petSex:'雌',  //宠物性别
    petPZ:'短尾猫',  //宠物种类
    petAge:'1年10月', //宠物年龄
    petWeight:'2.6Kg', //宠物体重
    petColor:'红色',  //宠物毛色
    doctorName:'李医生',  //检查医生
    doctorPhone:'17777777777',  //检查医生电话
    orgPhone:'021-25639281',  //医院电话
    //检查结果
    testItems: [
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:0 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:40 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:50 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:80 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:-100 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:500 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:20 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
        { name: '测试商品01', unitName: '盒',maxValue:100,minValue:10,resultValue:30 },
    ],
    //暂不使用
    InspectionTestDataProviderRemark:[
        {name:'FIO2',remark:'吸入氧浓度'}
    ]
};

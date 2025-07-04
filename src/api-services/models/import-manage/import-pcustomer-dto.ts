/* tslint:disable */
/* eslint-disable */
/**
 * 数据导出
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 导入宠主宠物数据Dto  IsLabelingError：是否标注数据错误
 *
 * @export
 * @interface ImportPcustomerDto
 */
export interface ImportPcustomerDto {

    /**
     * 会员编号
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    cardNumber?: string | null;

    /**
     * 会员名称
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    name: string;

    /**
     * 会员名称拼音
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    fullNamePinyin?: string | null;

    /**
     * 手机号
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    cellPhone: string;

    /**
     * 会员级别别名
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    levelText?: string | null;

    /**
     * 会员级别
     *
     * @type {number}
     * @memberof ImportPcustomerDto
     */
    level?: number;

    /**
     * 客户来源别名
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    sourceText?: string | null;

    /**
     * 客户来源
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    sourceId?: string | null;

    /**
     * 是否散客
     *
     * @type {boolean}
     * @memberof ImportPcustomerDto
     */
    isScattered?: boolean;

    /**
     * 电话
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    phone?: string | null;

    /**
     * 性别
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    sex: string;

    /**
     * 性别别名
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    sexText?: string | null;

    /**
     * 生日
     *
     * @type {Date}
     * @memberof ImportPcustomerDto
     */
    birthdate?: Date | null;

    /**
     * 病历号码
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petRecordNumber?: string | null;

    /**
     * 宠物名称
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petName: string;

    /**
     * 性别 (0 公 1 母 2 未知)
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petGender: string;

    /**
     * 性别 (公 母 未知)
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petGenderText?: string | null;

    /**
     * 生日
     *
     * @type {Date}
     * @memberof ImportPcustomerDto
     */
    petBirthDate?: Date | null;

    /**
     * 宠物种类
     *
     * @type {number}
     * @memberof ImportPcustomerDto
     */
    petKind?: number;

    /**
     * 宠物种类别名
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petKindText?: string | null;

    /**
     * 宠物品种别名
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petVarietieText?: string | null;

    /**
     * 宠物品种
     *
     * @type {number}
     * @memberof ImportPcustomerDto
     */
    petVarietie?: number | null;

    /**
     * 宠物毛色别名
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petColorText?: string | null;

    /**
     * 宠物毛色
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petColor?: string | null;

    /**
     * 宠物体重
     *
     * @type {number}
     * @memberof ImportPcustomerDto
     */
    petWeight?: number | null;

    /**
     * 宠物状态 默认饲养中
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petStatus?: string | null;

    /**
     * 宠物状态 默认饲养中
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petStatusText?: string | null;

    /**
     * 宠物备注
     *
     * @type {string}
     * @memberof ImportPcustomerDto
     */
    petRemark?: string | null;
}

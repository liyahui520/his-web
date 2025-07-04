/* tslint:disable */
/* eslint-disable */
/**
 * 检查项目
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 分页查询参数
 * @export
 * @interface ProductInspectionInput
 */
export interface ProductInspectionInput {
    /**
     * 创建时间
     * @type {Date}
     * @memberof ProductInspectionInput
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof ProductInspectionInput
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof ProductInspectionInput
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof ProductInspectionInput
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof ProductInspectionInput
     */
    isDelete?: boolean;
    /**
     * 版本标识
     * @type {string}
     * @memberof ProductInspectionInput
     */
    ver?: string | null;
    /**
     * 创建者部门名称
     * @type {string}
     * @memberof ProductInspectionInput
     */
    createOrgName?: string | null;
    /**
     * 修改者姓名
     * @type {string}
     * @memberof ProductInspectionInput
     */
    updateUserName?: string | null;
    /**
     * 创建者姓名
     * @type {string}
     * @memberof ProductInspectionInput
     */
    createUserName?: string | null;
    /**
     * 当前页码
     * @type {number}
     * @memberof ProductInspectionInput
     */
    page?: number;
    /**
     * 页码容量
     * @type {number}
     * @memberof ProductInspectionInput
     */
    pageSize?: number;
    /**
     * 排序字段
     * @type {string}
     * @memberof ProductInspectionInput
     */
    field?: string | null;
    /**
     * 排序方向
     * @type {string}
     * @memberof ProductInspectionInput
     */
    order?: string | null;
    /**
     * 降序排序
     * @type {string}
     * @memberof ProductInspectionInput
     */
    descStr?: string | null;
    /**
     * 检查项目
     * @type {string}
     * @memberof ProductInspectionInput
     */
    itemName?: string | null;
    /**
     * 扩展属性
     * @type {string}
     * @memberof ProductInspectionInput
     */
    ext?: string | null;
}

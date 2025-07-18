/* tslint:disable */
/* eslint-disable */
/**
 * 会员管理
 * <br/><u><b><font color='FF0000'> 内部接口文档</font></b></u>
 *
 * OpenAPI spec version: 1.0.0
 * Contact: liyahui360@163.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

 /**
 * 系统文件表
 *
 * @export
 * @interface SysFile
 */
export interface SysFile {

    /**
     * 雪花Id
     *
     * @type {number}
     * @memberof SysFile
     */
    id?: number;

    /**
     * 创建时间
     *
     * @type {Date}
     * @memberof SysFile
     */
    createTime?: Date;

    /**
     * 更新时间
     *
     * @type {Date}
     * @memberof SysFile
     */
    updateTime?: Date | null;

    /**
     * 创建者Id
     *
     * @type {number}
     * @memberof SysFile
     */
    createUserId?: number | null;

    /**
     * 创建者姓名
     *
     * @type {string}
     * @memberof SysFile
     */
    createUserName?: string | null;

    /**
     * 修改者Id
     *
     * @type {number}
     * @memberof SysFile
     */
    updateUserId?: number | null;

    /**
     * 修改者姓名
     *
     * @type {string}
     * @memberof SysFile
     */
    updateUserName?: string | null;

    /**
     * 软删除
     *
     * @type {boolean}
     * @memberof SysFile
     */
    isDelete?: boolean;

    /**
     * @type {string}
     * @memberof SysFile
     */
    ver?: string | null;

    /**
     * 创建者部门Id
     *
     * @type {number}
     * @memberof SysFile
     */
    createOrgId?: number | null;

    /**
     * 创建者部门名称
     *
     * @type {string}
     * @memberof SysFile
     */
    createOrgName?: string | null;

    /**
     * 租户Id
     *
     * @type {number}
     * @memberof SysFile
     */
    tenantId?: number | null;

    /**
     * 提供者
     *
     * @type {string}
     * @memberof SysFile
     */
    provider?: string | null;

    /**
     * 仓储名称
     *
     * @type {string}
     * @memberof SysFile
     */
    bucketName?: string | null;

    /**
     * 文件名称（源文件名）
     *
     * @type {string}
     * @memberof SysFile
     */
    fileName?: string | null;

    /**
     * 文件后缀
     *
     * @type {string}
     * @memberof SysFile
     */
    suffix?: string | null;

    /**
     * 存储路径
     *
     * @type {string}
     * @memberof SysFile
     */
    filePath?: string | null;

    /**
     * 文件大小KB
     *
     * @type {number}
     * @memberof SysFile
     */
    sizeKb?: number;

    /**
     * 文件大小信息-计算后的
     *
     * @type {string}
     * @memberof SysFile
     */
    sizeInfo?: string | null;

    /**
     * 外链地址-OSS上传后生成外链地址方便前端预览
     *
     * @type {string}
     * @memberof SysFile
     */
    url?: string | null;

    /**
     * 文件MD5
     *
     * @type {string}
     * @memberof SysFile
     */
    fileMd5?: string | null;

    /**
     * 关联对象名称（如子对象）
     *
     * @type {string}
     * @memberof SysFile
     */
    relationName?: string | null;

    /**
     * 关联对象Id
     *
     * @type {number}
     * @memberof SysFile
     */
    relationId?: number | null;

    /**
     * 所属Id（如主对象）
     *
     * @type {number}
     * @memberof SysFile
     */
    belongId?: number | null;

    /**
     * 文件类别
     *
     * @type {string}
     * @memberof SysFile
     */
    fileType?: string | null;

    /**
     * 是否公开  若为true则所有人都可以查看，默认只有自己或有权限的可以查看
     *
     * @type {boolean}
     * @memberof SysFile
     */
    isPublic?: boolean;
}

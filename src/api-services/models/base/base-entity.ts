

export interface BaseEntity{
    /**
     * 雪花Id
     * @type {number}
     * @memberof SysRole
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof SysRole
     */
    createTime?: Date | null;
    /**
     * 更新时间
     * @type {Date}
     * @memberof SysRole
     */
    updateTime?: Date | null;
    /**
     * 创建者Id
     * @type {number}
     * @memberof SysRole
     */
    createUserId?: number | null;
    /**
     * 修改者Id
     * @type {number}
     * @memberof SysRole
     */
    updateUserId?: number | null;
    /**
     * 软删除
     * @type {boolean}
     * @memberof SysRole
     */
    isDelete?: boolean;
    /**
     * 租户Id
     * @type {number}
     * @memberof SysRole
     */
    tenantId?: number | null;
}
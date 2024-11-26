

export interface BaseOuput<T>{
    /**
     * 状态码
     * @type {number}
     * @memberof AdminResultSqlSugarPagedListSysRole
     */
    code?: number;
    /**
     * 类型success、warning、error
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListSysRole
     */
    type?: string | null;
    /**
     * 错误信息
     * @type {string}
     * @memberof AdminResultSqlSugarPagedListSysRole
     */
    message?: string | null;
    /**
     *
     * @type {SqlSugarPagedListSysRole}
     * @memberof AdminResultSqlSugarPagedListSysRole
     */
    result?: T;
    /**
     * 附加数据
     * @type {any}
     * @memberof AdminResultSqlSugarPagedListSysRole
     */
    extras?: any | null;
    /**
     * 时间
     * @type {Date}
     * @memberof AdminResultSqlSugarPagedListSysRole
     */
    time?: Date;
}
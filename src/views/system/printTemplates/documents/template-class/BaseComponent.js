export default class BaseComponent {
    constructor(title, tag, value, type, htmlValue) {
        this.title = title 
        this.tag = tag
        this.value = value
        // 为true的话  返回的是虚拟dom节点
        this.type = type,
        this.htmlValue = htmlValue
    }

    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor) {   
        return this.value
    }

    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor) {                // JS 语法
        return false
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor) {                     // JS 语法
        return false
    }

    // 点击菜单时触发的函数
    exec(editor, value) {     
        if (this.isDisabled(editor)) return
        if(this.type) {
            // 选中框类型为todo  原组件内容
            const mentionNode = {
                type: value, // 必须是 'mention'
                value: this.htmlValue,
                children: [{ text: '' }], // 必须有一个空 text 作为 children
            }
            editor.insertNode(mentionNode)
            editor.move(1) // 移动光标

        }else {
            editor.insertText(value)
        }
    }
}

export class BaseImage extends BaseComponent {
    constructor(title, tag, value) {
        super(title, tag, value)
        this.title = title 
        this.tag = tag
        this.url = value
    }

    // 点击菜单时触发的函数
    exec(editor, value) {     
        if (this.isDisabled(editor)) return
        const mentionNode = {
            alt: '',
            children: [{ text: '' }],
            src: this.url,
            type: 'image'
        }
        editor.insertNode(mentionNode)
        editor.move(1) // 移动光标
    }
}


export class BaseHeard extends BaseComponent {
    constructor(title, tag, value) {
        super(title, tag, value)
        this.title = title 
        this.tag = tag
    }

    // 点击菜单时触发的函数
    exec(editor, value) {     
        if (this.isDisabled(editor)) return
        editor.restoreSelection() // 恢复选区
        // editor.addMark('border-bottom', '1px soild #999') 
        editor.addMark('color', '#999') 
    }
}


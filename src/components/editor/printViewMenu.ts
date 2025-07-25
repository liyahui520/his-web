import {IButtonMenu, IDomEditor} from "@wangeditor/editor";

class PrintViewMenu implements IButtonMenu {
    tag: string;
    title: string;
    iconSvg: string;
    constructor() {
        this.title = '打印预览'; // 鼠标悬浮显示
        this.tag = 'button'
        this.iconSvg = '<svg viewBox="0 0 1024 1024"><path d="M771.3 1023.978h-617.1c-85 0-154.2-68.8-154.2-153.2v-717.5c0-84.5 68.8-153.2 153.2-153.2h717.6c40.9 0 79.4 16 108.4 44.9 28.9 29 44.9 67.6 44.9 108.6v589.5c0 18.8-15.2 34.1-34.1 34.1-18.8 0-34.1-15.1-34.1-34v-589.7c0-47-38.2-85.3-85-85.3h-717.5c-46.8 0-85 38.2-85 85v717.5c0 46.8 38.5 85 85.9 85h616.9c18.8 0 34.1 15.2 34.1 34.1 0.1 18.7-15.2 34.2-34 34.2zM512.1 785.078c-73 0-141.5-28.4-193.1-79.9-51.6-51.6-79.9-120.1-79.9-193.1s28.4-141.5 79.9-193.1c51.6-51.6 120.1-79.9 193.1-79.9s141.5 28.4 193.1 79.9c51.6 51.6 79.9 120.1 79.9 193.1s-28.4 141.5-79.9 193.1c-51.5 51.6-120.2 79.9-193.1 79.9z m0-477.9c-112.9 0-204.8 91.9-204.8 204.8s91.9 204.8 204.8 204.8 204.8-91.9 204.8-204.8c0-113-91.9-204.8-204.8-204.8zM840.7 874.578c-8.6 0-17.3-3.2-23.9-9.7l-158.7-155.5c-13.4-13.2-13.7-34.8-0.5-48.2 13.2-13.4 34.8-13.7 48.2-0.5l158.6 155.5c13.4 13.2 13.7 34.8 0.5 48.2-6.6 6.9-15.4 10.2-24.2 10.2z" /></svg>'; // 菜单图标
    }

    isActive(editor: IDomEditor):boolean{ // 保持默认
        return false
    }
    getValue(editor: IDomEditor): string|boolean{ // 保持默认
        return ''
    }
    isDisabled(editor: IDomEditor): boolean{ // 保持默认
        return false;
    }
    exec(editor: IDomEditor, value: string | boolean){ // 菜单点击事件，这里将点击事件暴露出去
        if(this.isDisabled(editor)){
            return;
        }
        editor.emit('PrintViewMenuClick');
    }

}

export default PrintViewMenu
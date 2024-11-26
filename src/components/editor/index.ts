import PrintMenu from "./printMenu";
import {IDomEditor, IToolbarConfig, Boot, IModuleConf} from "@wangeditor/editor";
import PrintViewMenu from "/@/components/editor/printViewMenu";
import SaveMenu from "/@/components/editor/saveMenu";
import {conf } from "./elem"
import { mention } from './cusdom'
import { parseHtmlConf } from './parseElemsHtml'
import withMention from './plugin'

const MenusList = [
    {
        key: 'PrintMenu',
        class: PrintMenu,
        index: 0 // 菜单要在工具栏显示的位置
    },
    {
        key: 'PrintViewMenu',
        class: PrintViewMenu,
        index: 1 // 菜单要在工具栏显示的位置
    },
    // {
    //     key: 'SaveMenu',
    //     class: SaveMenu,
    //     index: 2 // 菜单要在工具栏显示的位置
    // },
]
const registerMenu = function (editor: IDomEditor, toolbarConfig: Partial<IToolbarConfig>){
    const allRegisterMenu = editor.getAllMenuKeys(); // 获取所有已注册的菜单
    let keys = [];
    for(let item of MenusList){
        if(allRegisterMenu.indexOf(item.key) < 0){ // 如果未注册，则注册
            const menuObj = {
                key: item.key,
                factory() {
                    return new item.class()
                }
            }
            Boot.registerMenu(menuObj);
        }
        keys.push(item.key)
    } 
    Boot.registerPlugin(withMention);
    Boot.registerElemToHtml(conf);
    Boot.registerRenderElem(mention);
    Boot.registerParseElemHtml(parseHtmlConf);
    toolbarConfig.insertKeys = {
        index: MenusList[0].index,
        keys: keys
    }
}

export default registerMenu
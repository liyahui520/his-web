
 import { SlateElement } from '@wangeditor/editor'
 
 // 生成 html 的函数
 function mentionToHtml(elem) {
   const { value = '', info = {} } = elem
   const infoStr = encodeURIComponent(JSON.stringify(info))
   return `<span data-w-e-is-void data-w-e-is-inline data-w-e-type="mention" data-value="${value}" data-info="${infoStr}" data-sion>{${value}}</span>`
 }

 function mentionTextareaToHtml(ele) {
    return `<textarea style='height: 22px' disabled data-w-e-type="mentionTextarea"></textarea>`
 }

 function mentionCheckboxToHtml(ele) {
    return `<input type='checkbox' />`
 }
 

  // 配置
export const conf = {
    type: 'mention', // 节点 type ，重要！！！
    elemToHtml: mentionToHtml,
}

export const confTextarea = {
    type: 'mentionTextarea', // 节点 type ，重要！！！
    elemToHtml: mentionTextareaToHtml,
}
 
export const confCheckbox = {
    type: 'mentionCheckbox', // 节点 type ，重要！！！
    elemToHtml: mentionCheckboxToHtml,
}


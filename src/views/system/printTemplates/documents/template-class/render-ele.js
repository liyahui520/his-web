 import { h } from 'snabbdom'
 import { DomEditor } from '@wangeditor/editor'
 
 function renderMention(elem, children, editor) {
   // 当前节点是否选中
   const selected = DomEditor.isNodeSelected(editor, elem)
   const { value = '' } = elem
 
   // 构建 vnode
   const vnode = h(
     'span',
     {
       props: {
         contentEditable: false, // 不可编辑
       },
       style: {
         marginLeft: '3px',
         marginRight: '3px',
         backgroundColor: 'var(--w-e-textarea-slight-bg-color)',
         border: selected // 选中/不选中，样式不一样
           ? '2px solid var(--w-e-textarea-selected-border-color)' // wangEditor 提供了 css var https://www.wangeditor.com/v5/guide/theme.html
           : '2px solid transparent',
         borderRadius: '3px',
         padding: '0 3px',
       },
     },
     `{${value}}`
   )
 
   return vnode
 }


 function renderTextarea(elem, children, editor) {
    // 当前节点是否选中
   const selected = DomEditor.isNodeSelected(editor, elem)
   const { value = '' } = elem
 
   // 构建 vnode
   const vnode = h(
     'textarea',
     {
        props: {
          disabled: true,
        },
        style: elem.style ? elem.style : { height: '22px' }
     }
   )
 
   return vnode
 }


 function renderCheckbox(elem, children, editor) {
    // 当前节点是否选中
    const selected = DomEditor.isNodeSelected(editor, elem)
    const { value = '' } = elem

    // 构建 vnode
    const vnode = h(
    'input',
      {
        props: {
            type: 'checkbox'
        },
        style: {
          marginLeft: '3px',
          marginRight: '3px',
        },
      }
    )

    return vnode
  }
 
 export { renderMention, renderTextarea, renderCheckbox }
 
<template>
    <div style="position: relative;"  class="editor-container">
    <Toolbar :editor="editorRef" :mode="mode" :defaultConfig="props.toolbarConfig"  /> 
      <Editor :defaultConfig="editorConfig" v-model="valueHtml" @onCreated="handleCreated" :style="{height}" :defaultContent="jsonContent" 
        @onChange="onChange" @keydown.enter.native="keyDown" />
      <mention-modal v-if="isShowModal" @hideMentionModal="hideMentionModal" @insertMention="insertMention"
        :position="position" :tempList="tempList"></mention-modal> 
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, shallowRef, onBeforeUnmount, nextTick, watch,reactive } from 'vue'
  import { Boot } from '@wangeditor/editor'
  import { Editor,Toolbar } from '@wangeditor/editor-for-vue'
  import mentionModule from '@wangeditor/plugin-mention'
  import MentionModal from './MentionModal.vue'
  import {conf } from "../editor/elem"
  import { mention } from '../editor/cusdom'
import { parseHtmlConf } from '../editor/parseElemsHtml'
  // 注册插件
  Boot.registerModule(mentionModule)
    Boot.registerElemToHtml(conf); 
    Boot.registerRenderElem(mention);
    Boot.registerParseElemHtml(parseHtmlConf);
  const istype= ref(false)
  
  const props = withDefaults(defineProps<{
    content?: string,
    height?: string,
    mode?:string,
    toolbarConfig?:object,
    tempList?: object
  }>(), {
    content: '' ,
    height:'',
    mode:'default',
    toolbarConfig:{
		toolbarKeys:["blockquote","insertLink","insertVideo","codeBlock","fullScreen","group-more-style","emotion","group-video", "todo", "uploadImage"]
       
    },
    tempList:[{}]
  })

  const jsonContent =reactive([
        {
          type: "paragraph",
          children: [{ text: "" }],
          fontSize: "14px",
          fontFamily: "微软雅黑",
          lineHeight: 2,
        },
      ],)

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef()
  
  // const valueHtml = ref('<p>你好<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="A张三" data-info="%7B%22id%22%3A%22a%22%7D">@A张三</span></p>')
  const valueHtml = ref('')
  const isShowModal = ref(false)
  
  watch(() => props.content, (val: string) => {
    nextTick(() => {
      valueHtml.value = val
      console.log('val',val)
    })
  })
  
  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })
  const position = ref({
    left: '15px',
    top: '40px'
  })
  const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    position.value = editor.getSelectionPosition()
  }
  
  const showMentionModal = () => {
    // 对话框的定位是根据富文本框的光标位置来确定的
    nextTick(() => {
      const editor = editorRef.value
      console.log(editor.getSelectionPosition());
      position.value = editor.getSelectionPosition()
    })
    isShowModal.value = true
  }
  const hideMentionModal = () => {
    isShowModal.value = false
  }
  const editorConfig = {
    placeholder: '',
  
    EXTEND_CONF: {
      mentionConfig: {
        showModal: showMentionModal,
        hideModal: hideMentionModal,
      },
    },
  }
  
const emit = defineEmits(['update:getHtml', 'update:getText', 'update:Print', 'update:PrintView', 'update:blur']);
  const onChange = (editor: any) => {
    console.log('changed html', editor.getHtml())
    console.log('changed content', editor.children)
    emit('update:getHtml', editor.getHtml());
	emit('update:getText', editor.getText());
  }
  
  const insertMention = (id: any, username: any) => {
    const mentionNode = {
      type: 'mention', // 必须是 'mention'
      value: username,
      info: { id },
      children: [{ text: '' }], // 必须有一个空 text 作为 children
    }
    const editor = editorRef.value
    if (editor) {
      editor.restoreSelection() // 恢复选区
      if(isShowModal.value)
        editor.deleteBackward('character') // 删除 '@'
      editor.insertNode(mentionNode) // 插入 mention
      editor.move(1) // 移动光标
    }
  }
  const keyDown = (e: any) => {
    // 执行一些逻辑方法
    const editor = editorRef.value
    // console.log(editor.children[0].children.filter((item: any) => item.type === 'mention').map((item: any) => item.info.id), 'key === 发song')
    // // this.sendBut()//发送信息的方法
    // if (e != undefined) {
    //   e.preventDefault(); // 阻止浏览器默认的敲击回车换行的方法
    // }
  }
  defineExpose({ insertMention });
  </script>
  
  <style src="@wangeditor/editor/dist/css/style.css"></style>
  <style scoped>
  .w-e-scroll {
    max-height: 100px;
  }
  </style>
  
<style lang="less">
.editor-container {
	overflow-y: hidden;
	.w-e-bar-item {
		.w-e-select-list {
			height: 150px;
			z-index: 10 !important;
		}
	}
	.w-e-text-container {
		// 文本框里面的层级调低
		//z-index: 3 !important;
	}
	.w-e-toolbar {
		// 给工具栏换行
		flex-wrap: wrap;
		z-index: 4 !important;
	}
	.w-e-menu {
		// 最重要的一句代码
		z-index: auto !important;
		.w-e-droplist {
			// 触发工具栏后的显示框调高
			z-index: 2 !important;
		}
	}
}
	.editor-container{
 
	.w-e-text-container blockquote, .w-e-text-container li, .w-e-text-container p, .w-e-text-container td, .w-e-text-container th, .w-e-toolbar *{
	line-height: 1;
	margin: 0 !important;
}
}
</style>

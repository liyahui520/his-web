<template>
	<div class="editor-container">
		<Toolbar :editor="editorRef" :mode="mode" :defaultConfig="props.toolbarConfig" v-show="isShow" />
		<Editor
			:mode="mode"
			:defaultConfig="state.editorConfig"
			:style="{ height }"
			v-model="state.editorVal"
			@onBlur="blur"
			:defaultContent="jsonContent"
			@onCreated="handleCreated"
			@onChange="handleChange"
			:z-index="9999999"
		/>
		<MentionModal :list="lableList" appendToBody :value="isShowModal" @hideMentionModal="hideModal1" @insertMention="insertMention" />

		<div class="mb-4 btn-cus">
			<el-button type="primary" @click="selectTemp">选择模板</el-button>
			<el-button type="success" @click="addTemp">保存模板</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="wngEditor">
// https://www.wangeditor.com/v5/for-frame.html#vue3
import '@wangeditor/editor/dist/css/style.css';
import { reactive, shallowRef, watch, onBeforeUnmount, ref, onMounted, defineAsyncComponent } from 'vue';
import { IDomEditor, IToolbarConfig } from '@wangeditor/editor';
import mentionModule, { MentionElement } from '@wangeditor/plugin-mention';
import { Toolbar, Editor } from '@wangeditor/editor-for-vue';
import { ElMessage } from 'element-plus';
import { getAPI } from '/@/utils/axios-utils';
import { SysFileApi } from '/@/api-services/api';
import registerMenu from '/@/components/editor/index';
const MentionModal = defineAsyncComponent(() => import('./MentionModal.vue'));

// 定义父组件传过来的值
const props = defineProps({
	// 是否禁用
	disable: {
		type: Boolean,
		default: () => false,
	},
	// 内容框默认 placeholder
	placeholder: {
		type: String,
		default: () => '请输入内容...',
	},
	isShow: {
		type: Boolean,
		default: () => true,
	},
	// https://www.wangeditor.com/v5/getting-started.html#mode-%E6%A8%A1%E5%BC%8F
	// 模式，可选 <default|simple>，默认 default
	mode: {
		type: String,
		default: () => 'default',
	},
	// 高度
	height: {
		type: String,
		default: () => '310px',
	},
	insertNode: {
		type: String,
		default: () => '',
	},
	lableList: {
		type: Array,
		default: [],
	},
	toolbarConfig: {
		type: Object,
		default: () => {
			toolbarKeys: ['blockquote', 'insertLink', 'insertVideo', 'codeBlock', 'fullScreen', 'group-more-style', 'emotion', 'group-video', 'todo', 'uploadImage'];
		},
	},
	// 双向绑定，用于获取 editor.getHtml()
	getHtml: String,
	// 双向绑定，用于获取 editor.getText()
	getText: String,
});

const isShowModal = ref(false);

// 定义子组件向父组件传值/事件
const emit = defineEmits(['update:getHtml', 'update:getText', 'update:getAll', 'update:Print', 'update:PrintView', 'update:blur','btn:selectTemp','btn:addTemp']);

const blur = async (e) => {
	emit('update:blur', e);
	console.log('e', e);
	emit('update:getAll', e.getText(), e.getHtml());
};
// 定义变量内容
const editorRef = shallowRef();
const editorN = ref();

const selectTemp = async ()=>{
	emit('btn:selectTemp')
}

const addTemp = async ()=>{
	emit('btn:addTemp')
}

const jsonContent = reactive([
	{
		type: 'paragraph',
		children: [{ text: '' }],
		fontSize: '14px',
		fontFamily: '微软雅黑',
		lineHeight: 1.5,
	},
]);
const state = reactive({
	editorConfig: {
		placeholder: props.placeholder,
		lineHeight: 2,
		EXTEND_CONF: {
			mentionConfig: {
				showModal: () => {},
				hideModal: () => {},
			},
		},
		// 菜单配置
		MENU_CONF: {
			uploadImage: {
				fieldName: 'file',
				customUpload(file, insertFn) {
					// console.log('customUpload', file);
					const uploadFun = async () => {
						const rps = await getAPI(SysFileApi).apiSysFileUploadFilePostForm(file);
						if (rps.data.type == 'success' && rps.data.result != null) {
							insertFn(rps.data.result.url, rps.data.result.name, rps.data.result.url);
						} else {
							ElMessage.error('上传失败！');
						}
					};
					uploadFun();
				},
			},
			insertImage: {
				checkImage(src: string, alt: string, href: string): boolean | string | undefined {
					if (src.indexOf('http') !== 0) {
						return '图片网址必须以 http/https 开头';
					}
					return true;
				},
			},
		},
	},
	editorVal: props.getHtml,
});

function showModal1(editor: IDomEditor) {
	isShowModal.value = true;
}

function hideModal1(editor: IDomEditor) {
	// 隐藏 modal
	isShowModal.value = false;
}
const insertMention = (id: any, username: any) => {
	const mentionNode = {
		type: 'mention', // 必须是 'mention'
		value: username,
		info: { id },
		children: [{ text: '' }], // 必须有一个空 text 作为 children
	};
	const editor = editorRef.value;
	if (editor) {
		editor.restoreSelection(); // 恢复选区
		editor.deleteBackward('character'); // 删除 '@'
		editor.insertNode(mentionNode); // 插入 mention
		editor.move(1); // 移动光标
	}
};
// const insertMention=(id, name, type)=> {
//         const mentionNode = {
//             type: 'mention', // 必须是 'mention'
//             value: name,
//             info: { id },
//             children: [{ text: ' ' }], // 必须有一个空 text 作为 children
//         }
//         const editor = editorN.value;
//         if (editor) {
//             editor.restoreSelection() // 恢复选区
//             if(!type) {
//                 editor.deleteBackward('character') // 删除 '@'
//             }
//             editor.insertNode(mentionNode) // 插入 mention
//             // 左边插入不需要移动
//             if(!type) {
//                 editor.move(1) // 移动光标
//             }
//         }
//     }

// 编辑器回调函数
const handleCreated = (editor: IDomEditor) => {
	editorN.value = Object.seal(editor);
	editorRef.value = editor;
	// editorRef.value.lineHeight = 0.5;
	registerMenu(editorRef.value, props.toolbarConfig); // 注册自定义菜单。这个是5.4那边声明的
	initMediaMenuEvent(); // 注册自定义菜单点击事件
};

// 事件监听
const initMediaMenuEvent = () => {
	const editor = editorRef.value;
	//   editor.lineHeight=0.5;
	// 在点击事件中，根据具体菜单，可以触发响应的功能，这里可以为每个事件创建一个el-dialog弹窗。我们就可以完全按照自己的需求开发后续功能
	editor.on('PrintMenuClick', () => {
		// 你点击了音频菜单
		emit('update:Print', editor.getHtml());
	});
	editor.on('PrintViewMenuClick', () => {
		// 你点击了音频菜单
		emit('update:PrintView', editor.getHtml());
	});
};
// 编辑器内容改变时
const handleChange = (editor: any) => {
	emit('update:getHtml', editor.getHtml());
	emit('update:getText', editor.getText());
};
// 页面销毁时
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

onMounted(() => {});
// 监听是否禁用改变
// https://gitee.com/lyt-top/vue-next-admin/issues/I4LM7I
// watch(
// 	() => props.disable,
// 	(bool) => {
// 		const editor = editorRef.value;
// 		if (editor == null) return;
// 		bool ? editor.disable() : editor.enable();
// 	},
// 	{
// 		deep: true,
// 	}
// );
// 监听双向绑定值改变，用于回显
watch(
	() => props.getHtml,
	(val) => {
		state.editorVal = val;
	},
	{
		deep: true,
	}
);
// 监听双向绑定值改变，用于回显
watch(
	() => props.insertNode,
	(val) => {
		//  editorRef.value.focus()
		// const id=Math.random();
		// const mentionNode:MentionElement  = {
		//     type: 'mention', // 必须是 'mention'
		//     value: val,
		//     info: { id },
		//     children: [{ text: '' }], // 必须有一个空 text 作为 children
		// }
		// const editor = editorN.value
		// if (editor) {
		//     editor.restoreSelection() // 恢复选区
		//     // if(!type) {
		//          editor.deleteBackward('character') // 删除 '@'
		//     // }
		//     editor.insertNode(mentionNode) // 插入 mention
		//     // 左边插入不需要移动
		//     // if(!type) {
		//         // editor.move(1) // 移动光标
		//     // }
		// }
		// 		// editorRef.value.insertText(val)
		//     // editorRef.value.insertNode({text:val});
		//     // 更新编辑器内容以确保插入节点正确显示
		//     // editorRef.value.txt.html(editorRef.value.txt.html());
		//     let editor= editorRef.value;
		//     // 创建一个包含自定义样式的节点
		//     var customStyledNode = document.createElement('span');
		//     customStyledNode.style.fontFamily = 'Arial, sans-serif';
		//     customStyledNode.style.fontSize = '16px';
		//     // customStyledNode.style.userSelect='none';
		//     customStyledNode.textContent = val;
		// // 获取编辑器的当前选区
		//     // 获取编辑器的当前选区
		//     var selection = window.getSelection();
		//     if (selection.rangeCount > 0) {
		//       // // 获取选区的第一个范围
		//       // var range = selection.getRangeAt(0);
		//       // range.insertNode(customStyledNode);
		//       // // // 获取焦点位置的 DOM 节点
		//       // // var focusNode = range.startContainer;
		//       // // var focusOffset = range.startOffset;
		//       // //
		//       // // // 将自定义节点插入到焦点位置前
		//       // // focusNode.parentNode.insertBefore(customStyledNode, focusNode.splitText(focusOffset));
		//       // //
		//       // // // 更新编辑器内容以确保更改正确显示
		//       // // editor.txt.html(editor.txt.html());
		//       // 获取选区的最后一个范围
		//       var range = selection.getRangeAt(0);//selection.rangeCount - 1
		//       // 获取焦点位置的 DOM 节点
		//       var focusNode = range.endContainer;
		//       // 创建一个新的 Range 对象
		//       var newRange = document.createRange();
		//       // 将新 Range 对象设置为焦点位置后
		//       newRange.setStartAfter(focusNode);
		//       newRange.setEndAfter(focusNode);
		//       // 插入自定义节点到新 Range 中
		//       newRange.insertNode(customStyledNode);
		//       // 更新编辑器内容以确保更改正确显示
		//       // editor.txt.html(editor.txt.html());
		//     }
	},
	{
		deep: true,
	}
);
</script>
<style lang="less">
.editor-container {
	.btn-cus {
		position: absolute;
		right: 10%;
		width: 200px;
		top: 80px;
		z-index: 9999;
	}
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
.editor-container {
	.w-e-text-container blockquote,
	.w-e-text-container li,
	.w-e-text-container p,
	.w-e-text-container td,
	.w-e-text-container th,
	.w-e-toolbar * {
		line-height: 1;
		margin: 0 !important;
	}
}
</style>

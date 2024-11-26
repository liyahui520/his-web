import BaseComponent, { BaseImage, BaseHeard } from './BaseComponent'
import { renderMention, renderTextarea, renderCheckbox } from './render-ele'

// 输入框
const menuInput = {
    key: 'menuInput', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
      // return new BaseComponent('输入框', 'button', '{_______}')
      return new BaseComponent('输入框', 'button', 'mentionTextarea', true)

    },
}

// 选中框
const menuChcheckbox = {
  key: 'menuChcheckbox', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new BaseComponent('选中框', 'button', 'mention', true, '口')
  },
}

// 文件框
const menuFile = {
  key: 'menuFile', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new BaseImage('文件框', 'button', 'https://hiishoposs.oss-cn-shanghai.aliyuncs.com/bpetiis/wxp/xh/index/add-image.png')
  },
}

// 表头
const menuHeard = {
  key: 'menuHeard', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new BaseHeard('表头', 'button', '')
  },
}

// 属性dom
const mention = {
  type: 'mention', // 节点 type ，重要！！！
  renderElem: renderMention,
}

// TextareaDom
const mentionTextarea = {
  type: 'mentionTextarea', // 节点 type ，重要！！！
  renderElem: renderTextarea,
}

// checkboxDom
const mentionCheckbox = {
  type: 'mentionCheckbox',
  renderElem: renderCheckbox,
}

export { menuInput, mention, mentionTextarea, menuChcheckbox, menuFile, mentionCheckbox, menuHeard }

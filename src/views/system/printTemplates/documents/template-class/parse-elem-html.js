
function parseAttachmentHtml(elem, children, editor) {                                                     // JS 语法
  const value = elem.getAttribute('data-value') || ''
  const rawInfo = decodeURIComponent(elem.getAttribute('data-info') || '')
  let info
  try {
    info = JSON.parse(rawInfo)
  } catch (ex) {
    info = rawInfo
  }
  // 生成“附件”元素（按照此前约定的数据结构）
  const myResume = {
    type: 'mention',
    value,
    info,
    children: [{ text: '' }]
  }

  return myResume
}


function parseElemTextarea(elem) {
  const width = elem.style.width || ''
  const height = elem.style.height || '22px'
  const myResume = {
    type: 'mentionTextarea',
    style: {
      width,
      height
    },
    children: [{ text: '' }]
  }

  return myResume
}

const parseHtmlConf = {
    selector: 'span[data-w-e-type="mention"]',
    parseElemHtml: parseAttachmentHtml,
}

const parseHtmlConfTextarea = {
  selector: 'textarea[data-w-e-type="mentionTextarea"]',
  parseElemHtml: parseElemTextarea,
}

export { parseHtmlConf, parseHtmlConfTextarea }

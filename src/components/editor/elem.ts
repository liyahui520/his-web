  // 配置
  export const conf = {
    type: 'mention', // 节点 type ，重要！！！
    elemToHtml: mentionToHtml,
}

function mentionToHtml(elem) {
    const { value = ' ', info = {} } = elem
    const infoStr = encodeURIComponent(JSON.stringify(info))
    return `<span data-w-e-is-void data-w-e-is-inline data-w-e-type="mention" data-value="${value}" data-info="${infoStr}" data-sion> ${value} </span>`
  }
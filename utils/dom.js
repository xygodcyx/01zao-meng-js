const doms = new Map()
const wrap = document.querySelector('.wrap#wrap')
/**
 * getDom
 * @param {string} querySelector  - CSS选择器
 * @returns {HTMLElement} dom
 */
const getDom = (querySelector) => {
  let dom = doms.get(querySelector)
  if (dom) return dom
  else dom = document.querySelector(querySelector)
  dom ? doms.set(querySelector, dom) : ' '
  return dom
}

/**
 * createDom
 * @param {string} type - createDomType eg:div,p,span...
 * @param {string} className - className
 * @param {HTMLElement} parent - parent
 * @param {string} content - content
 * @returns {HTMLElement} node
 */
const createDom = (type = 'div', className = '', parent = null, content = '') => {
  const node = document.createElement(type)
  node.className = className
  node.textContent = content
  parent ? parent.appendChild(node) : ''
  return node
}
/**
 * clearDom
 * @param {HTMLElement} parent - parent
 */
const clearDom = (parent) => {
  for (let i = 0; i < parent.children.length; i++) {
    parent.removeChild(parent.children[i])
  }
}

const dom = {
  wrap,
  getDom,
  createDom,
  clearDom,
}
export default dom

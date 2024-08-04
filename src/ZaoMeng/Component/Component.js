export default class Component {
  name
  /**
   * components
   * @type {Array<Component>} components - all Component in this gameObject
   */
  components = []
  constructor() {}
  /**
   * addComponent
   * @param {Component} component - want add component
   * @returns {Component} add component
   */
  addComponent(component) {
    this.components.push(component)
  }
  /**
   * removeComponent
   * @param {Component} component - want remove component
   * @returns {boolean} remove?
   */
  removeComponent(component) {
    let result = true
    const index = this.components.findIndex((comp) => comp === component)
    index === -1 ? (result = false) : this.components.splice(index, 1)
    return result
  }
}

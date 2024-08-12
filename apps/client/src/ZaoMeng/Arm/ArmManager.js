import Arm from './Arm.js';
class ArmManager {
	/**
	 * arms
	 * @type {Set<Arm>} arms - arms
	 */
	arms = new Set();
	constructor() {}
	update(delta) {
		this.arms.forEach((arm) => arm.update(delta));
	}
	/**
	 * render
	 * @param {CanvasRenderingContext2D} ctx - ctx
	 */
	render(ctx) {
		this.arms.forEach((arm) => arm.render(ctx));
	}
	/**
	 * add arm
	 * @param {arm} arm - want to add arm
	 * @returns {boolean} add?
	 */
	add(arm) {
		return this.arms.add(arm) !== null;
	}
	/**
	 * remove arm
	 * @param {arm} arm - want to remove arm
	 * @returns {boolean} remove?
	 */
	remove(arm) {
		return this.arms.delete(arm);
	}
	clear() {
		this.arms.clear();
	}
}

const armManger = new ArmManager();
export default armManger;

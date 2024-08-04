import Enemy from './Enemy.js';
class EnemyManager {
	/**
	 * enemies
	 * @type {Set<Enemy>} enemies - enemies
	 */
	enemies = new Set();
	constructor() {}
	update(delta) {
		this.enemies.forEach((enemy) => enemy.update(delta));
	}
	/**
	 * render
	 * @param {CanvasRenderingContext2D} ctx - ctx
	 */
	render(ctx) {
		this.enemies.forEach((enemy) => enemy.render(ctx));
	}
	/**
	 * add enemy
	 * @param {enemy} enemy - want to add enemy
	 * @returns {boolean} add?
	 */
	add(enemy) {
		return this.enemies.add(enemy) !== null;
	}
	/**
	 * remove enemy
	 * @param {enemy} enemy - want to remove enemy
	 * @returns {boolean} remove?
	 */
	remove(enemy) {
		return this.enemies.delete(enemy);
	}
	clear() {
		this.enemies.clear();
	}
}

const enemyManger = new EnemyManager();
export default enemyManger;

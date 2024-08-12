import Effect from './Effect.js';

class EffectManager {
	/**
	 * labels
	 * @type {Set<Effect>} labels - labels
	 */
	effects = new Set();
	constructor() {}
	update(delta) {
		this.effects.forEach((effect) => effect.update(delta));
	}
	/**
	 * render
	 * @param {CanvasRenderingContext2D} ctx - ctx
	 */
	render(ctx) {
		this.effects.forEach((effect) => effect.render(ctx));
	}
	/**
	 * add effect
	 * @param {Effect} effect - want to add effect
	 * @returns {boolean} add?
	 */
	add(effect) {
		return this.effects.add(effect) !== null;
	}
	/**
	 * remove effect
	 * @param {Effect} effect - want to remove effect
	 * @returns {boolean} remove?
	 */
	remove(effect) {
		return this.effects.delete(effect);
	}
	clear() {
		this.effects.clear();
	}
}

const effectManger = new EffectManager();
export default effectManger;

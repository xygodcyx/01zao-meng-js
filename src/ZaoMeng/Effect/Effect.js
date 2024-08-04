import Vector2 from '../Vector/Vector2.js';
import effectManger from './EffectManager.js';

let onceDebug = true;
export default class Effect {
	color = '#ecf0f1';
	size = 0;
	sizeMax = 11;
	fadeInDone = false;
	/**
	 * position
	 * @type {Vector2} position - position
	 */
	position = new Vector2(60, 60);
	fadeInSpeed = 37;
	fadeOutSpeed = 50;
	alpha = 0.6;
	constructor(
		position = this.position,
		color = this.color,
		sizeMax = this.sizeMax,
		autoAddScene = true
	) {
		this.position = position;
		this.color = color;
		this.sizeMax = sizeMax;
		autoAddScene ? effectManger.add(this) : '';
	}
	update(delta) {
		if (!this.fadeInDone) {
			this.fadeIn(delta);
		} else if (this.fadeInDone) {
			this.fadeOut(delta);
		}
	}
	fadeIn(delta) {
		this.size += this.fadeInSpeed * delta;
		this.alpha += this.fadeInSpeed;
		if (this.size >= this.sizeMax) {
			this.size = this.sizeMax;
			this.fadeInDone = true;
		}
	}
	fadeOut(delta) {
		this.size -= this.fadeOutSpeed * delta;
		this.alpha -= this.fadeOutSpeed;
		if (this.size <= 0) {
			effectManger.remove(this);
			this.size = 0;
		}
	}

	/**
	 * render
	 * @param {CanvasRenderingContext2D} ctx - ctx
	 */
	render(ctx) {
		this.fillEffect(ctx);
	}
	/**
	 * render
	 * @param {CanvasRenderingContext2D} ctx - ctx
	 */
	fillEffect(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.globalAlpha = this.alpha;
		// onceDebug ? console.table(ctx.measureText(this.text)) : '';
		ctx.arc(
			this.position.x,
			this.position.y - this.size,
			this.size,
			0,
			Math.PI * 2
		);
		ctx.fill();
		// ctx.stroke();
		ctx.restore();
		onceDebug ? (onceDebug = false) : '';
	}
}

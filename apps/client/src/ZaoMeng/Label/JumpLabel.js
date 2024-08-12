import Label from './Label.js';
import Vector2 from '../Vector/Vector2.js';
import labelManger from './LabelManager.js';
import Font from './Font.js';
export default class JumpLabel extends Label {
	fadeInDone = false;
	/**
	 * position
	 * @type {Vector2} position - position
	 */
	position = new Vector2(60, 60);
	fadeInSpeed = 100;
	fadeOutSpeed = 200;
	wait = 1;
	constructor(
		text = Label.text,
		position = Label.position,
		fontSizeMax = Label.fontSizeMax,
		font = Label.font,
		color = Label.color,
		autoAddScene = true
	) {
		super(text, position, fontSizeMax, font, color, autoAddScene);
		this.text = text;
		this.position = position;
		this.fontSizeMax = fontSizeMax;
		this.font = font;
		this.color = color;
		this.fontSize = 0;
		autoAddScene ? labelManger.add(this) : '';
	}
	update(delta) {
		console.log();
		super.update(delta);
		if (!this.fadeInDone) {
			this.fadeIn(delta);
		} else if (this.fadeInDone) {
			this.wait <= 0 ? this.fadeOut(delta) : (this.wait -= delta);
		}
	}
	fadeIn(delta) {
		this.fontSize += this.fadeInSpeed * delta;
		this.alpha += this.fadeInSpeed;
		if (this.fontSize >= this.fontSizeMax) {
			this.fontSize = this.fontSizeMax;
			this.fadeInDone = true;
		}
	}
	fadeOut(delta) {
		this.fontSize -= this.fadeOutSpeed * delta;
		this.alpha -= this.fadeOutSpeed;
		if (this.fontSize <= 10) {
			this.fontSize = 10;
			labelManger.remove(this);
		}
	}
	/**
	 * render
	 * @param {CanvasRenderingContext2D} ctx - ctx
	 */
	render(ctx) {
		super.render(ctx);
	}
}

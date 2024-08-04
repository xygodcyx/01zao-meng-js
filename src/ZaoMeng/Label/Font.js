import { EventEnum } from '../Enum/Index.js';
import eventCenter from '../EventCenter/EventCenter.js';
export default class Font {
	fontName = 'AlimamaFangYuanTiVF-Thin';
	fontUrl = 'url(public/font/AlimamaFangYuanTiVF-Thin.woff2)';

	constructor(
		fontName = 'AlimamaFangYuanTiVF-Thin',
		fontUrl = 'url(public/font/AlimamaFangYuanTiVF-Thin.woff2)'
	) {
		this.fontName = fontName;
		this.fontUrl = fontUrl;
		this.loadFont();
	}

	async loadFont() {
		const font = await new FontFace(this.fontName, this.fontUrl).load();
		if (font != null) {
			document.fonts.add(font);
			eventCenter.emit(EventEnum.FONT_LOADED, this.fontName);
		} else {
			new Error('无法加载字体 , JumpLabel.js--60');
		}
	}
}

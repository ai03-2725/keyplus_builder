const Generator = require('./index');

const C = require('const');

class KeyplusY extends Generator {

	loadTemplate() { return require('./templates/layout.yaml'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		// Generate the keymaps.
		const keymaps = (() => {
			let result = '';
			for (let layer = 0; layer < C.KEYMAP_MAX_LAYERS; layer ++) {
				let layerMap = '      [ # Layer '+String(layer)+'\n        [\n          '
				for (let row = 0; row < keyboard.rows; row ++) {
					for (let col = 0; col < keyboard.cols; col ++) {
						const key = keyboard.wiring[row + ',' + col];
						if (!key || !key.length) continue;
						let keycode = key[0].keycodes[layer].getCode()
						if (keycode.includes('(') && keycode.endsWith(')')) {
							keycode += '+'
						}
						else {
							if (keycode in C.KEYCODE_KEYPLUS){
								keycode = C.KEYCODE_KEYPLUS[keycode]
							}
						}
						layerMap += keycode + ', ';
					}
					layerMap += '\n          ';
				}
				layerMap = layerMap.substring(0, layerMap.length - 2) + ']\n      ],\n';
				result += layerMap;
			}
			result = result.substring(0, result.length - 3);
			return result;
		})();

		// Generate the matrix
		const matrix = (() => {
			const rowLength = String(keyboard.rows).length;
			const colLength = String(keyboard.cols).length;
			const space = ' '.repeat(rowLength + colLength + 3);

			let result = '';
			for (let row = 0; row < keyboard.rows; row ++) {
				let rowString = '';
				for (let col = 0; col < keyboard.cols; col ++) {
					if (keyboard.wiring[row + ',' + col]) {
						rowString += 'r' + String(row) + 'c' + String(col) + ', ';
					} else {
						rowString += space;
					}
				}
				result += '        ' + rowString + '\n';
			}

			result = result.substring(0, result.length - 4);

			return result;
		})();

		return {
			'kb_name': keyboard.settings.name,
			'layout': keymaps,
			'matrix': matrix,
			'diode_direction': (keyboard.settings.diodeDirection === C.DIODE_COL2ROW ? 'col_row' : 'row_col'),
			'row_pins': keyboard.pins.row.join(', '),
			'col_pins': keyboard.pins.col.join(', '),
		};
	}
}

module.exports = KeyplusY;

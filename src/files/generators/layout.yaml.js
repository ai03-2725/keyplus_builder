const Generator = require('./index');

const C = require('const');

class KeyplusY extends Generator {

	loadTemplate() { return require('./templates/layout.yaml'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		// Generate the keymaps.
		let keymaps = '';
		let explicit = '';
		for (let layer = 0; layer < C.KEYMAP_MAX_LAYERS; layer ++) {
			let layerMap = '      [ # Layer '+String(layer)+'\n        [\n          ';
			for (let row = 0; row < keyboard.rows; row ++) {
				for (let col = 0; col < keyboard.cols; col ++) {
					const key = keyboard.wiring[row + ',' + col];
					if (!key || !key.length) continue;
					let keycode = key[0].keycodes[layer].getCode()
					// Functions
					if (keycode.includes('(') && keycode.endsWith(')')) {
						// One-Shot Mods
						if (keycode in C.KEYPLUS_MODS) {
							keycode = '\'' + C.KEYPLUS_MODS[keycode] + '\'';
						}
						else {
							// Check Params
							let func_l = keycode.split('(');
							let func = func_l[0];
							let param = func_l[func_l.length-1];
							param = param.substring(0, param.length-(func_l.length-1))
							let param_l = param.split(',');
							// LAYER_FUNC(LAYER)
							if (func in C.KEYPLUS_LAYER) {
								keycode = '\'' + C.KEYPLUS_LAYER[func] + param + '\'';
							}
							// MOD(MOD(KC)))
							else if (func in C.KEYPLUS_MODS && param in C.KEYPLUS_KEYCODES && func_l.length > 1) {
								keycode = '';
								let len = func_l.length-1;
								for (let ind = 0; ind < len; ind ++) {
									let fn = func_l[ind];
									if (fn in C.KEYPLUS_MODS) {
										keycode += C.KEYPLUS_MODS[fn];
									}
								}
								keycode = '\'' + keycode + '-' + C.KEYPLUS_KEYCODES[param] + '\'';
							}
							// MOD_T(KC)
							else if (func in C.KEYPLUS_MODTAP && param in C.KEYPLUS_KEYCODES) {
								keycode = '\'' + C.KEYPLUS_KEYCODES[param] + '>' + C.KEYPLUS_MODTAP[func]+'-none' + '\''
							}
							// LT(LAYER,kc), MT(MOD, kc), LM(LAYER, MOD)
							else if (func in C.KEYPLUS_DOUBLE && param_l.length == 2) {
								let first = param_l[0].replace(/ /g,'');
								let second = param_l[1].replace(/ /g,'');

								// MT(MOD | MOD, kc)
								if (func == 'MT' && first.includes('|') && second in C.KEYPLUS_KEYCODES) {
									let first_l = first.split('|');
									first = '';
									for (let ind = 0; ind < first_l.length; ind ++) {
										let mod = first_l[ind].replace(/ /g,'');
										if (mod in C.LEGACY_MODS) {
											first += C.LEGACY_MODS[mod];
										}
									}

									let tap = C.KEYPLUS_KEYCODES[second]
									let hold = first +'-none'
									keycode = '\'' + tap + '>' + hold + '\'';
									// temp Code for explicit definition of 'tap>hold'
									if (explicit.length == 0) {
										explicit += '\nkeycodes:\n'
									}
									explicit += '  '+keycode+':\n    keycode: hold\n    delay: 200\n'
									explicit += '    tap_key: '+tap+'\n'
									explicit += '    hold_key: '+hold+'\n\n'
								}

								// MT(MOD, kc)
								if (func == 'MT' && first in C.LEGACY_MODS && second in C.KEYPLUS_KEYCODES) {

									let tap = C.KEYPLUS_KEYCODES[second]
									let hold = C.LEGACY_MODS[first]+'-none'
									keycode = '\'' + tap + '>' + hold + '\'';
									// temp Code for explicit definition of 'tap>hold'
									if (explicit.length == 0) {
										explicit += '\nkeycodes:\n'
									}
									explicit += '  '+keycode+':\n    keycode: hold\n    delay: 200\n'
									explicit += '    tap_key: '+tap+'\n'
									explicit += '    hold_key: '+hold+'\n\n'
								}
								// LT(LAYER, kc)
								else if (func == 'LT' && second in C.KEYPLUS_KEYCODES) {

									let tap = C.KEYPLUS_KEYCODES[second]
									let hold = C.KEYPLUS_DOUBLE[func]
									keycode = '\'' + tap + '>' + hold + first + '\'';
									// temp Code for explicit definition of 'tap>hold'
									if (explicit.length == 0) {
										explicit += '\nkeycodes:\n'
									}
									explicit += '  '+keycode+':\n    keycode: hold\n    delay: 200\n'
									explicit += '    tap_key: '+tap+'\n'
									explicit += '    hold_key: '+hold+'\n\n'
								}
								// LM(LAYER, MOD)
								//else if (second in C.LEGACY_MODS) {
									//keycode = '\'' + C.LEGACY_MODS[second]+'-none' + '~' + C.KEYPLUS_DOUBLE[func] + first + '\''
								//}
							}
							else {
								keycode = 'trns';
							}
						}
					}
					// Keycodes
					else {
						if (keycode in C.KEYPLUS_KEYCODES){
							keycode = '\'' + C.KEYPLUS_KEYCODES[keycode] + '\'';
						}
					}
					layerMap += keycode + ', ';
				}
				layerMap += '\n          ';
			}
			layerMap = layerMap.substring(0, layerMap.length - 2) + ']\n      ],\n';
			keymaps += layerMap;
		}
		keymaps = keymaps.substring(0, keymaps.length - 3);

		// Generate the matrix
		let matrix = '';
		const rowLength = String(keyboard.rows).length;
		const colLength = String(keyboard.cols).length;
		const space = ' '.repeat(rowLength + colLength + 3);

		for (let row = 0; row < keyboard.rows; row ++) {
			let rowString = '';
			for (let col = 0; col < keyboard.cols; col ++) {
				if (keyboard.wiring[row + ',' + col]) {
					rowString += 'r' + String(row) + 'c' + String(col) + ', ';
				} else {
					rowString += space;
				}
			}
			matrix += '        ' + rowString + '\n';
		}
		matrix = matrix.substring(0, matrix.length - 4);

		return {
			'kb_name': keyboard.settings.name,
			'explicit_defs': explicit,
			'layout': keymaps,
			'matrix': matrix,
			'diode_direction': (keyboard.settings.diodeDirection === C.DIODE_COL2ROW ? 'col_row' : 'row_col'),
			'row_pins': keyboard.pins.row.join(', '),
			'col_pins': keyboard.pins.col.join(', '),
		};
	}
}

module.exports = KeyplusY;

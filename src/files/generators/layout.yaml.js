const Generator = require('./index');

const C = require('const');

class KeyplusY extends Generator {

	loadTemplate() { return require('./templates/layout.yaml'); }

	fillTemplate() {
		const keyboard = this.keyboard;

		let mcu = ''
		switch (keyboard.controller) {
			case C.CONTROLLER_ATMEGA32U2: mcu = 'mcu: atmega32u2'; break;
			case C.CONTROLLER_ATMEGA32U4: mcu = 'mcu: atmega32u4'; break;
			case C.CONTROLLER_AT90USB1286: mcu = 'mcu: at90usb1286'; break;
			case C.CONTROLLER_ATXMEGA32A4U: mcu = 'mcu: atxmega32a4u'; break;
		}

		let kle = '';
		let row_ref = [];
		let ref_ind = 0;

		kle = keyboard.kle;
		let kle_string = '      ';
		let row_count = -1;
		for (let x = 0; x < kle.length; x++) {
			let row = kle[x];
			for (let y = 0; y < row.length; y++) { if (typeof row[y] === 'string') { row_count++ } }
			row_ref.push(row_count)
			row = JSON.stringify(row);
			kle_string += row+',\n      ';
		}
		kle = 'studio_kle: [\n' + kle_string.substring(0, kle_string.length-2) + ']';

		// Generate the keymaps.
		let keymaps = '';
		let explicit = '';
		for (let layer = 0; layer < C.KEYMAP_MAX_LAYERS; layer ++) {
			let layerMap = '      [ # Layer '+String(layer)+'\n        [\n          ';
			for (let keyIndex = 0; keyIndex < keyboard.keys.length; keyIndex++ ) {

				const key = keyboard.keys[keyIndex];

				//if (!key || !key.length) continue;
				let keycode = key.keycodes[layer].getCode()

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
						// MOD-KEYS
						else if (func == 'MOD') {

							let first = param_l[0].replace(/ /g,'');
							let second = param_l[1].replace(/ /g,'');

							if (second in C.KEYPLUS_KEYCODES) { keycode = C.KEYPLUS_KEYCODES[second]; } 
							else keycode = '____';

							keycode = '\'' + first + '-' + keycode + '\'';
						}
						// TAP>LAYER & TAP>MOD
						else if (func in C.KEYPLUS_DOUBLE && param_l.length == 2) {

							let first = param_l[0].replace(/ /g,'');
							let second = param_l[1].replace(/ /g,'');

							// MT(CSAG, kc)
							if (func == 'MT' && second in C.KEYPLUS_KEYCODES) {

								let tap = C.KEYPLUS_KEYCODES[second]
								let hold = first +'-none'
								keycode = '\'' + tap + '>' + hold + '\'';
								// temp Code for explicit definition of 'tap>hold'
								if (explicit.length == 0) { explicit += '\nkeycodes:\n' }
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
								if (explicit.length == 0) { explicit += '\nkeycodes:\n' }
								explicit += '  '+keycode+':\n    keycode: hold\n    delay: 200\n'
								explicit += '    tap_key: '+tap+'\n'
								explicit += '    hold_key: '+hold+'\n\n'
							}
							else keycode = '____';
						}
						else keycode = '____';
					}
				}
				// Keycodes
				else {
					if (keycode in C.KEYPLUS_KEYCODES) {
						keycode = '\'' + C.KEYPLUS_KEYCODES[keycode] + '\'';
					}
				}
				layerMap += keycode + ', ';

				if (keyIndex == row_ref[ref_ind]) {
					layerMap += '\n          ';
					ref_ind++;
				}
			}
			ref_ind = 0;
			layerMap = layerMap.substring(0, layerMap.length - 2) + ']\n      ],\n';
			keymaps += layerMap;
		}
		keymaps = keymaps.substring(0, keymaps.length - 3);

		row_ref.pop()
		let matrix = '        '
		for (let keyIndex = 0; keyIndex < keyboard.keys.length; keyIndex++ ) {
			const key = keyboard.keys[keyIndex];

			matrix += 'r' + String(key.row) + 'c' + String(key.col) + ', ';

			if (keyIndex == row_ref[ref_ind]) {
				matrix += '\n        ';
				ref_ind++;
			}
		}
		console.log(matrix)

		return {
			'kb_name': keyboard.settings.name,
			'mcu': mcu,
			'explicit_defs': explicit,
			'layout': keymaps,
			'matrix': matrix,
			'diode_direction': (keyboard.settings.diodeDirection === C.DIODE_COL2ROW ? 'col_row' : 'row_col'),
			'row_pins': keyboard.pins.row.join(', '),
			'col_pins': keyboard.pins.col.join(', '),
			'kle': kle,
		};
	}
}

module.exports = KeyplusY;

/*
// old MOD(MOD(KC)))
else if (func in C.KEYPLUS_MODS && param in C.KEYPLUS_KEYCODES && func_l.length > 1) {

	keycode = '';
	let len = func_l.length-1;
	for (let ind = 0; ind < len; ind ++) {
		let fn = func_l[ind];
		if (fn in C.KEYPLUS_MODS) { keycode += C.KEYPLUS_MODS[fn]; }
	}

	keycode = '\'' + keycode + '-' + C.KEYPLUS_KEYCODES[param] + '\'';
}
// MOD_T(KC)
else if (func in C.KEYPLUS_MODTAP && param in C.KEYPLUS_KEYCODES) {
	keycode = '\'' + C.KEYPLUS_KEYCODES[param] + '>' + C.KEYPLUS_MODTAP[func]+'-none' + '\''
}
*/

/*
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
				// MOD-KEYS
				else if (func == 'MOD') {

					let first = param_l[0].replace(/ /g,'');
					let second = param_l[1].replace(/ /g,'');

					if (second in C.KEYPLUS_KEYCODES) { keycode = C.KEYPLUS_KEYCODES[second]; } 
					else keycode = '____';

					keycode = '\'' + first + '-' + keycode + '\'';
				}
				// TAP>LAYER & TAP>MOD
				else if (func in C.KEYPLUS_DOUBLE && param_l.length == 2) {

					let first = param_l[0].replace(/ /g,'');
					let second = param_l[1].replace(/ /g,'');

					// MT(CSAG, kc)
					if (func == 'MT' && second in C.KEYPLUS_KEYCODES) {

						let tap = C.KEYPLUS_KEYCODES[second]
						let hold = first +'-none'
						keycode = '\'' + tap + '>' + hold + '\'';
						// temp Code for explicit definition of 'tap>hold'
						if (explicit.length == 0) { explicit += '\nkeycodes:\n' }
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
						if (explicit.length == 0) { explicit += '\nkeycodes:\n' }
						explicit += '  '+keycode+':\n    keycode: hold\n    delay: 200\n'
						explicit += '    tap_key: '+tap+'\n'
						explicit += '    hold_key: '+hold+'\n\n'
					}
					else keycode = '____';
				}
				else keycode = '____';
			}
		}
		// Keycodes
		else {
			if (keycode in C.KEYPLUS_KEYCODES) {

				keycode = '\'' + C.KEYPLUS_KEYCODES[keycode] + '\'';
			}
		}
		layerMap += keycode + ', ';
	}
	layerMap += '\n          ';
}


// Generate the matrix
let matrix = '';
const rowLength = String(keyboard.rows).length;
const colLength = String(keyboard.cols).length;
const space = ' '.repeat(rowLength + colLength + 3);

for (let row = 0; row < keyboard.rows; row ++) {
	let rowString = '';
	for (let col = 0; col < keyboard.cols; col ++) {
		if (keyboard.wiring[row + ',' + col]) { rowString += 'r' + String(row) + 'c' + String(col) + ', '; }
		else { rowString += space; }
	}
	matrix += '        ' + rowString + '\n';
}
matrix = matrix.substring(0, matrix.length - 4);
*/
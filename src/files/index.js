//const RulesMKGenerator = require('./generators/rules.mk');
//const ConfigHGenerator = require('./generators/config.h');
//const KbHGenerator = require('./generators/kb.h');
//const KeymapCGenerator = require('./generators/keymap.c');
const KeyplusYGenerator = require('./generators/layout.yaml');

class Files {

	/*
	 * Generate the set of source files given a Keyboard.
	 *
	 * @param {Keyboard} keyboard The keyboard to generate files from.
	 *
	 * @return {Object} The generated source files.
	 */
	static generate(keyboard) {
		return {
			'layout.yaml': new KeyplusYGenerator(keyboard).generate(),
		};
	}

}

module.exports = Files;

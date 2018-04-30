class Template {

	/*
	 * Constructor for a keycode template.
	 *
	 * @param {List} raw The raw template format to be used for display.
	 * @param {String} formatted The formatted string to be used for code generation.
	 * @param {String} display The formatted string to be used for display.
	 */
	constructor(raw, formatted, display) {
		this.raw = raw;
		this.formatted = formatted;
		this.display = display;

		// Get the fields in the template.
		this.fields = [];
		for (let i = 1; i < raw.length; i ++) {
			this.fields.push(raw[i]);
		}

		// Bind functions.
		this.getCode = this.getCode.bind(this);
		this.getName = this.getName.bind(this);
	}

	/*
	 * Get the formatted code.
	 *
	 * @param {List} field The fields.
	 *
	 * @return {String} The formatted code.
	 */
	getCode(fields) {
		let code = this.formatted;

		// Simple formatted string replacement.
		for (let i = 0; i < this.fields.length; i ++) {
			code = code.replace(new RegExp('%' + (i + 1), 'g'), fields[i]);
		}

		return code;
	}

	/*
	 * Get the formatted name.
	 *
	 * @param {List} field The fields.
	 *
	 * @return {String} The formatted name.
	 */
	getName(fields) {
		let code = this.display;

		// Simple formatted string replacement.
		for (let i = 0; i < this.fields.length; i ++) {
			code = code.replace(new RegExp('%' + (i + 1), 'g'), fields[i]);
		}

		return code;
	}

}

class Keycode {

	/*
	 * Constructor for a keycode.
	 *
	 * @param {Object, String} template The template for the keycode.
	 * @param {String} display How the keycode is displayed on the display.
	 * @param {List} aliases Aliases for the keycode.
	 */
	constructor(template, display, aliases) {
		this.template = template;
		this.display = display;
		this.aliases = aliases;

		if (typeof(template) === 'string' || template instanceof String) {
			// If the template is a string, then the template is just the keycode.
			this.template = new Template([ template ], template, display);
		} else {
			this.template.display = display;
		}
	}

}

const keycodes = {
	// Raw keycodes.
	'KC_NO': new Keycode('KC_NO', 'NO', []),
	'KC_TRNS': new Keycode('KC_TRNS', 'TRNS', []),
	'KC_ROLL_OVER': new Keycode('KC_ROLL_OVER', 'ROLL_OVER', []),
	'KC_POST_FAIL': new Keycode('KC_POST_FAIL', 'POST_FAIL', []),
	'KC_GESC': new Keycode('KC_GESC', 'esc`', []),
	'KC_A': new Keycode('KC_A', 'A', []),
	'KC_B': new Keycode('KC_B', 'B', []),
	'KC_C': new Keycode('KC_C', 'C', []),
	'KC_D': new Keycode('KC_D', 'D', []),
	'KC_E': new Keycode('KC_E', 'E', []),
	'KC_F': new Keycode('KC_F', 'F', []),
	'KC_G': new Keycode('KC_G', 'G', []),
	'KC_H': new Keycode('KC_H', 'H', []),
	'KC_I': new Keycode('KC_I', 'I', []),
	'KC_J': new Keycode('KC_J', 'J', []),
	'KC_K': new Keycode('KC_K', 'K', []),
	'KC_L': new Keycode('KC_L', 'L', []),
	'KC_M': new Keycode('KC_M', 'M', []),
	'KC_N': new Keycode('KC_N', 'N', []),
	'KC_O': new Keycode('KC_O', 'O', []),
	'KC_P': new Keycode('KC_P', 'P', []),
	'KC_Q': new Keycode('KC_Q', 'Q', []),
	'KC_R': new Keycode('KC_R', 'R', []),
	'KC_S': new Keycode('KC_S', 'S', []),
	'KC_T': new Keycode('KC_T', 'T', []),
	'KC_U': new Keycode('KC_U', 'U', []),
	'KC_V': new Keycode('KC_V', 'V', []),
	'KC_W': new Keycode('KC_W', 'W', []),
	'KC_X': new Keycode('KC_X', 'X', []),
	'KC_Y': new Keycode('KC_Y', 'Y', []),
	'KC_Z': new Keycode('KC_Z', 'Z', []),
	'KC_1': new Keycode('KC_1', '1', []),
	'KC_2': new Keycode('KC_2', '2', []),
	'KC_3': new Keycode('KC_3', '3', []),
	'KC_4': new Keycode('KC_4', '4', []),
	'KC_5': new Keycode('KC_5', '5', []),
	'KC_6': new Keycode('KC_6', '6', []),
	'KC_7': new Keycode('KC_7', '7', []),
	'KC_8': new Keycode('KC_8', '8', []),
	'KC_9': new Keycode('KC_9', '9', []),
	'KC_0': new Keycode('KC_0', '0', []),
	'KC_ENT': new Keycode('KC_ENT', 'ENTER', ['RETURN']),
	'KC_ESC': new Keycode('KC_ESC', 'ESC', ['ESCAPE']),
	'KC_BSPC': new Keycode('KC_BSPC', 'BACKSPACE', ['BS', 'BACK SPACE', 'BACK<BR>SPACE']),
	'KC_TAB': new Keycode('KC_TAB', 'TAB', []),
	'KC_SPC': new Keycode('KC_SPC', 'SPACE', ['']),
	'KC_MINS': new Keycode('KC_MINS', '-', ['MINUS']),
	'KC_EQL': new Keycode('KC_EQL', '=', ['EQUAL']),
	'KC_LBRC': new Keycode('KC_LBRC', '[', []),
	'KC_RBRC': new Keycode('KC_RBRC', ']', []),
	'KC_BSLS': new Keycode('KC_BSLS', '\\', []),
	'KC_NUHS': new Keycode('KC_NUHS', 'NUHS', []),
	'KC_SCLN': new Keycode('KC_SCLN', ';', []),
	'KC_QUOT': new Keycode('KC_QUOT', '\'', []),
	'KC_GRV': new Keycode('KC_GRV', '`', []),
	'KC_COMM': new Keycode('KC_COMM', ',', []),
	'KC_DOT': new Keycode('KC_DOT', '.', []),
	'KC_SLSH': new Keycode('KC_SLSH', '/', []),
	'KC_CAPS': new Keycode('KC_CAPS', 'CAPS', ['CAPS LOCK']),
	'KC_F1': new Keycode('KC_F1', 'F1', []),
	'KC_F2': new Keycode('KC_F2', 'F2', []),
	'KC_F3': new Keycode('KC_F3', 'F3', []),
	'KC_F4': new Keycode('KC_F4', 'F4', []),
	'KC_F5': new Keycode('KC_F5', 'F5', []),
	'KC_F6': new Keycode('KC_F6', 'F6', []),
	'KC_F7': new Keycode('KC_F7', 'F7', []),
	'KC_F8': new Keycode('KC_F8', 'F8', []),
	'KC_F9': new Keycode('KC_F9', 'F9', []),
	'KC_F10': new Keycode('KC_F10', 'F10', []),
	'KC_F11': new Keycode('KC_F11', 'F11', []),
	'KC_F12': new Keycode('KC_F12', 'F12', []),
	'KC_PSCR': new Keycode('KC_PSCR', 'PSCR', ['PRINT', 'PRINT SCREEN', 'PRINT<BR>SCREEN', 'PRTSC']),
	'KC_SLCK': new Keycode('KC_SLCK', 'SLCK', ['SCROLL', 'SCROLL LOCK', 'SCROLL<BR>LOCK']),
	'KC_PAUS': new Keycode('KC_PAUS', 'PAUSE', ['BREAK']),
	'KC_INS': new Keycode('KC_INS', 'INS', ['INSERT']),
	'KC_HOME': new Keycode('KC_HOME', 'HOME', []),
	'KC_PGUP': new Keycode('KC_PGUP', 'PGUP', ['PAGE UP']),
	'KC_DEL': new Keycode('KC_DEL', 'DEL', ['DELETE']),
	'KC_END': new Keycode('KC_END', 'END', []),
	'KC_PGDN': new Keycode('KC_PGDN', 'PGDN', ['PAGE DOWN']),
	'KC_RGHT': new Keycode('KC_RGHT', 'RIGHT', []),
	'KC_LEFT': new Keycode('KC_LEFT', 'LEFT', []),
	'KC_DOWN': new Keycode('KC_DOWN', 'DOWN', []),
	'KC_UP': new Keycode('KC_UP', 'UP', []),
	'KC_NLCK': new Keycode('KC_NLCK', 'NLCK', ['NUM LOCK', 'NUM<BR>LOCK']),
	'KC_PSLS': new Keycode('KC_PSLS', 'P/', []),
	'KC_PAST': new Keycode('KC_PAST', 'P*', []),
	'KC_PMNS': new Keycode('KC_PMNS', 'P-', []),
	'KC_PPLS': new Keycode('KC_PPLS', 'P+', []),
	'KC_PENT': new Keycode('KC_PENT', 'PENT', []),
	'KC_P1': new Keycode('KC_P1', 'P1', []),
	'KC_P2': new Keycode('KC_P2', 'P2', []),
	'KC_P3': new Keycode('KC_P3', 'P3', []),
	'KC_P4': new Keycode('KC_P4', 'P4', []),
	'KC_P5': new Keycode('KC_P5', 'P5', []),
	'KC_P6': new Keycode('KC_P6', 'P6', []),
	'KC_P7': new Keycode('KC_P7', 'P7', []),
	'KC_P8': new Keycode('KC_P8', 'P8', []),
	'KC_P9': new Keycode('KC_P9', 'P9', []),
	'KC_P0': new Keycode('KC_P0', 'P0', []),
	'KC_PDOT': new Keycode('KC_PDOT', 'P.', []),
	'KC_NUBS': new Keycode('KC_NUBS', 'NUBS', []),
	'KC_APP': new Keycode('KC_APP', 'APP', []),
	'KC_POWER': new Keycode('KC_POWER', '_POWER', []),
	'KC_PEQL': new Keycode('KC_PEQL', 'P=', []),
	'KC_F13': new Keycode('KC_F13', 'F13', []),
	'KC_F14': new Keycode('KC_F14', 'F14', []),
	'KC_F15': new Keycode('KC_F15', 'F15', []),
	'KC_F16': new Keycode('KC_F16', 'F16', []),
	'KC_F17': new Keycode('KC_F17', 'F17', []),
	'KC_F18': new Keycode('KC_F18', 'F18', []),
	'KC_F19': new Keycode('KC_F19', 'F19', []),
	'KC_F20': new Keycode('KC_F20', 'F20', []),
	'KC_F21': new Keycode('KC_F21', 'F21', []),
	'KC_F22': new Keycode('KC_F22', 'F22', []),
	'KC_F23': new Keycode('KC_F23', 'F23', []),
	'KC_F24': new Keycode('KC_F24', 'F24', []),
	'KC_EXECUTE': new Keycode('KC_EXECUTE', 'EXECUTE', []),
	'KC_HELP': new Keycode('KC_HELP', 'HELP', []),
	'KC_MENU': new Keycode('KC_MENU', 'MENU', []),
	'KC_SELECT': new Keycode('KC_SELECT', 'SELECT', []),
	'KC_STOP': new Keycode('KC_STOP', 'STOP', []),
	'KC_AGAIN': new Keycode('KC_AGAIN', 'AGAIN', []),
	'KC_UNDO': new Keycode('KC_UNDO', 'UNDO', []),
	'KC_CUT': new Keycode('KC_CUT', 'CUT', []),
	'KC_COPY': new Keycode('KC_COPY', 'COPY', []),
	'KC_PASTE': new Keycode('KC_PASTE', 'PASTE', []),
	'KC_FIND': new Keycode('KC_FIND', 'FIND', []),
	'KC__MUTE': new Keycode('KC__MUTE', '_MUTE', []),
	'KC__VOLUP': new Keycode('KC__VOLUP', '_VOLUP', []),
	'KC__VOLDOWN': new Keycode('KC__VOLDOWN', '_VOLDOWN', []),
	'KC_LOCKING_CAPS': new Keycode('KC_LOCKING_CAPS', 'LOCKING_CAPS', []),
	'KC_LOCKING_NUM': new Keycode('KC_LOCKING_NUM', 'LOCKING_NUM', []),
	'KC_LOCKING_SCROLL': new Keycode('KC_LOCKING_SCROLL', 'LOCKING_SCROLL', []),
	'KC_PCMM': new Keycode('KC_PCMM', 'PCMM', []),
	'KC_KP_EQUAL_AS400': new Keycode('KC_KP_EQUAL_AS400', 'KP_EQUAL_AS400', []),
	'KC_RO': new Keycode('KC_RO', 'RO', []),
	'KC_KANA': new Keycode('KC_KANA', 'KANA', []),
	'KC_JYEN': new Keycode('KC_JYEN', 'JYEN', []),
	'KC_HENK': new Keycode('KC_HENK', 'HENK', []),
	'KC_MHEN': new Keycode('KC_MHEN', 'MHEN', []),
	'KC_INT6': new Keycode('KC_INT6', 'INT6', []),
	'KC_INT7': new Keycode('KC_INT7', 'INT7', []),
	'KC_INT8': new Keycode('KC_INT8', 'INT8', []),
	'KC_INT9': new Keycode('KC_INT9', 'INT9', []),
	'KC_LANG1': new Keycode('KC_LANG1', 'LANG1', []),
	'KC_LANG2': new Keycode('KC_LANG2', 'LANG2', []),
	'KC_LANG3': new Keycode('KC_LANG3', 'LANG3', []),
	'KC_LANG4': new Keycode('KC_LANG4', 'LANG4', []),
	'KC_LANG5': new Keycode('KC_LANG5', 'LANG5', []),
	'KC_LANG6': new Keycode('KC_LANG6', 'LANG6', []),
	'KC_LANG7': new Keycode('KC_LANG7', 'LANG7', []),
	'KC_LANG8': new Keycode('KC_LANG8', 'LANG8', []),
	'KC_LANG9': new Keycode('KC_LANG9', 'LANG9', []),
	'KC_ALT_ERASE': new Keycode('KC_ALT_ERASE', 'ALT_ERASE', []),
	'KC_SYSREQ': new Keycode('KC_SYSREQ', 'SYSREQ', []),
	'KC_CANCEL': new Keycode('KC_CANCEL', 'CANCEL', []),
	'KC_CLEAR': new Keycode('KC_CLEAR', 'CLEAR', []),
	'KC_PRIOR': new Keycode('KC_PRIOR', 'PRIOR', []),
	'KC_RETURN': new Keycode('KC_RETURN', '_RETURN', []),
	'KC_SEPARATOR': new Keycode('KC_SEPARATOR', 'SEPARATOR', []),
	'KC_OUT': new Keycode('KC_OUT', 'OUT', []),
	'KC_OPER': new Keycode('KC_OPER', 'OPER', []),
	'KC_CLEAR_AGAIN': new Keycode('KC_CLEAR_AGAIN', 'CLEAR_AGAIN', []),
	'KC_CRSEL': new Keycode('KC_CRSEL', 'CRSEL', []),
	'KC_EXSEL': new Keycode('KC_EXSEL', 'EXSEL', []),
	'KC_LCTL': new Keycode('KC_LCTL', 'LCTRL', ['CTRL', 'CONTROL']),
	'KC_LSFT': new Keycode('KC_LSFT', 'LSHIFT', ['SHIFT']),
	'KC_LALT': new Keycode('KC_LALT', 'LALT', ['ALT']),
	'KC_LGUI': new Keycode('KC_LGUI', 'LGUI', ['GUI', 'WIN', 'SUPER']),
	'KC_RCTL': new Keycode('KC_RCTL', 'RCTRL', []),
	'KC_RSFT': new Keycode('KC_RSFT', 'RSHIFT', []),
	'KC_RALT': new Keycode('KC_RALT', 'RALT', ['META']),
	'KC_RGUI': new Keycode('KC_RGUI', 'RGUI', []),
	'KC_PWR': new Keycode('KC_PWR', 'POWER', []),
	'KC_SLEP': new Keycode('KC_SLEP', 'SLEEP', []),
	'KC_WAKE': new Keycode('KC_WAKE', 'WAKE', []),
	'KC_MUTE': new Keycode('KC_MUTE', 'MUTE', []),
	'KC_VOLU': new Keycode('KC_VOLU', 'VOLU', ['VOLUME UP']),
	'KC_VOLD': new Keycode('KC_VOLD', 'VOLD', ['VOLUME DOWN']),
	'KC_MNXT': new Keycode('KC_MNXT', 'NEXT', []),
	'KC_MPRV': new Keycode('KC_MPRV', 'PREV', ['PREVIOUS']),
	'KC_MSTP': new Keycode('KC_MSTP', 'STOP', []),
	'KC_MPLY': new Keycode('KC_MPLY', 'PLAY', []),
	'KC_MSEL': new Keycode('KC_MSEL', 'SEL', ['SELECT']),
	'KC_MAIL': new Keycode('KC_MAIL', 'MAIL', []),
	'KC_CALC': new Keycode('KC_CALC', 'CALC', ['CALCULATOR']),
	'KC_MYCM': new Keycode('KC_MYCM', 'MYCM', ['MY COMPUTER']),
	'KC_WSCH': new Keycode('KC_WSCH', 'WSCH', []),
	'KC_WHOM': new Keycode('KC_WHOM', 'WHOM', []),
	'KC_WBAK': new Keycode('KC_WBAK', 'WBAK', []),
	'KC_WFWD': new Keycode('KC_WFWD', 'WFWD', []),
	'KC_WSTP': new Keycode('KC_WSTP', 'WSTP', []),
	'KC_WREF': new Keycode('KC_WREF', 'WREF', []),
	'KC_WFAV': new Keycode('KC_WFAV', 'WFAV', []),
	'KC_MS_U': new Keycode('KC_MS_U', 'MS_U', []),
	'KC_MS_D': new Keycode('KC_MS_D', 'MS_D', []),
	'KC_MS_L': new Keycode('KC_MS_L', 'MS_L', []),
	'KC_MS_R': new Keycode('KC_MS_R', 'MS_R', []),
	'KC_BTN1': new Keycode('KC_BTN1', 'BTN1', []),
	'KC_BTN2': new Keycode('KC_BTN2', 'BTN2', []),
	'KC_BTN3': new Keycode('KC_BTN3', 'BTN3', []),
	'KC_BTN4': new Keycode('KC_BTN4', 'BTN4', []),
	'KC_BTN5': new Keycode('KC_BTN5', 'BTN5', []),
	'KC_WH_U': new Keycode('KC_WH_U', 'WH_U', []),
	'KC_WH_D': new Keycode('KC_WH_D', 'WH_D', []),
	'KC_WH_L': new Keycode('KC_WH_L', 'WH_L', []),
	'KC_WH_R': new Keycode('KC_WH_R', 'WH_R', []),
	'KC_ACL0': new Keycode('KC_ACL0', 'ACL0', []),
	'KC_ACL1': new Keycode('KC_ACL1', 'ACL1', []),
	'RESET': new Keycode('RESET', 'RESET', []),
	'BL_0': new Keycode('BL_0', 'BL_0', []),
	'BL_1': new Keycode('BL_1', 'BL_1', []),
	'BL_2': new Keycode('BL_2', 'BL_2', []),
	'BL_3': new Keycode('BL_3', 'BL_3', []),
	'BL_4': new Keycode('BL_4', 'BL_4', []),
	'BL_5': new Keycode('BL_5', 'BL_5', []),
	'BL_6': new Keycode('BL_6', 'BL_6', []),
	'BL_7': new Keycode('BL_7', 'BL_7', []),
	'BL_8': new Keycode('BL_8', 'BL_8', []),
	'BL_9': new Keycode('BL_9', 'BL_9', []),
	'BL_10': new Keycode('BL_10', 'BL_10', []),
	'BL_11': new Keycode('BL_11', 'BL_11', []),
	'BL_12': new Keycode('BL_12', 'BL_12', []),
	'BL_13': new Keycode('BL_13', 'BL_13', []),
	'BL_14': new Keycode('BL_14', 'BL_14', []),
	'BL_15': new Keycode('BL_15', 'BL_15', []),
	'BL_DEC': new Keycode('BL_DEC', 'BL_DEC', []),
	'BL_INC': new Keycode('BL_INC', 'BL_INC', []),
	'BL_TOGG': new Keycode('BL_TOGG', 'BL_TOGG', []),
	'BL_STEP': new Keycode('BL_STEP', 'BL_STEP', []),
	'RGB_TOG': new Keycode('RGB_TOG', 'RGB_TOG', []),
	'RGB_MOD': new Keycode('RGB_MOD', 'RGB_MOD', []),
	'RGB_HUI': new Keycode('RGB_HUI', 'RGB_HUI', []),
	'RGB_HUD': new Keycode('RGB_HUD', 'RGB_HUD', []),
	'RGB_SAI': new Keycode('RGB_SAI', 'RGB_SAI', []),
	'RGB_SAD': new Keycode('RGB_SAD', 'RGB_SAD', []),
	'RGB_VAI': new Keycode('RGB_VAI', 'RGB_VAI', []),
	'RGB_VAD': new Keycode('RGB_VAD', 'RGB_VAD', []),
	'KC_LSPO': new Keycode('KC_LSPO', 'LSPO', []),
	'KC_RSPC': new Keycode('KC_RSPC', 'RSPC', []),
	'KC_TILD': new Keycode('KC_TILD', '~', ['TILDE']),
	'KC_EXLM': new Keycode('KC_EXLM', '!', []),
	'KC_AT': new Keycode('KC_AT', '@', []),
	'KC_HASH': new Keycode('KC_HASH', '#', []),
	'KC_DLR': new Keycode('KC_DLR', '$', []),
	'KC_PERC': new Keycode('KC_PERC', '%', []),
	'KC_CIRC': new Keycode('KC_CIRC', '^', []),
	'KC_AMPR': new Keycode('KC_AMPR', '&', []),
	'KC_ASTR': new Keycode('KC_ASTR', '*', []),
	'KC_LPRN': new Keycode('KC_LPRN', '(', []),
	'KC_RPRN': new Keycode('KC_RPRN', ')', []),
	'KC_UNDS': new Keycode('KC_UNDS', '_', []),
	'KC_PLUS': new Keycode('KC_PLUS', '+', []),
	'KC_LCBR': new Keycode('KC_LCBR', '{', []),
	'KC_RCBR': new Keycode('KC_RCBR', '}', []),
	'KC_LABK': new Keycode('KC_LABK', '<', []),
	'KC_RABK': new Keycode('KC_RABK', '>', []),
	'KC_COLN': new Keycode('KC_COLN', ':', []),
	'KC_PIPE': new Keycode('KC_PIPE', '|', []),
	'KC_QUES': new Keycode('KC_QUES', '?', []),
	'KC_DQUO': new Keycode('KC_DQUO', '"', []),
	'KC_HYPR': new Keycode('KC_HYPR', 'HYPER', []),
	'KC_MEH': new Keycode('KC_MEH', 'MEH', []),

	// Modifiers.
	'LCTL()': new Keycode(new Template(['LCTL', 'KEY'], 'LCTL(%1)'), 'LCTRL + %1', []),
	'LSFT()': new Keycode(new Template(['LSFT', 'KEY'], 'LSFT(%1)'), 'LSHIFT + %1', []),
	'LALT()': new Keycode(new Template(['LALT', 'KEY'], 'LALT(%1)'), 'LALT + %1', []),
	'LGUI()': new Keycode(new Template(['LGUI', 'KEY'], 'LGUI(%1)'), 'LGUI + %1', []),
	'RCTL()': new Keycode(new Template(['RCTL', 'KEY'], 'RCTL(%1)'), 'RCTRL + %1', []),
	'RSFT()': new Keycode(new Template(['RSFT', 'KEY'], 'RSFT(%1)'), 'RSHIFT + %1', []),
	'RALT()': new Keycode(new Template(['RALT', 'KEY'], 'RALT(%1)'), 'RALT + %1', []),
	'RGUI()': new Keycode(new Template(['RGUI', 'KEY'], 'RGUI(%1)'), 'RGUI + %1', []),
	'HYPR()': new Keycode(new Template(['HYPR', 'KEY'], 'HYPR(%1)'), 'HYPER + %1', []),
	'MEH()': new Keycode(new Template(['MEH', 'KEY'], 'MEH(%1)'), 'MEH + %1', []),
	'LCAG()': new Keycode(new Template(['LCAG', 'KEY'], 'LCAG(%1)'), 'LCAG + %1', []),
	'ALTG()': new Keycode(new Template(['ALTG', 'KEY'], 'ALTG(%1)'), 'ALTGR + %1', []),
	'LT()': new Keycode(new Template(['LT', 'LAYER', 'KEY'], 'LT(%1, %2)'), 'LT(%1, %2)', []),
	'TO()': new Keycode(new Template(['TO', 'LAYER'], 'TO(%1)'), 'TO(%1)', []),
	'MO()': new Keycode(new Template(['MO', 'LAYER'], 'MO(%1)'), 'MO(%1)', []),
	'DF()': new Keycode(new Template(['DF', 'LAYER'], 'DF(%1)'), 'DF(%1)', []),
	'TG()': new Keycode(new Template(['TG', 'LAYER'], 'TG(%1)'), 'TG(%1)', []),
	'OSL()': new Keycode(new Template(['OSL', 'LAYER'], 'OSL(%1)'), 'OSL(%1)', []),
	'OSM()': new Keycode(new Template(['OSM', 'MOD'], 'OSM(%1)'), 'OSM(%1)', []),
	'MT()': new Keycode(new Template(['MT', 'MOD', 'KEY'], 'MT(%1, %2)'), 'MT(%1, %2)', []),
	'CTL_T()': new Keycode(new Template(['CTL_T', 'KEY'], 'CTL_T(%1)'), 'CTRL_T(%1)', []),
	'SFT_T()': new Keycode(new Template(['SFT_T', 'KEY'], 'SFT_T(%1)'), 'SHIFT_T(%1)', []),
	'ALT_T()': new Keycode(new Template(['ALT_T', 'KEY'], 'ALT_T(%1)'), 'ALT_T(%1)', []),
	'GUI_T()': new Keycode(new Template(['GUI_T', 'KEY'], 'GUI_T(%1)'), 'GUI_T(%1)', []),
	'C_S_T()': new Keycode(new Template(['C_S_T', 'KEY'], 'C_S_T(%1)'), 'C_S_T(%1)', []),
	'MEH_T()': new Keycode(new Template(['MEH_T', 'KEY'], 'MEH_T(%1)'), 'MEH_T(%1)', []),
	'LCAG_T()': new Keycode(new Template(['LCAG_T', 'KEY'], 'LCAG_T(%1)'), 'LCAG_T(%1)', []),
	'ALL_T()': new Keycode(new Template(['ALL_T', 'KEY'], 'ALL_T(%1)'), 'ALL_T(%1)', []),
	'M()': new Keycode(new Template(['M', 'MACRO'], 'M(%1)'), 'MACRO(%1)', [])
};

// Generate aliases.
const aliases = {};
for (const code in keycodes) {
	if (code.includes('()')) continue; // No modifier aliases.

	// Add aliases.
	const keycode = keycodes[code];
	aliases[code] = keycode;
	aliases[keycode.display] = keycode;
	for (const alias of keycode.aliases) {
		aliases[alias] = keycode;
	}
}

// Categories.
const categories = {
	'PRIMARY': [
		'KC_1', 'KC_2', 'KC_3', 'KC_4', 'KC_5', 'KC_6', 'KC_7', 'KC_8', 'KC_9', 'KC_0', '',

		'KC_A', 'KC_B', 'KC_C', 'KC_D', 'KC_E', 'KC_F', 'KC_G', 'KC_H', 'KC_I', 'KC_J', 'KC_K', 'KC_L', 'KC_M',
		'KC_N', 'KC_O', 'KC_P', 'KC_Q', 'KC_R', 'KC_S', 'KC_T', 'KC_U', 'KC_V', 'KC_W', 'KC_X', 'KC_Y', 'KC_Z', '',

		'KC_NUHS', 'KC_NUBS', '',

		'KC_MINS', 'KC_EQL', 'KC_LBRC', 'KC_RBRC', 'KC_BSLS', 'KC_SCLN', 'KC_QUOT', 'KC_GRV', 'KC_COMM', 'KC_DOT', 'KC_SLSH', '',

		'KC_ENT', 'KC_ESC', 'KC_BSPC', 'KC_TAB', 'KC_SPC', 'KC_CAPS', 'KC_APP', '',

		'KC_LCTL', 'KC_LSFT', 'KC_LALT', 'KC_LGUI', 'KC_RCTL', 'KC_RSFT', 'KC_RALT', 'KC_RGUI', '',

		'KC_TRNS', 'KC_NO', 'RESET'
	],

	'SECONDARY': [
		'KC_EXLM', 'KC_AT', 'KC_HASH', 'KC_DLR', 'KC_PERC', 'KC_CIRC', 'KC_AMPR', 'KC_ASTR', 'KC_LPRN', 'KC_RPRN', '',

		'KC_UNDS', 'KC_PLUS', 'KC_LCBR', 'KC_RCBR', 'KC_PIPE', 'KC_COLN', 'KC_DQUO', 'KC_TILD', 'KC_LABK', 'KC_RABK', 'KC_QUES', '',

		'KC_F1', 'KC_F2', 'KC_F3', 'KC_F4', 'KC_F5', 'KC_F6', 'KC_F7', 'KC_F8', 'KC_F9', 'KC_F10', 'KC_F11', 'KC_F12',
		'KC_F13', 'KC_F14', 'KC_F15', 'KC_F16', 'KC_F17', 'KC_F18', 'KC_F19', 'KC_F20', 'KC_F21', 'KC_F22', 'KC_F23', 'KC_F24', '',

		'KC_PSCR', 'KC_SLCK', 'KC_PAUS', '',

		'KC_INS', 'KC_DEL', 'KC_HOME', 'KC_END', 'KC_PGUP', 'KC_PGDN', 'KC_LEFT', 'KC_DOWN', 'KC_UP', 'KC_RGHT', '',

		'KC_PWR', 'KC_SLEP', 'KC_WAKE', 'KC_MUTE', 'KC_VOLD', 'KC_VOLU', 'KC_MPLY', 'KC_MSTP', 'KC_MPRV', 'KC_MNXT'
	],

	'KEYPAD': [
		'KC_NLCK', 'KC_PSLS', 'KC_PAST', 'KC_PMNS', 'KC_PPLS', 'KC_PDOT', 'KC_PEQL', 'KC_PENT', '',

		'KC_P1', 'KC_P2', 'KC_P3', 'KC_P4', 'KC_P5', 'KC_P6', 'KC_P7', 'KC_P8', 'KC_P9', 'KC_P0'
	],

	'LIGHTING': [
		//'BL_TOGG', 'BL_DEC', 'BL_INC', 'BL_STEP', '',

		//'RGB_TOG', 'RGB_MOD', 'RGB_HUI', 'RGB_HUD', 'RGB_SAI', 'RGB_SAD', 'RGB_VAI', 'RGB_VAD'
	],

	'FN': [
		'KC_GESC', 'LCTL()', 'LSFT()', 'LALT()', 'LGUI()', 'RCTL()', 'RSFT()', 'RALT()', 'RGUI()', 'HYPR()', 'MEH()', 'LCAG()', 'ALTG()', '',

		'LT()', 'TO()', 'MO()', 'DF()', 'TG()', 'OSL()', 'OSM()', 'MT()', '',

		'CTL_T()', 'SFT_T()', 'ALT_T()', 'GUI_T()', 'C_S_T()', 'MEH_T()', 'LCAG_T()', 'ALL_T()', '',

		'M()'
	]
};

// Generate reverse categories.
const reverseCategories = {};
for (const category in categories) {
	for (const keycode of categories[category]) {
		reverseCategories[keycode] = category;
	}
}

// Keycode numbers.
const numbers = {
	8: 'KC_BSPC',
	9: 'KC_TAB',
	13: 'KC_ENT',
	16: 'KC_LSFT',
	17: 'KC_LCTL',
	18: 'KC_LALT',
	19: 'KC_PAUS',
	20: 'KC_CAPS',
	27: 'KC_ESC',
	32: 'KC_SPC',
	33: 'KC_PGUP',
	34: 'KC_PGDN',
	35: 'KC_END',
	36: 'KC_HOME',
	37: 'KC_LEFT',
	38: 'KC_UP',
	39: 'KC_RGHT',
	40: 'KC_DOWN',
	45: 'KC_INS',
	46: 'KC_DEL',
	48: 'KC_0',
	49: 'KC_1',
	50: 'KC_2',
	51: 'KC_3',
	52: 'KC_4',
	53: 'KC_5',
	54: 'KC_6',
	55: 'KC_7',
	56: 'KC_8',
	57: 'KC_9',
	65: 'KC_A',
	66: 'KC_B',
	67: 'KC_C',
	68: 'KC_D',
	69: 'KC_E',
	70: 'KC_F',
	71: 'KC_G',
	72: 'KC_H',
	73: 'KC_I',
	74: 'KC_J',
	75: 'KC_K',
	76: 'KC_L',
	77: 'KC_M',
	78: 'KC_N',
	79: 'KC_O',
	80: 'KC_P',
	81: 'KC_Q',
	82: 'KC_R',
	83: 'KC_S',
	84: 'KC_T',
	85: 'KC_U',
	86: 'KC_V',
	87: 'KC_W',
	88: 'KC_X',
	89: 'KC_Y',
	90: 'KC_Z',
	91: 'KC_LGUI',
	93: 'KC_RGUI',
	96: 'KC_P0',
	97: 'KC_P1',
	98: 'KC_P2',
	99: 'KC_P3',
	100: 'KC_P4',
	101: 'KC_P5',
	102: 'KC_P6',
	103: 'KC_P7',
	104: 'KC_P8',
	105: 'KC_P9',
	106: 'KC_PAST',
	107: 'KC_PPLS',
	109: 'KC_PMNS',
	110: 'KC_PDOT',
	111: 'KC_PSLS',
	112: 'KC_F1',
	113: 'KC_F2',
	114: 'KC_F3',
	115: 'KC_F4',
	116: 'KC_F5',
	117: 'KC_F6',
	118: 'KC_F7',
	119: 'KC_F8',
	120: 'KC_F9',
	121: 'KC_F10',
	122: 'KC_F11',
	123: 'KC_F12',
	144: 'KC_NLCK',
	145: 'KC_SLCK',
	186: 'KC_SCLN',
	187: 'KC_EQL',
	188: 'KC_COMM',
	189: 'KC_MINS',
	190: 'KC_DOT',
	191: 'KC_SLSH',
	192: 'KC_GRV',
	219: 'KC_LBRC',
	220: 'KC_BSLS',
	221: 'KC_RBRC',
	222: 'KC_QUOT'
};

// Special keycodes.
const special = [
	'RESET',
	'KC_EXLM', 'KC_AT', 'KC_HASH', 'KC_DLR', 'KC_PERC', 'KC_CIRC', 'KC_AMPR', 'KC_ASTR', 'KC_LPRN', 'KC_RPRN',
	'KC_UNDS', 'KC_PLUS', 'KC_LCBR', 'KC_RCBR', 'KC_PIPE', 'KC_COLN', 'KC_DQUO', 'KC_TILD', 'KC_LABK', 'KC_RABK', 'KC_QUES'
];

// Recommended keycodes.
const recommended = [
	'KC_A', 'KC_B', 'KC_C', 'KC_D', 'KC_E', 'KC_F', 'KC_G', 'KC_H', 'KC_I', 'KC_J', 'KC_K', 'KC_L', 'KC_M',
	'KC_N', 'KC_O', 'KC_P', 'KC_Q', 'KC_R', 'KC_S', 'KC_T', 'KC_U', 'KC_V', 'KC_W', 'KC_X', 'KC_Y', 'KC_Z',
	'KC_0', 'KC_1', 'KC_2', 'KC_3', 'KC_4', 'KC_5', 'KC_6', 'KC_7', 'KC_8', 'KC_9',
	'KC_SPC'
];

// Convert final output
const keyplus_keycodes = {
    "KC_NO" : "no",
    "KC_TRNS" : "____",
    "RESET" : "boot",
    "KC_GESC" : "gesc",

    // Alphas
    "KC_GRV" : "grv",
    "KC_1" : "1",
    "KC_2" : "2",
    "KC_3" : "3",
    "KC_4" : "4",
    "KC_5" : "5",
    "KC_6" : "6",
    "KC_7" : "7",
    "KC_8" : "8",
    "KC_9" : "9",
    "KC_0" : "0",
    "KC_MINS" : "min",
    "KC_EQL" : "equ",
    "KC_Q" : "q",
    "KC_W" : "w",
    "KC_E" : "e",
    "KC_R" : "r",
    "KC_T" : "t",
    "KC_Y" : "y",
    "KC_U" : "u",
    "KC_I" : "i",
    "KC_O" : "o",
    "KC_P" : "p",
    "KC_LBRC" : "lbrc",
    "KC_RBRC" : "rbrc",
    "KC_BSLS" : "bsls",
    "KC_A" : "a",
    "KC_S" : "s",
    "KC_D" : "d",
    "KC_F" : "f",
    "KC_G" : "g",
    "KC_H" : "h",
    "KC_J" : "j",
    "KC_K" : "k",
    "KC_L" : "l",
    "KC_SCLN" : "scln",
    "KC_QUOT" : "quot",
    "KC_Z" : "z",
    "KC_X" : "x",
    "KC_C" : "c",
    "KC_V" : "v",
    "KC_B" : "b",
    "KC_N" : "n",
    "KC_M" : "m",
    "KC_COMM" : "comm",
    "KC_DOT" : "dot",
    "KC_SLSH" : "fsls",
    "KC_SPC" : "spc",

    // Modifiers
    "KC_RCTL" : "rctl",
    "KC_LCTL" : "lctl",
    "KC_RSFT" : "rsft",
    "KC_LSFT" : "lsft",
    "KC_LGUI" : "lgui",
    "KC_LCMD" : "lgui",
    "KC_RGUI" : "rgui",
    "KC_LALT" : "lalt",
    "KC_RALT" : "ralt",
    "KC_BSPC" : "bspc",
    "KC_ENT" : "ent",
    "KC_TAB" : "tab",
    "KC_CAPS" : "caps",
    "KC_RGHT" : "rght",
    "KC_UP" : "up",
    "KC_DOWN" : "down",
    "KC_LEFT" : "left",
    // Function 
    "KC_ESC" : "esc",
    "KC_F1" : "f1",
    "KC_F2" : "f2",
    "KC_F3" : "f3",
    "KC_F4" : "f4",
    "KC_F5" : "f5",
    "KC_F6" : "f6",
    "KC_F7" : "f7",
    "KC_F8" : "f8",
    "KC_F9" : "f9",
    "KC_F10" : "f10",
    "KC_F11" : "f11",
    "KC_F12" : "f12",
    "KC_PSCR" : "pscr",
    "KC_SLCK" : "slck",
    "KC_PAUS" : "paus",
    "KC_INS" : "ins",
    "KC_DEL" : "del",
    "KC_HOME" : "home",
    "KC_END" : "end",
    "KC_PGUP" : "pgup",
    "KC_PGDN" : "pgdn",
    "KC_F13" : "f13",
    "KC_F14" : "f14",
    "KC_F15" : "f15",
    "KC_F16" : "f16",
    "KC_F17" : "f17",
    "KC_F18" : "f18",
    "KC_F19" : "f19",
    "KC_F20" : "f20",
    "KC_F21" : "f21",
    "KC_F22" : "f22",
    "KC_F23" : "f23",
    "KC_F24" : "f24",
    // Shifted
    "KC_TILD" : "~",
    "KC_EXLM" : "!",
    "KC_AT" : "@",
    "KC_HASH" : "#",
    "KC_DLR" : "$",
    "KC_PERC" : "%",
    "KC_CIRC" : "^",
    "KC_AMPR" : "&",
    "KC_ASTR" : "*",
    "KC_LPRN" : "(",
    "KC_RPRN" : ")",
    "KC_UNDS" : "_",
    "KC_PLUS" : "+",
    "KC_LCBR" : "{",
    "KC_RCBR" : "}",
    "KC_PIPE" : "|",
    "KC_COLN" : ":",
    "KC_DQUO" : "\"",
    "KC_LABK" : "<",
    "KC_RABK" : ">",
    "KC_QUES" : "?",

    // Numpad
    "KC_NLCK" : "nlck",
    "KC_P1" : "kp_1",
    "KC_P2" : "kp_2",
    "KC_P3" : "kp_3",
    "KC_P4" : "kp_4",
    "KC_P5" : "kp_5",
    "KC_P6" : "kp_6",
    "KC_P7" : "kp_7",
    "KC_P8" : "kp_8",
    "KC_P9" : "kp_9",
    "KC_P0" : "kp_0",
    "KC_PDOT" : "kp_.",
    "KC_PCMM" : "kp_,",
    "KC_PSLS" : "kp_/",
    "KC_PAST" : "kp_*",
    "KC_PMNS" : "kp_-",
    "KC_PPLS" : "kp_+",
    "KC_PEQL" : "kp_=",
    "KC_PENT" : "kp_ent",
    // Misc Functions
    "KC_APP" : "app",
    "KC_EXECUTE" : "execute",
    "KC_SELECT" : "select",
    "KC_AGAIN" : "again",
    "KC_HELP" : "help",
    "KC_MENU" : "hid_menu",
    "KC_UNDO" : "undo",
    "KC_CUT" : "cut",
    "KC_COPY" : "copy",
    "KC_PASTE" : "paste",
    "KC_FIND" : "find",
    "KC_ALT_ERASE" : "alternate_erase",
    "KC_CANCEL" : "cancel",
    "KC_SYSREQ" : "sys_req",
    "KC_PRIOR" : "prior",
    "KC_SEPERATOR" : "separator",
    "KC_RETURN" : "return",
    "KC_OUT" : " out",
    "KC_OPER" : "oper",
    "KC_CLEAR_AGAIN" : "clear_again",
    "KC_CRSEL" : "crsel",
    "KC_EXSEL" : "exsel",
    "KC_STOP" : "stop",

    "KC_LOCKING_CAPS" : "locking_caps_lock",
    "KC_LOCKING_NUM" : "locking_num_lock",
    "KC_LOCKING_SCROLL": "locking_scroll_lock",
    "KC_ERAS" : "alternate_erase",
    "KC_ALT_ERASE" : "alternate_erase",
    "KC_CLEAR" : "clear",
    "KC_NUHS" : "iso#",
    "KC_NUBS" : "iso\\",
    "KC_RO" : "int1",
    "KC_INT1" : "int1",
    "KC_KANA" : "int2",
    "KC_INT2" : "int2",
    "KC_JYEN" : "int3",
    "KC_INT3" : "int3",
    "KC_HENK" : "int4",
    "KC_INT4" : "int4",
    "KC_MHEN" : "int5",
    "KC_INT5" : "int5",
    "KC_INT6" : "int6",
    "KC_INT7" : "int7",
    "KC_INT8" : "int8",
    "KC_INT9" : "int9",
    "KC_HAEN" : "lang1",
    "KC_LANG1" : "lang1",
    "KC_HANJ" : "lang2",
    "KC_LANG2" : "lang2",
    "KC_LANG3" : "lang3",
    "KC_LANG4" : "lang4",
    "KC_LANG5" : "lang5",
    "KC_LANG6" : "lang6",
    "KC_LANG7" : "lang7",
    "KC_LANG8" : "lang8",
    "KC_LANG9" : "lang9",

    // Media Controls
    "KC__MUTE" : "mute",
    "KC_MUTE" : "mute",
    "KC_AUDIO_MUTE" : "mute",
    "KC_VOLU" : "volu",
    "KC__VOLUP" : "volu",
    "KC_AUDIO_VOL_UP" : "volu",
    "KC_VOLD" : "vold", 
    "KC__VOLDOWN" : "vold",
    "KC_AUDIO_VOL_DOWN": "vold",
    "KC_MNXT" : "mnxt",
    "KC_MPRV" : "mprv",
    "KC_MFFD" : "mffd",
    "KC_MRWD" : "mrwd",
    "KC_MSTP" : "mstp",
    "KC_MPLY" : "mply",
    "KC_MSEL" : "msel",
    "KC_EJCT" : "mjct",

    // WWW
    "KC_MAIL" : "mail",
    "KC_CALC" : "calc",
    "KC_MYCM" : "comp",
    "KC_WSCH" : "www_search",
    "KC_WHOM" : "www_home",
    "KC_WBAK" : "www_back",
    "KC_WFWD" : "www_forward",
    "KC_WSTP" : "www_stop",
    "KC_WREF" : "www_refresh",
    "KC_WFAV" : "www_favourites",

    // Mousekey
    "KC_MS_U" : "ms_u",
    "KC_MS_D" : "ms_d",
    "KC_MS_L" : "ms_l",
    "KC_MS_R" : "ms_r",
    "KC_BTN1" : "btn1",
    "KC_BTN2" : "btn2",
    "KC_BTN3" : "btn3",
    "KC_BTN4" : "btn4",
    "KC_BTN5" : "btn5",
    "KC_WH_U" : "wh_u",
    "KC_WH_D" : "wh_d",
    "KC_WH_L" : "wh_l",
    "KC_WH_R" : "wh_r",

    // System
    "KC_PWR" : "system_power",
    "KC_POWER" : "system_power",
    "KC_SLEP" : "system_sleep",
    "KC_WAKE" : "system_wake",

    // QMK Modifiers
    "KC_HYPR" : "csag-none",
    "KC_MEH" : "csa-none",
}

// QMK -> Keyplus Layer Functions
const keyp_layer_func = {

    "MO(" : "L",
    "TG(" : "tog_L",
    "TT(" : "L",
    "OSL(" : "s_L",
    "TO(" : "set_L",
    "DF(" : "set_L",

}

// QMK -> Keyplus Modifier functions
const keyp_mods = {
    // Mod Keys
    "LCTL(" : "C",
    "LSFT(" : "S",
    "S(" : "S",
    "LALT(" : "A",
    "LGUI(" : "G",
    "LCMD(" : "G",
    "LWIN(" : "G",
    "RCTL(" : "rC",
    "RSFT(" : "rS",
    "RALT(" : "rA",
    "RGUI(" : "rG",
    "RWIN(" : "rG",
    "RCMD(" : "rG",
    // Multi Mod Keys
    "SGUI(" : "SG",
    "SCMD(" : "SG",
    "SWIN(" : "SG",
    "LCA(" : "CA",
    "ALTG(" : "rCrA",
    "LCAG(" : "CAG",
    "MEH(" : "CSA",
    "HYPR(" : "CSAG",

    "OSM(KC_LSFT)" : "s_lsft",
    "OSM(KC_LCTL)" : "s_lctrl",
    "OSM(KC_LALT)" : "s_lalt",
    "OSM(KC_LGUI)" : "s_lgui",
    "OSM(KC_RSFT)" : "s_rsft",
    "OSM(KC_RCTL)" : "s_rctrl",
    "OSM(KC_RALT)" : "s_ralt",
    "OSM(KC_RGUI)" : "s_rgui",
}

const keyp_tap_layer = {
    "LT(" : "L",
    "LM(" : "L",
}

const keyp_tap_mod = {
    "LCTL_T(" : "C",
    "CTL_T(" : "C",
    "RCTL_T(" : "rC",  
    "LSFT_T(" : "S",
    "SFT_T(" : "S",
    "RSFT_T(" : "rS",
    "LALT_T(" : "A",
    "ALT_T(" : "A",
    "RALT_T(" : "rA",
    "ALGR_T" : "rA",
    "LGUI_T(" : "G",
    "LCMD_T(" : "G",
    "GUI_T(" : "G",
    "RGUI_T(" : "rG",
    "RCMD_T(" : "rG",
    "RWIN_T(" : "rG",
    "LCA_T(" : "CA",
    "C_S_T(" : "CS",
    "MEH_T(" : "CSA",
    "LCAG_T(" : "CAG",
    "RCAG_T(" : "rCrArG",
    "ALL_T(" : "CSAG",
    "SCMD_T(" : "SG",
}

module.exports = {

	KEYCODES: keycodes,
	ALIASES: aliases,
	CATEGORIES: categories,
	REVERSE_CATEGORIES: reverseCategories,
	NUMBERS: numbers,
	SPECIAL: special,
	RECOMMENDED: recommended,
	KEYPLUS_KEYCODES: keyplus_keycodes

};
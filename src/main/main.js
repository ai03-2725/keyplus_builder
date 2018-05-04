const React = require('react');

const Keyboard = require('state/keyboard');

const C = require('const');
const Utils = require('utils');

const YAML = require('js-yaml');

const Request = require('superagent');

class Main extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.upload = this.upload.bind(this);
		this.useKLE = this.useKLE.bind(this);
		this.usePreset = this.usePreset.bind(this);
	}

	/*
	 * Upload a Keyplus YAML
	 */
	upload() {
		const state = this.props.state;

		// Upload a file.
		Utils.readFile(contents => {
			try {
				for (let key in C.KLE_VARS) {
					let value = C.KLE_VARS[key];
					let reg = new RegExp(key, "g")
					contents = contents.replace(reg, value);
				}
				// Deserialize the contents.
				const data = YAML.safeLoad(contents);

				let devices = Object.keys(data['devices'])
				// for name in devices would go here
				let name = devices[0]
				let layout_name = data['devices'][name]['layout']

				let info = {
					'name': name,
					//'id': data['devices'][name]['id'],
					'mcu': data['devices'][name]['mcu'],
					//'layout_offset': data['devices'][name]['layout_offset'],
					'diode': data['devices'][name]['scan_mode']['mode'],
					'rows': data['devices'][name]['scan_mode']['rows'],
					'cols': data['devices'][name]['scan_mode']['cols'],
					'matrix': data['devices'][name]['scan_mode']['matrix_map'],
					'kle': data['devices'][name]['studio_kle'],
					'keymap': data['layouts'][layout_name]['layers'],
				}

				// Build a new keyboard
				const keyboard = new Keyboard(state, info, true);
				console.log(keyboard)

				state.update({
					keyboard: keyboard,
					screen: C.SCREEN_KEYMAP // Switch to the wiring screen.
				});
			} catch (e) {
				console.error(e);
				state.error('Invalid configuration');
			}
		});
	}

	/*
	 * Use KLE raw data.
	 */
	useKLE() {
		const state = this.props.state;

		try {
			const data = parser.parse('[' + state.ui.get('kle', '') + ']'); // Parse the raw data.

			// Parse the KLE data.
			const keyboard = new Keyboard(state, data, false);
			console.log(keyboard)

			// Make sure the data is valid.
			if (keyboard.keys.length == 0) {
				throw 'empty layout';
			}

			state.update({
				keyboard: keyboard,
				screen: C.SCREEN_WIRING // Switch to the wiring screen.
			});
			state.message('Loading from KLE requires manual wiring of matrix\nEnsure that row/cols correspond to actual keyboad pinout')
		} catch (e) {
			console.error(e);
			state.error('Invalid layout');
		}
	}

	/*
	 * Use a preset.
	 *
	 * @param {String} id The id of the preset.
	 */
	usePreset(id) {
		const state = this.props.state;

		Request
			.get(C.LOCAL.PRESETS + id + '.yaml')
			.end((err, res) => {
				if (err) return state.error('Unable to load preset.');

				try {
					let contents = res.text
					for (let key in C.KLE_VARS) {
						let value = C.KLE_VARS[key];
						let reg = new RegExp(key, "g")
						contents = contents.replace(reg, value);
					}
					// Deserialize the contents.
					const data = YAML.safeLoad(contents);

					let devices = Object.keys(data['devices'])
					// for name in devices would go here
					let name = devices[0]
					let layout_name = data['devices'][name]['layout']

					let info = {
						'name': name,
						//'id': data['devices'][name]['id'],
						'mcu': data['devices'][name]['mcu'],
						//'layout_offset': data['devices'][name]['layout_offset'],
						'diode': data['devices'][name]['scan_mode']['mode'],
						'rows': data['devices'][name]['scan_mode']['rows'],
						'cols': data['devices'][name]['scan_mode']['cols'],
						'matrix': data['devices'][name]['scan_mode']['matrix_map'],
						'kle': data['devices'][name]['studio_kle'],
						'keymap': data['layouts'][layout_name]['layers'],
					}

					// Build a new keyboard
					const keyboard = new Keyboard(state, info, true);
					console.log(keyboard)

					state.update({
						keyboard: keyboard,
						screen: C.SCREEN_KEYMAP // Switch to the wiring screen.
					});
				} catch (e) {
					console.error(e);
					state.error('Invalid configuration');
				}
			});
	}

	render() {
		const state = this.props.state;

		return <div>
			<h3>Upload keyplus format yaml</h3>
			<button
				className='block'
				onClick={ this.upload }>
				Upload
			</button>
			<br/><br/>
			<h3>Import from keyboard-layout-editor.com (keyboard makers only)</h3>
			<textarea
				className='kle'
				placeholder='Paste layout here...'
				value={ state.ui.get('kle', '') }
				onChange={ state.ui.set('kle') }/>
			<button
				className='block'
				onClick={ this.useKLE }>
				Import
			</button>
			<br/><br/>
			<h3>Or choose a preset layout</h3>
			{(() => {
				const presets = [];
				for (const preset in C.PRESETS) {
					presets.push(<button
						className='light block'
						onClick={ () => this.usePreset(preset) }
						key={ preset }>
						{ C.PRESETS[preset] }
					</button>);
					presets.push(<div style={{ height: '0.5rem' }} key={ '-key-' + preset }/>);
				}
				return presets;
			})()}
		</div>;
	}

}

module.exports = Main;

/*
<h3>Upload Keyboard Firmware Builder configuration</h3>
<button
	className='block'
	onClick={ this.upload }>
	Upload
</button>
<br/><br/>
*/

/*
	upload() {
		const state = this.props.state;

		// Upload a file.
		Utils.readFile(contents => {
			try {
				// Deserialize the contents.
				const deserialized = JSON.parse(contents);

				// Ensure the version is correct.
				if (deserialized.version !== C.VERSION) throw 'version mismatch';

				// Build a new keyboard.
				const keyboard = Keyboard.deserialize(state, deserialized.keyboard);
				console.log(keyboard)

				state.update({
					keyboard: keyboard,
					screen: C.SCREEN_KEYMAP // Switch to the wiring screen.
				});
			} catch (e) {
				console.error(e);
				state.error('Invalid configuration');
			}
		});
	}


	usePreset(id) {
			const state = this.props.state;

			Request
				.get(C.LOCAL.PRESETS + id + '.json')
				.end((err, res) => {
					if (err) return state.error('Unable to load preset.');

					try {
						// Deserialize the contents.
						const deserialized = JSON.parse(res.text);

						// Ensure the version is correct.
						if (deserialized.version !== C.VERSION) throw 'version mismatch';

						// Build a new keyboard.
						const keyboard = Keyboard.deserialize(state, deserialized.keyboard);

						console.log(keyboard)

						state.update({
							keyboard: keyboard,
							screen: C.SCREEN_KEYMAP // Switch to the keymap screen.
						});
					} catch (e) {
						console.error(e);
						state.error('Invalid configuration');
					}
				});
		}
*/
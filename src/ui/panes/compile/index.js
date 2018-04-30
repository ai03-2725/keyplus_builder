const React = require('react');

const Files = require('files');
const Utils = require('utils');

const Request = require('superagent');

const C = require('const');

class Compile extends React.Component {

	constructor(props) {
		super(props);

		// Bind functions.
		this.downloadZip = this.downloadZip.bind(this);
	}

	downloadZip() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		// Disable buttons.
		state.ui.set('compile-working', true);

		// Generate source files.
		const files = Files.generate(keyboard);

		// Get the firmware stencil.
		// Note: original was /files/firmware.zip
		JSZipUtils.getBinaryContent('static/files/firmware.zip', (err, data) => {
			if (err) {
				console.error(err);
				state.error('Unable to retrieve files');
				state.ui.set('compile-working', false);
				return;
			}

			JSZip.loadAsync(data).then(zip => {
				// Insert the files.
				for (const file in files) {
					zip.file(file, files[file]);
				}

				// Download the file.
				zip.generateAsync({ type: 'blob' }).then(blob => {
					// Generate a friendly name.
					const friendly = keyboard.settings.name ? Utils.generateFriendly(keyboard.settings.name) : 'layout';

					saveAs(blob, friendly + '.zip');

					// Re-enable buttons.
					state.ui.set('compile-working', false);
				}).catch(e => {
					console.error(err);
					state.error('Unable to generate files');
					state.ui.set('compile-working', false);
				});
			}).catch(e => {
				console.error(err);
				state.error('Unable to retrieve files');
				state.ui.set('compile-working', false);
			});
		});
	}

	render() {
		const state = this.props.state;
		const keyboard = state.keyboard;

		return <div className='pane-compile'>
			Download source files.
			<div style={{ height: '0.5rem' }}/>
			<button
				//className='light'
				disabled={ !keyboard.valid || state.ui.get('compile-working', false) }
				onClick={ this.downloadZip }>
				Download .zip
			</button>
		</div>;
	}

}

module.exports = Compile;

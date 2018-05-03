const React = require('react');

const Toggle = require('ui/elements/toggle');

class Mods extends React.Component {

	render() {
		const mods = this.props.mods;

		return <div>
			&nbsp;&nbsp;Mods&nbsp;&nbsp;&nbsp;
			<Toggle
				value={ mods & 0b00000001 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b00000001) : (mods & ~0b00000001))) }>
				CTL
			</Toggle>
			<Toggle
				value={ mods & 0b00000010 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b00000010) : (mods & ~0b00000010))) }>
				SFT
			</Toggle>
			<Toggle
				value={ mods & 0b00000100 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b00000100) : (mods & ~0b00000100))) }>
				ALT
			</Toggle>
			<Toggle
				value={ mods & 0b00001000 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b00001000) : (mods & ~0b00001000))) }>
				GUI
			</Toggle>
			<Toggle
				value={ mods & 0b00010000 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b00010000) : (mods & ~0b00010000))) }>
				RCTL
			</Toggle>
			<Toggle
				value={ mods & 0b00100000 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b00100000) : (mods & ~0b00100000))) }>
				RSFT
			</Toggle>
			<Toggle
				value={ mods & 0b01000000 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b01000000) : (mods & ~0b01000000))) }>
				RALT
			</Toggle>
			<Toggle
				value={ mods & 0b10000000 }
				onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b10000000) : (mods & ~0b10000000))) }>
				RGUI
			</Toggle>
		</div>;
	}

}

module.exports = Mods;
/* 
<Toggle
	value={ mods & 0b010000 }
	onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b010000) : (mods & ~0b010000))) }>
	HYPER
</Toggle>
<Toggle
	value={ mods & 0b100000 }
	onChange={ v => (this.props.onChange && this.props.onChange(v ? (mods | 0b100000) : (mods & ~0b100000))) }>
	MEH
</Toggle> 
*/
const { Slider } = primereact.slider;

class NumSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			num: 10
		};
	}

	handleSliderChange = (event) => {
		this.setState(
			() => {
				return { num: event.value };
			},
			() => {
				this.props.callback({
					num: this.state.num
				});
			}
		);
	};

	render() {
		return (
			<div id="numslider" className="num-slider">
				<div className="tip-title">数量：</div>
				<div className="tip-content">
					<div className="slider-container">
						<div className="slider-text">{ this.state.num }</div>
						<Slider min={0} max={50} value={this.state.num} onChange={this.handleSliderChange} />
					</div>
				</div>
			</div>
		);	
	}
}

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
			<div id="num-slider" style={{ marginTop: "10px", height: "50px" }}>
				<div style={{ display: "inline-block" }}>数量：</div>
				<div style={{ display: "inline-block"}}>
					<div style={{ display: "flex", width: "700px"}}>
						<div style={{ flex: "1" }}>{ this.state.num }</div>
					</div>
					<Slider min={0} max={50} value={this.state.num} onChange={this.handleSliderChange} />
				</div>
			</div>
		);	
	}
}

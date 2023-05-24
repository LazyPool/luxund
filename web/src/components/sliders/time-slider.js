const { Slider } = primereact.slider;
const moment = window.moment;

class TimeSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			minTime: moment("1926-1-1"),
			maxTime: moment("1929-12-31"),
			startTime: moment("1926-1-1"),
			endTime: moment("1929-12-31"),
			format: "YYYY-MM-DD"
		};
	};

	handleSliderChange = (event) => {
		this.setState(
			() => {
				let values = event.value;
				
				let start = values[0] < values[1] ? values[0] : values[1];
				let end = values[0] > values[1] ? values[0] : values[1];

				let startTime = start / 100 * (this.state.maxTime - this.state.minTime) + this.state.minTime;
				let endTime = end / 100 * (this.state.maxTime - this.state.minTime) + this.state.minTime;

				return {
					startTime: moment(startTime),
					endTime: moment(endTime)
				};
			},
			() => {
				let startTime = this.state.startTime;
				let endTime = this.state.endTime;

				let startYear = startTime.year();
				let startMonth = startTime.month() + 1;
				let startDay = startTime.date();

				let endYear = endTime.year();
				let endMonth = endTime.month() + 1;
				let endDay = endTime.date();

				this.props.callback({
					sy: startYear,
					sm: startMonth,
					sd: startDay,
					ey: endYear,
					em: endMonth,
					ed: endDay
				});
			}
		);
	};

	date2percent = () => {
		let start = (this.state.startTime - this.state.minTime) / (this.state.maxTime - this.state.minTime) * 100;
		let end = (this.state.endTime - this.state.minTime) / (this.state.maxTime - this.state.minTime) * 100;

		return [ parseInt(start), parseInt(end) ];
	};

	render() {
		return(
			<div id="time-slider" style={{ marginTop: "10px", height: "50px" }}>
				<div style={{ display: "inline-block" }}>时间：</div>
				<div style={{ display: "inline-block"}}>
					<div>
						<div style={{ display: "flex", width:"700px"}}>
							<div style={{ flex: "1" }}>起：{ this.state.startTime.format(this.state.format) }</div>
							<div style={{ flex: "1" }}>止：{ this.state.endTime.format(this.state.format) }</div>
						</div>
						<Slider min={0} max={100} value={this.date2percent()} onChange={this.handleSliderChange} range />
					</div>
				</div>
			</div>
		);
	}
}

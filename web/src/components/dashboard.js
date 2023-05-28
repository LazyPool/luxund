class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 1,
			tar: "$事件",
			num: 10,
			sy: 1926,
			sm: 1,
			sd: 1,
			ey: 1929,
			em: 12,
			ed: 31,
			lbl: "chr",
			val: "小峰"
		};
	}

	callBack = (jsondata) => {
		this.setState(
			() => {
				return jsondata;
			},
		  () => {
				this.props.callback({
					params: this.state
				});
			});
	};

	isDisplay = () => {
		return this.state.mode === 1 ? "none" : "flex";
	};

	render() {
		return (
			<div id="dashboard" className="dashboard">
				<ModeList callback={ this.callBack }/>
				<KeyValueInput callback={ this.callBack } display={ this.isDisplay } />
				<TimeSlider callback={ this.callBack }/>
				<TarList callback={ this.callBack }/>
				<NumSlider callback={ this.callBack }/>
			</div>
		);
	}
}

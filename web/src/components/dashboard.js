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
			lbl: "$人物",
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
		return this.state.mode === 1 ? "none" : "block";
	};

	render() {
		return (
			<div id="dashboard" style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "1500px", textAlign: "center"}}>
				<ModeList callback={ this.callBack }/>
				<KeyValueInput callback={ this.callBack } display={ this.isDisplay } />
				<TimeSlider callback={ this.callBack }/>
				<TarList callback={ this.callBack }/>
				<NumSlider callback={ this.callBack }/>
			</div>
		);
	}
}

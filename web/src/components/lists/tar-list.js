class TarList extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			items: [
				"天气",
				"事件",
				"人物",
				"物件",
				"地点"
			],
			activated: 1
		};
	}

	itemStyle = (key) => {
		return { 
			flex: 1,
			textAlign: "center", 
			color: key === this.state.activated ? "white" : "black",
			background: key === this.state.activated ? "#6366f1" : "white"
		};
	};

	handleClickOn = (event) => {
		this.setState(
			() => {
				return {
					activated: event.target.value
				};
			},
			() => {
				let target = this.state.items[this.state.activated];
				this.props.callback({
					tar: `\$${target}`
				});
			}
		);
	};

	render() {
		return (
			<div id="tar-list" style={{ marginTop: "10px", height: "50px" }}>
				<div style={{ display: "inline-block" }}>目标：</div>
				<div style={{ display: "inline-block" }}>
					<ul style={{ display: "flex", width: "700px" }} className="list-group list-group-horizontal">
						{
							this.state.items.map((item, index) => <li value={index} style={this.itemStyle(index)} key={index} className="list-group-item" onClick={this.handleClickOn}>{item}</li>) 
						}
					</ul>
				</div>
			</div>
		);
	}
}

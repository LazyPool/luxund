class ModeList extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			items: [
				"单变量统计",
				"双变量关联性"
			],
			activated: 0
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
				this.props.callback({
					mode: this.state.activated + 1
				});
			}
		);
	};

	render() {
		return (
			<div id="mode-list" style={{ marginTop: "10px", height: "50px" }}>
				<div style={{ display: "inline-block" }}>模式：</div>
				<div style={{ display: "inline-block" }}>
					<ul style={{ display: "flex", width: "700px" }} className="list-group list-group-horizontal">
						{
							this.state.items.map((item, index) => <li value={index} style={this.itemStyle(index)} key={index} className="list-group-item" onClick={this.handleClickOn}>{item}</li>) 
						}
					</ul>
				</div>
				<div style={{ display: "none" }}>
					<input/>
				</div>
			</div>
		);
	}
}

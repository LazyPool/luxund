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
			<div id="modelist" className="mode-list">
				<div className="tip-title">模式：</div>
				<div className="tip-content">
					<ul>
						{
							this.state.items.map((item, index) => <li value={index} key={index} className={this.state.activated===index ? "activated" : "non-activated" } onClick={this.handleClickOn}>{item}</li>) 
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

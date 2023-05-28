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
			<div id="tarlist" className="tar-list">
				<div className="tip-title">目标：</div>
				<div className="tip-content">
					<ul>
						{
							this.state.items.map((item, index) => <li value={index} key={index} className={this.state.activated===index ? "activated": "non-activated"} onClick={this.handleClickOn}>{item}</li>) 
						}
					</ul>
				</div>
			</div>
		);
	}
}

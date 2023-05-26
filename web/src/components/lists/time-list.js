class TimeList extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			activated: "timelist0"
		};
	}

	activate = (index) => {
		this.setState({ activated: `timelist${index}` });
	};

	isActivated = (index) => {
		return `timelist${index}` === this.state.activated ? "activated" : ""; 
	};

	render() {
		return (
			<div id="timelist" className="time-list">
				{
					this.props.data.map(
						(item, index) => <a key={index}  className={this.isActivated(index)} href={`#${item.年}-${item.月}-${item.日}`} onClick={(event) => this.activate(index)}>
							<div>{ `${item.年}-${item.月}-${item.日}` }</div>
						</a>
					)
				}
			</div>
		);
	}
}

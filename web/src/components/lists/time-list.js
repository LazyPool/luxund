class TimeList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="timelist" className="time-list">
				{
					this.props.data.map(
						(item, index) => <a href={`#${item.年}-${item.月}-${item.日}`} key={index}>
							<div>{ `${item.年}-${item.月}-${item.日}` }</div>
						</a>
					)
				}
			</div>
		);
	}
}

class Content extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				{
					this.props.data.map(
						(item, index) => <div id={`${item.年}-${item.月}-${item.日}`} key={index}>
							<h6>{ `${item.年}年${item.月}月${item.日}日` }</h6>
							<p>{item.原文}</p>
						</div>
					)
				}
			</div>
		);
	}
}

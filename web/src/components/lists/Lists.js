class Lists extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = {
			div: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
			},
			span: {
				fontweight: "bold",
			},
		};

		const sortedDiaries = this.props.diaries.sort((a, b) => {
			if(a["年"] < b["年"]) return -1;
			if(a["年"] > b["年"]) return  1;
			if(a["月"] < b["月"]) return -1;
			if(a["月"] > b["月"]) return  1;
			if(a["日"] < b["日"]) return -1;
			if(a["日"] > b["日"]) return  1;
			return 0;
		});

		return (
			<ul>
			{sortedDiaries.map(
				(diary, index) => 
				<li key={ index }>
					<div style={ style.div }>
						<span style={style.span}>年:</span>
						<div>{ diary["年"] }</div>
						<span style={style.span}>月:</span>
						<div>{ diary["月"] }</div>
						<span style={style.span}>日:</span>
						<div>{ diary["日"] }</div>
					</div>
					<div>{ diary["原文"] }</div>
				</li> 
			)}
			</ul>
		);
	}
}

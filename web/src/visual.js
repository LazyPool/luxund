const root = ReactDOM.createRoot(document.getElementById("root"));

class VisualPage extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			params: {
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
			}
		};
	}

	callBack = (jsondata) => {
		this.setState(
			() => {
				return jsondata;
			},
			() => {}
		);
	};

	render() {
		return (
			<div id="visualpage" className="visual-page">
				<NavBar />
				<WordCloud params={ this.state.params }/>
				<Dashboard callback={ this.callBack }/>
				<ChartForCate params={ this.state.params }/>
				<ChartForNum params={ this.state.params }/>
				<ChartForTree params={ this.state.params }/>
			</div>
		);
	}
}

root.render(<VisualPage />);

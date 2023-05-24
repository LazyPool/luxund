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
			},
			result: {},
		};
	}

	fetchData = () => {
		let params = Object.entries(this.state.params);
		let tokens = params.map(([key, value]) => {
			return `${key}=${value}`;
		});

		let queryString = tokens.join("&");
		fetch(`http://127.0.0.1:3000/statistic?${queryString}`)
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { result: json };
					},
					() => {
					}
				);
			});
	};

	debounce = (func, timeout = 300) => {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => { func.apply(this, args); }, timeout);
		};
	};

	safeFetchData = this.debounce(() => this.fetchData());

	callBack = (jsondata) => {
		this.setState(
			() => {
				return jsondata;
			},
			this.safeFetchData()
		);
	};

	componentDidMount() {
		this.safeFetchData();
	}

	render() {
		return (
			<div>
				<Dashboard callback={ this.callBack }/>
				<hr />
				<Chart data={ this.state.result }/>
			</div>
		);
	}
}

root.render(<VisualPage />);

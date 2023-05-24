const { Treemap } = Recharts;

class ChartForTree extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			data: []
		};
	}

	fetchData = () => {
		let params = Object.entries(this.props.params);
		let tokens = params.map(([key, value]) => {
			return key !== "mode" ? `${key}=${value}` : "mode=4";
		});

		let queryString = tokens.join("&");
		fetch(`http://127.0.0.1:3000/statistic?${queryString}`)
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { data: json };
					},
					() => {
						console.log(this.state.data);
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

	componentDidUpdate(prevProps) {
		if (this.props.params !== prevProps.params) this.safeFetchData();
	}

	componentDidMount() {
		this.safeFetchData();
	}

	render() {
		return (
			<div id="bar-chart" style={{ width: "1500px", textAlign: "center" }}>
				<Treemap
					width={1500}
					height={750}
					data={this.state.data}
					dataKey="size"
					aspectRatio={4 / 3}
					stroke="#fff"
					fill="#8884d8"
				/>
			</div>
		);
	}
};

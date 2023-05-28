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
		fetch(`http://47.98.242.187:3000/statistic?${queryString}`)
			.then(res => res.json())
			.then(json => {
				let data = json[0].result;
				this.setState(
					() => {
						return { data: data };
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

	componentDidUpdate(prevProps) {
		if (this.props.params !== prevProps.params) this.safeFetchData();
	}

	componentDidMount() {
		this.safeFetchData();
	}

	render() {
		return (
			<div id="tree-chart" className="chart-container">
				<Treemap
					width={1000 * 0.95}
					height={618 * 0.95}
					style={{marginLeft:"auto", marginRight:"auto"}}
					data={this.state.data}
					dataKey="size"
					aspectRatio={500 / 309}
					stroke="#ffffff"
					fill="#666666"
				/>
			</div>
		);
	}
};

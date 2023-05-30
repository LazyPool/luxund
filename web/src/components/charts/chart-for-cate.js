const { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } = Recharts;

class ChartForCate extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			data: []
		};
	}

	fetchData = () => {
		let params = Object.entries(this.props.params);
		let tokens = params.map(([key, value]) => {
			return `${key}=${value}`;
		});

		let queryString = tokens.join("&");
		fetch(`http://47.98.242.187:3000/statistic?${queryString}`)
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { data: json };
					},
					() => {}
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
			<div id="bar-chart" className="chart-container">
				<BarChart width={1000} height={618} data={this.state.data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="_id" angle={-70} interval={0} orientation="top"/>
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill="#1F6ED4" fillOpacity={0.7} />
				</BarChart>
			</div>
		);
	}
}

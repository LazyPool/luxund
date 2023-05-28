const { AreaChart, Area, linearGradient, XAxis, YAxis, Tooltip, CartesianGrid } = Recharts;

class ChartForNum extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			data:[]
		};
	}

	fetchData = () => {
		let params = Object.entries(this.props.params);
		let tokens = params.map(([key, value]) => {
			return key !== "mode" ? `${key}=${value}` : "mode=3";
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
			<div id="num-chart" className="chart-container">
				<AreaChart width={1000} height={618} data={this.state.data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorWhr" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#282828" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#282828" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorAffr" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#474747" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#474747" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorChr" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#666666" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#666666" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorItem" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#858585" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#858585" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#a3a3a3" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#a3a3a3" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="total_whr" stroke="#282828" fillOpacity={1} fill="url(#colorWhr)" />
					<Area type="monotone" dataKey="total_affr" stroke="#474747" fillOpacity={1} fill="url(#colorAffr)" />
					<Area type="monotone" dataKey="total_chr" stroke="#666666" fillOpacity={1} fill="url(#colorChr)" />
					<Area type="monotone" dataKey="total_item" stroke="#858585" fillOpacity={1} fill="url(#colorItem)" />
					<Area type="monotone" dataKey="total_pos" stroke="#a3a3a3" fillOpacity={1} fill="url(#colorPos)" />
				</AreaChart>
			</div>
		);
	}
}

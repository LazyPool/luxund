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
		fetch(`http://127.0.0.1:3000/statistic?${queryString}`)
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
			<div id="num-chart" style={{ width: "1500px", textAlign: "center" }}>
				<AreaChart width={1500} height={750} data={this.state.data}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id="colorWhr" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorAffr" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorChr" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#f6d55c" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#f6d55c" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorItem" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#ed553b" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#ed553b" stopOpacity={0}/>
						</linearGradient>
						<linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#173f5f" stopOpacity={0.8}/>
							<stop offset="95%" stopColor="#173f5f" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="total_whr" stroke="#8884d8" fillOpacity={1} fill="url(#colorWhr)" />
					<Area type="monotone" dataKey="total_affr" stroke="#82ca9d" fillOpacity={1} fill="url(#colorAffr)" />
					<Area type="monotone" dataKey="total_chr" stroke="#f6d55c" fillOpacity={1} fill="url(#colorChr)" />
					<Area type="monotone" dataKey="total_item" stroke="#ed553b" fillOpacity={1} fill="url(#colorItem)" />
					<Area type="monotone" dataKey="total_pos" stroke="#173f5f" fillOpacity={1} fill="url(#colorPos)" />
				</AreaChart>
			</div>
		);
	}
}

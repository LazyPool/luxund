class WordCloud extends React.Component {
	constructor(props) {
		super(props);
		this.wordcloudRef = React.createRef();

		var mask = new Image();
		mask.src = "/img/shadow.jpg";

		this.state = {
			option: {
				tooltip: { show: true },
				series: [
					{
						type: "wordCloud",
						maskImage: mask,
						width: "100%",
						height: "100%",
						sizeRange: [16, 64],
						rotationRange: [0, 0],
						rotationStep: 0,
						gridSize: 1,
						drawOutOfBound: true,
						textStyle: {
							fontFamily: "宋体",
							fontWeight: "bold",
							color: () => {
								var arr = ["#282828", "#474747", "666666", "#858585", "#a3a3a3"];
								var randomElement = arr[Math.floor(Math.random() * arr.length)];
								return randomElement;
							}
						},
						emphasis: {
							focus: "self",
							textStyle: {
								textShadowBlur: 10,
								textShadowColor: "#333",
								color: "#000"
							}
						},
						data: []
					}
				]
			}
		};
	}

	fetchData = () => {
		let params = Object.entries(this.props.params);
		let tokens = params.map(([key, value]) => {
			return key !== "mode" ? `${key}=${value}` : "mode=5";
		});

		let queryString = tokens.join("&");
		fetch(`http://47.98.242.187:3000/statistic?${queryString}`)
			.then(res => res.json())
			.then(json => {
				this.setState( 
					prevState => { 
						return {option: {...prevState.option, series: [{...prevState.option.series[0], data: json}]}};
					},
					() => { 
						this.chart.setOption(this.state.option);
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

	componentDidMount() {
		this.chart = echarts.init(this.wordcloudRef.current);

		this.safeFetchData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.params !== prevProps.params) this.safeFetchData();
	}

	render() {
		return (
			<div id="wordcloud" className="chart-container">
				<div ref={this.wordcloudRef} style={{width: "1100px", height: "646px"}}></div>
			</div>
		);
	}
}

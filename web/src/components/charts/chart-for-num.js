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
			return `${key}=${value}`;
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
			<div></div>
		);
	}
}

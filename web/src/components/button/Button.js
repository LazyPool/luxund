class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			result: [],
		};
	}

	generateQueryString = (obj) => {
		let entries = Object.entries(obj);
		let pairs = entries.map(([key, value]) => `${key}=${value}` );
		let queryString = pairs.join("&&");
		return queryString;
	}

	fetchResult = (event) => {
		let queryString = this.generateQueryString(this.props.filters);
		this.state.url = `http://127.0.0.1:3000/search?${queryString}`;

		console.log(`Fetching ${this.state.url}`);
		fetch(this.state.url)
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { result: json };
					},
					() => {
						this.props.submitDiariesHandler( this.state.result );
					}
				);
			})
	}

	render() {
		return (
			<button onClick={ this.fetchResult }>Fetch Result</button>
		);
	}
}

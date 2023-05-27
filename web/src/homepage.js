const root = ReactDOM.createRoot(document.getElementById("root"));

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			query: "",
			diaries: []
		};
	}

	fetchData = (queryString) => {
		fetch(`http://47.98.242.187:3000/search?${queryString}`)
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { diaries: json };
					},
					() => {
						console.log(this.state.diaries);
					}
				);
			});
	};

	callBack = (queryString) => {
		console.log(queryString);
		this.setState(
			() => {
				return { query: queryString };
			},
			() => {
				this.fetchData(this.state.query);
			}
		);
	};

	render() {
		return (
			<div id="homepage" className="homepage">
				<NavBar />
				<SimpleSearch callback={this.callBack} />
				<ResultList diaries={this.state.diaries} />
			</div>
		);
	}
}

root.render(<HomePage />);

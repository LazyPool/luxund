class Detail extends React.Component {
	constructor() {
		super();

		var params = new URLSearchParams(window.location.search);

		this.state = {
			url: `http://127.0.0.1:3000/search?_id=${ params.get('_id') }`,
			diary: {},
		};
	}

	componentDidMount() {
		fetch(this.state.url)
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { diary: json[0] };
					},
					() => {
						console.log(this.state);
					}
				);
			})
	}

	render() {
		return (
			<p>{ this.state.diary["原文"] }</p>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Detail />);

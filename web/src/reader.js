const root = ReactDOM.createRoot(document.getElementById("root"));

class ReaderPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
	}

	componentDidMount() {
		fetch("http://47.98.242.187:3000/search")
			.then(res => res.json())
			.then(json => {
				this.setState({ data: json });
			})
			.catch((error) => console.log(error));
	}

	render() {
		const data = this.state.data;
		return (
			<div id="readerpage" className="reader-page">
				<NavBar />
				<TimeList data={data} />
				<Content data={data} />
			</div>
		);
	}
}

root.render(<ReaderPage />);

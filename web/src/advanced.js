const root = ReactDOM.createRoot(document.getElementById("root"));

class AdvancedPage extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			diaries: [],
			postbody: {}
		};
	}

	callBack = (jsondata) => {
		this.setState(
			() => {
				return { postbody: jsondata };
			},
			() => {
				console.log(JSON.stringify(this.state.postbody));
			}
		);
	};

	execSearch = () => {
		fetch("http://47.98.242.187:3000/search", {
			method: "POST",
			headers: { 
				"Content-Type": "application/json" 
			},
			body: JSON.stringify(this.state.postbody)
		})
			.then(res => res.json())
			.then(json => {
				this.setState(
					() => {
						return { diaries: json };
					}
				);
			});
	};

	render() {
		return (
			<div id="advancedpage" className="advanced-page">
				<NavBar />
				<QueryManagement callback={this.callBack} search={this.execSearch}/>
				<ResultList diaries={this.state.diaries}/>
			</div>
		);
	}
}

root.render(<AdvancedPage />);

class Root extends React.Component {
	constructor() {
		super();
		this.state = {
			diaries: [],
			filters: {},
		};
	}

	submitParamsHandler = (params) => {
		this.setState(
			() => {
				return { filters: params };
			},
			() => {
				console.log( this.state );
			}
		);
	}

	submintDiariesHandler = (result) => {
		this.setState(
			() => {
				return { diaries: result };
			},
			() => {
				console.log( this.state );
			}
		);
	}

	render() {
		return (
			<div>
				<h1>鲁迅日记</h1>
				<Timeinput submitParamsHandler={ this.submitParamsHandler } />
				<Button filters={ this.state.filters } submitDiariesHandler={ this.submintDiariesHandler }/>
				<Lists diaries={ this.state.diaries } />
			</div>
		);
	}
}

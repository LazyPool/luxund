class Timeinput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sy: "", sm: "", sd: "",
			ey: "", em: "", ed: "",
		};
	}

	onChangeHandler = (event) => {
		this.setState(
			() => {
				return { [event.target.id]: event.target.value };
			},
			() => {
				this.props.submitParamsHandler( this.state );
			}
		);
	};

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<label>起始年</label><input id="sy" type="text" onChange={ this.onChangeHandler } />
					<label>起始月</label><input id="sm" type="text" onChange={ this.onChangeHandler } />
					<label>起始日</label><input id="sd" type="text" onChange={ this.onChangeHandler } />
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<label>终止年</label><input id="ey" type="text" onChange={ this.onChangeHandler } />
					<label>终止月</label><input id="em" type="text" onChange={ this.onChangeHandler } />
					<label>终止日</label><input id="ed" type="text" onChange={ this.onChangeHandler } />
				</div>
			</div>
		);
	}
}

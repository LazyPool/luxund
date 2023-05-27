class SimpleSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			options: [ "天气", "事件", "人物", "物件", "地点" ],
			paramsdict: {
				"天气": "whr",
				"事件": "affr",
				"人物": "chr",
				"物件": "item",
				"地点": "pos",
			},
			selected: "whr",
			inputed: ""
		};
	}

	handleSelectChange = (event) => {
		this.setState(
			() => {
				return { selected: this.state.paramsdict[event.target.value] };
			}
		);
	};

	handleInputChange = (event) => {
		this.setState(
			() => {
				return { inputed: event.target.value };
			}
		);
	};

	execSearch = () => {
		this.props.callback(`${this.state.selected}=${this.state.inputed}`);
	};

	render() {
		return (
			<div id="simplesearch" className="simple-search">
				<select onChange={this.handleSelectChange}>
					{
						this.state.options.map((option, index) => <option key={ index }>{ option }</option>)
					}
				</select>
				<input type="text" onChange={this.handleInputChange} />
				<button onClick={this.execSearch}>搜索</button>
			</div>
		);
	}
}

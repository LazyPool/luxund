class KeyValueInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lbl: "$人物",
			val: "小峰",
			dict: {
				$天气: "whr",
				$事件: "affr",
				$人物: "chr",
				$物件: "item",
				$地点: "pos"
			}
		};
	}

	handleSelectChange = (event) => {
		this.setState(
			() => {
				return { lbl: event.target.value };
			},
			() => {
				this.props.callback({
					lbl: this.state.dict[this.state.lbl],
					val: this.state.val
				});
			},
		);
	};

	handleInputChange = (event) => {
		this.setState(
			() => {
				return { val: event.target.value };
			},
			() => {
				this.props.callback({
					lbl: this.state.dict[this.state.lbl],
					val: this.state.val
				});
			},
		);
	};

	render() {
		return (
			<div id="key-value-input" style={{ marginTop: "10px", height: "50px", display: this.props.display() }}>
				<div style={{ display: "inline-block" }}>选项：</div>
				<div style={{ display: "inline-block"}}>
					<div style={{ display: "flex", width: "700px"}}>
						<span>标签：</span>
						<select value={this.state.lbl} style={{ flex: "1", padding: "inherit" }} className="form-select" onChange={this.handleSelectChange}>
							<option>$天气</option>
							<option>$事件</option>
							<option>$人物</option>
							<option>$物件</option>
							<option>$地点</option>
						</select>
						<span style={{ flex: "1" }}></span>
						<span>值：</span>
						<input value={this.state.val} style={{ flex: "1", padding: "inherit" }} onChange={this.handleInputChange}/>
						<span style={{ flex: "1" }}></span>
					</div>
				</div>
			</div>
		);
	}
}

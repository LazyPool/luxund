class OneQuery extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			id: this.props.query.id,
			bool: this.props.query.bool,
			field: this.props.query.field,
			value: this.props.query.value
		};
	}

	changeBool = (event) => {
		this.setState(
			() => {
				return { bool: event.target.value };
			},
			() => {
				this.props.update(this.state.id, { bool: this.state.bool });
			}
		);
	};

	changeField = (event) => {
		this.setState(
			() => {
				return { field: event.target.value };
			},
			() => {
				this.props.update(this.state.id, { field: this.state.field });
			}
		);
	};

	changeValue = (event) => {
		this.setState(
			() => {
				return { value: event.target.value };
			},
			() => {
				this.props.update(this.state.id, { value: this.state.value });
			}
		);
	};

	render() {
		return(
			<li className="one-query">
				{
					this.props.index !== 0 && (
						<select value={this.state.bool} onChange={this.changeBool}>
							<option value="AND">AND</option>
							<option value="OR">OR</option>
							<option value="NOT">NOT</option>
						</select>
					)
				}
				<select value={this.state.field} onChange={this.changeField}>
					<option value="天气">天气</option>
					<option value="事件">事件</option>
					<option value="地点">地点</option>
					<option value="人物">人物</option>
					<option value="物件">物件</option>
				</select>
			  <input onChange={this.changeValue}/>
				<button onClick={() => this.props.remove(this.state.id)}>删除</button>
				{
					this.props.index === 0 && (
						<button onClick={() => this.props.add()}>添加</button>
					)
				}
			</li>
		);
	}
}

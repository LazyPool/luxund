class QueryManagement extends React.Component {
	constructor(props) {
		super(props);
		const uuid = Date.now();
		this.state = {
			querys: [
				{ id: uuid, bool: "AND", field: "天气", value: "" }
			]
		};
	}

	addQuery = () => {
		const uuid = Date.now();
		this.setState(
			(prevState) => {
				return { 
					querys: [
						...prevState.querys, 
						{ id: uuid, bool: "AND", field: "天气", value: "" }
					] 
				};
			},
			() => {
				this.generatePostBody();
			}
		);
	};

	removeQuery = (uuid) => {
		this.setState(
			(prevState) => {
				return {
					querys: prevState.querys.filter(
						query => query.id !== uuid
					)
				};
			},
			() => {
				if(this.state.querys.length === 0) this.addQuery();
				this.generatePostBody();
			}
		);
	};

	updateQuery = (uuid, updates) => {
		this.setState(
			(prevState) => {
				return {
					querys: prevState.querys.map(
						query => {
							if (query.id === uuid) {
								return { ...query, ...updates };
							} else { 
								return query;
							}
						}
					)
				};
			},
			() => {
				this.generatePostBody();
			}
		);
	};

	generatePostBody = () => {
		let postBody = this.generateQuery(this.state.querys);
		this.props.callback(postBody);
	};

	generateQuery = (array) => {
		let groups = {};
		let groupIndex = 0;

		for (let i = 0; i < array.length; i++) {
			let bool = array[i].bool;

			if (i === 0 || bool === "OR") {
				groupIndex++;
				groups[groupIndex] = [array[i]];
			} else {
				groups[groupIndex].push(array[i]);
			}
		}

		let subQueries = [];

		for (let key in groups) {
			let group = groups[key];

			let subQuery = {};
			let notConditions = [];
			let andConditions = [];

			for (let j = 0; j < group.length; j++) {
				let field = group[j].field;
				let value = group[j].value;

				if (group[j].bool === "NOT") {
					notConditions.push({ [field]: value });
				} else {
					andConditions.push({ [field]: value });
				}
			}

			if (notConditions.length > 0) {
				subQuery.$nor = notConditions;
			}

			if (andConditions.length > 0) {
				subQuery.$and = andConditions;
			}

			subQueries.push(subQuery);
		}

		let query = {};

		if (subQueries.length === 1) {
			query = subQueries[0];
		} else {
			query.$or = subQueries;
		}

		return query;
	};

	render() {
		return(
			<div id="querymanagement" className="query-management">
				<ul>
					{
						this.state.querys.map((query, index) => 
							<OneQuery 
								key={query.id} query={query} index={index}
								update={this.updateQuery} remove={this.removeQuery} add={this.addQuery}
							/>)
					}
				</ul>
				<div className="button-container">
					<button onClick={this.props.search}>开始检索</button>
				</div>
			</div>
		);
	}
}

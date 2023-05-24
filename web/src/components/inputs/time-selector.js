class TimeSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startYear: 1926,
			startMonth: 1,
			startDay: 1,
			endYear: 1929,
			endMonth: 12,
			endDay: 31
		};
	}

	static range = (start, end) => {
		return Array.from({length: end - start + 1}, (_, i) => start + i);
	};

	static getDaysInMonth = (year, month) => {
		return new Date(year, month, 0).getDate();
	};

	static isLeapYear = (year) => {
		return (year % 4 === 0  && year % 100 !== 0 || year % 400 ===0);
	};

	handleStartYearChange = (event) => {
		const value = event.target.value;
		this.setState((prevState) => {
			const daysInMonth = TimeSelector.getDaysInMonth(value, prevState.startMonth);
			return {
				startYear: value,
				startDay: Math.min(prevState.starDay, daysInMonth)
			};
		});
	};

	handleStartMonthChange = (event) => {
		const value = event.target.value;
		this.setState((prevState) => {
			const daysInMonth = TimeSelector.getDaysInMonth(prevState.startYear, value);
			return {
				startMonth: value,
				startDay: Math.min(prevState.starDay, daysInMonth)
			};
		});
	};

	handleStartDayChange = (event) => {
		const value = event.target.value;
		this.setState({
			startDay: value,
		});
	};

	handleEndYearChange = (event) => {
		const value = event.target.value;
		this.setState((prevState) => {
			const daysInMonth = TimeSelector.getDaysInMonth(value, prevState.endMonth);
			return {
				endYear: value,
				endDay: Math.min(prevState.endDay, daysInMonth)
			};
		});
	};

	handleEndMonthChange = (event) => {
		const value = event.target.value;
		this.setState((prevState) => {
			const daysInMonth = TimeSelector.getDaysInMonth(prevState.endYear, value);
			return {
				endMonth: value,
				endDay: Math.min(prevState.endDay, daysInMonth)
			};
		});
	};

	handleEndDayChange = (event) => {
		const value = event.target.value;
		this.setState({
			endDay: value,
		});
	};

	render() {
		const years = TimeSelector.range(1926, 1929);
		const months = TimeSelector.range(1, 12);
		const startDays = TimeSelector.range(1, TimeSelector.getDaysInMonth(this.state.startYear, this.state.startMonth));
		const endDays = TimeSelector.range(1, TimeSelector.getDaysInMonth(this.state.endYear, this.state.endMonth));

		return (
			<div>
				<div style={{ display: "inline-block" }}>时间：</div>
				<div style={{ display: "inline-block" }}>
					<div style={{ display: "flex", width: "700px" }}>
						<span style={{ flex: "1" }}>开始：</span>
						<select value={ this.state.startYear } onChange={this.handleStartYearChange} style={{ flex: "1" }} className="form-select">
							{
								years.map((year) => <option key={year} value={year}>{ year }</option>)
							}
						</select>
						<select value={ this.state.startMonth } onChange={this.handleStartMonthChange} style={{ flex: "1" }} className="form-select">
							{
								months.map((month) => <option key={month} value={month}>{ month }</option>)
							}
						</select>
						<select value={ this.state.startDay } onChange={this.handleStartDayChange} style={{ flex: "1" }} className="form-select">
							{
								startDays.map((day) => <option key={day} value={day}>{ day }</option>)
							}
						</select>
						<span style={{ flex: "1" }}>结束：</span>
						<select value={ this.state.endYear } onChange={this.handleEndYearChange} style={{ flex: "1" }} className="form-select">
							{
								years.map((year) => <option key={year} value={year}>{ year }</option>)
							}
						</select>
						<select value={ this.state.endMonth } onChange={this.handleEndMonthChange} style={{ flex: "1" }} className="form-select">
							{
								months.map((month) => <option key={month} value={month}>{ month }</option>)
							}
						</select>
						<select value={ this.state.endDay } onChange={this.handleEndDayChange} style={{ flex: "1" }} className="form-select">
							{
								endDays.map((day) => <option key={day} value={day}>{ day }</option>)
							}
						</select>
					</div>
				</div>
			</div>
		);
	}
}

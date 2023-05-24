const { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } = Recharts;

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let data = this.props.data;

		return (
			<div id="bar-chart" style={{ width: "1500px", textAlign: "center" }}>
				<BarChart width={1500} height={750} data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="_id" angle={-70} interval={0} orientation="top"/>
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill="#6366f1" />
				</BarChart>
			</div>
		);
	}
}

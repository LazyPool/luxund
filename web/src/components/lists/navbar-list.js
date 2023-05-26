class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav>
					<a href="/homepage">首页</a>
					<a href="/advanced">高级搜索</a>
					<a href="/reader">全文阅读</a>
					<a href="/visual">图说日记</a>
					<a href="/concatus">联系我们</a>
				</nav>
			</div>
		);
	}
}

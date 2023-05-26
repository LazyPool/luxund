class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="navbar" className="navbar-list">
				<nav>
					<a className="navbar0" href="/homepage">首页</a>
					<a className="navbar1" href="/advanced">高级搜索</a>
					<a className="navbar2" href="/reader">全文阅读</a>
					<a className="navbar3" href="/visual">图说日记</a>
					<a className="navbar4" href="/concatus">联系我们</a>
				</nav>
			</div>
		);
	}
}

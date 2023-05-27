class ResultList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="resultlist" className="result-list">
				<ul>
					{
						this.props.diaries.map((diary, index) => 
							<li key={index}>
								<div className="datetime">{diary.年}年{diary.月}月{diary.日}日</div>
								<div className="paragraph">
									<div className="content">{diary.原文}</div>
									<select>
										{diary.地点 ? <option disabled>地点：{diary.地点.join("，")}</option> : null}
										{diary.人物 ? <option disabled>人物：{diary.人物.join("，")}</option> : null}
										{diary.天气 ? <option disabled>天气：{diary.天气.join("，")}</option> : null}
										{diary.事件 ? <option disabled>事件：{diary.事件.join("，")}</option> : null}
										{diary.物件 ? <option disabled>物件：{diary.物件.join("，")}</option> : null}
									</select>
								</div>
							</li> 
						)
					}
				</ul>
			</div>
		);
	}
}

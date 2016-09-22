
export default class Paging extends React.Component{
	constructor(props){
		super(props);
		this.handleChange 		= this.handleChange.bind(this);
		this.handleClick 		= this.handleClick.bind(this);
		this.handleKeypress 		= this.handleKeypress.bind(this);
		this.state 			= {pageNumb: 1};
	}
	handleChange(event){
		this.setState({
			pageNumb: event.target.value,
		})
	}
	handleClick(event){
		var cur_page, target, target_class, start, start_page, len;
		len 					= this.props.contentLength;
		target 					= event.target || event.srcElement;

		if (target.tagName == 'LI' || target.tagName == 'SPAN'){
			target_class 			= target.className ? target.className : target.getElementsByTagName('span')[0].className;
			target_class 			= target_class.split(' ')[1].split('-')[2];

			switch(target_class){
				case 'backward':
					this.setState({ pageNumb: 1});
					this.props.getPageContent(0);
					break;

				case 'left':
					cur_page 		= this.input.value;
					start_page 		= cur_page - 1 > 0 ? cur_page - 1 : 1,
					start 	 		= (start_page - 1) * len;
					this.props.getPageContent(start);
					this.setState({
						pageNumb: start_page,
					})
					break;

				case 'right':
					cur_page 		= parseInt(this.input.value);
					start_page 		= cur_page + 1 < this.props.totalPage ? cur_page + 1 : this.props.totalPage;
					start 	 		= (start_page - 1) * len;
					this.props.getPageContent(start);
					this.setState({
						pageNumb: start_page,
					})
					break;

				case 'forward':
					start 	 		= (this.props.totalPage - 1) * len;
					this.setState({pageNumb: this.props.totalPage});
					this.props.getPageContent(start);
					break;
			}
		}
	}
	handleKeypress(event){
		var len, keycode, start, cur_page;
		var len 					= this.props.contentLength;
		var keycode 					= event.keyCode ? event.keyCode : event.which;
		if (keycode == 13){
			cur_page 				= parseInt(this.input.value);

			if (cur_page > this.props.totalPage){

				start 				= (this.props.totalPage - 1) * len;
				this.setState({pageNumb: this.props.totalPage});

			}else if( cur_page <= 0){

				start 				= 0;
				this.setState({pageNumb: 1});

			}else{
				start 				= (this.input.value - 1) * len;
			}
			this.props.getPageContent(start);
		}
	}
	render(){
		return (
			<div id="paging">
				<ul onClick={this.handleClick} >
					<li><span className="glyphicon glyphicon-step-backward"></span></li>
					<li><span className="glyphicon glyphicon-chevron-left"></span></li>
					<span>Page&nbsp;&nbsp;</span><input ref={ref=>{this.input = ref}} type="number" value={this.state.pageNumb} onChange={this.handleChange} onKeyPress={this.handleKeypress} />&nbsp;&nbsp;of {this.props.totalPage}
					<li><span className="glyphicon glyphicon-chevron-right"></span></li>
					<li><span className="glyphicon glyphicon-step-forward"></span></li>
				</ul>
			</div>
		)
	}
}


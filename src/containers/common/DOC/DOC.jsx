import React, {Component} from 'react';
import './DOC.less'
import {reqSoftwareLicense, reqServiceDetails} from "../../../api";

class Doc extends Component {
	state = {
		content: ''
	};

	componentDidMount() {
		const docName = this.props.match.params.doc_name;
		let getData = docName === 'reqServiceDetails' ? reqServiceDetails : reqSoftwareLicense;
		getData().then(
			res => {
				if (res.code === 1) {
					this.setState({content: res.data.content})
				}
			}
		)
	}

	render() {
		const {content} = this.state;
		return (
			<div className='doc-content'>
				<div dangerouslySetInnerHTML={{__html: content}}>

				</div>

			</div>
		);
	}
}

export default Doc;

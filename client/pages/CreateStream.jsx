import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import StreamForm from '../components/StreamForm.jsx';

class CreateStream extends Component {

	componentDidMount() {
		$('select').material_select();
	}

	formSubmitHandler(values) {
		const newStream = {
			title: values.title,
			description: values.description,
			keywords: values.keywords,
			categories: values.categories
		}
		this.props.createStream(newStream)
	}
	render() {
		return (
			<StreamForm 
				submitHandler={this.formSubmitHandler}
				categories={this.props.categories}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categories: ['Astronomy']
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(CreateStream);
import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import StreamForm from '../components/StreamForm.jsx';

class CreateStream extends Component {

	componentDidMount() {
		$('select').material_select();
    $('.chips-placeholder').material_chip({
       placeholder: 'Enter another keyword',
       secondaryPlaceholder: 'Enter a keyword',
     });
	}

	formSubmitHandler(e) {
    e.preventDefault();
    var form = e.target;
    var keywords = []
    var keywords_chips = $('.chip') // map over chip text and push to keywords
    var categories = []
    var category_selections; // map over selections and push to categories
    
		const newStream = {
			title: form.title,
			description: form.description,
			// keywords: values.keywords,
			// categories: values.categories
		}
		// this.props.createStream(newStream)
	}
	render() {
		return (
      <div className='container'>
  			<StreamForm 
  				submitHandler={this.formSubmitHandler}
  				categories={this.props.categories}
  			/>
      </div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categories: ['Astronomy', 'History']
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(CreateStream);
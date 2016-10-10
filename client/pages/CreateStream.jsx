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
    $('.chip').remove(); // remove any pre existing chips
	}

	formSubmitHandler(e) {
    e.preventDefault();
    var form = e.target;
    var keywords = []
    var keywords_chips = $('.chip').each((e, c) => { keywords.push(c.firstChild.textContent)});
    var categories = [];
    var category_selections = form.categories.selectedOptions;
    for (var i = 0; i < category_selections.length; i++) {
      categories.push(category_selections[i].text)
    }
		const newStream = {
			title: form.title.value,
			description: form.description.value,
			keywords,
			categories
		}
		this.props.createStream(newStream);
	}
	render() {
		return (
      <div className='container'>
  			<StreamForm 
  				submitHandler={this.formSubmitHandler.bind(this)}
  				categories={this.props.categories}
  			/>
      </div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categories: ['Art', 'Music', 'Sports', 'History', 'Politics', 
      'News', 'Education']
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default connect(mapStateToProps, Actions)(CreateStream);
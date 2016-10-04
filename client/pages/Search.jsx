import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';
import SearchBar from '../components/SearchBar.jsx';
import SearchFilter from '../components/SearchFilter.jsx';

class Search extends Component {

	componentDidMount() {
		$('select').material_select();
		$('select').on(
			'change', 
			(e) => {
				var optionsText = [];
				var title = e.target.id;
				var handler = e.target.dataset.handler;
				var optionsElements = e.target.selectedOptions;
				for (var i = 0; i < optionsElements.length; i++) {
					optionsText.push(optionsElements[i].text);
				}
				this.props[handler](optionsText)
			}
		) 
	}
	render() {
		return (
			<div className='container'>
				<SearchBar onTermChange={this.props.searchChannels} />
				<div className='row'>
					<div className='col s4 m2'>
						<SearchFilter filterOptions={this.props.categories} />
					</div>
					<div className='col s4 m2'>
						<SearchFilter filterOptions={this.props.prices} />
					</div>
					<div className='col s4 m2'>
						<SearchFilter filterOptions={this.props.types} />
					</div>
					<div className='col s4 m2'>
						<SearchFilter filterOptions={this.props.days} />
					</div>
					<div className='col s4 m2'>
						<SearchFilter filterOptions={this.props.times} />
					</div>
					<div className='col s4 m2'>
						{'Toogle Display'}
					</div>
				</div>
			</div>
		)
	}
} 

const mapStateToProps = (state) => {
	return {
		categories: {
			title: 'Categories', 
			handler: 'filterStreamCategories',
			data: ['Math', 'Entertainment', 'History', 'Politics']
		},
		prices: {
			title: 'Price',
			handler: 'filterStreamPrices',
			data: ['Free', 'Paid']
		},
		types: {
			title: 'Type',
			handler: 'filterStreamTypes',
			data: ['Live', 'Archived']
		},
		days: {
			title: 'Day',
			handler: 'filterStreamDays',
			data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		},
		times: {
			title: 'Time',
			handler: 'filterStreamTimes',
			data: ['12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', 
					'8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm',
					'4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm']
		}		
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(Search);
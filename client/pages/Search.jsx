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
					<div className='col s2'>
						<SearchFilter filterOptions={this.props.categories} />
					</div>
					<div className='col s2'>
						<SearchFilter filterOptions={this.props.price} />
					</div>
					<div className='col s2'>
						<SearchFilter filterOptions={this.props.type} />
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
			handler: 'filterChannelCategories',
			data: ['Math', 'Entertainment', 'History', 'Politics']
		},
		price: {
			title: 'Price',
			handler: 'filterChannelPrices',
			data: ['Free', 'Paid']
		},
		type: {
			title: 'Type',
			handler: 'filterChannelType',
			data: ['Live', 'Archived']
		}		
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(Search);
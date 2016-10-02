import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';
import SearchBar from '../components/SearchBar.jsx';

class Search extends Component {
	render() {
		return (
			<div>
				<h1>Search Page</h1>
				<SearchBar onTermChange={this.props.searchChannels} />
			</div>
		)
	}
} 

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(Search);
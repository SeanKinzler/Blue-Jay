import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';
import categoriesList from '../lib/categories.js';
import SearchBar from '../components/SearchBar.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import SearchResultsCompact from '../components/SearchResultsCompact.jsx';
import SearchResultsExtended from '../components/SearchResultsExtended.jsx';
import SearchResultsModal from '../components/SearchResultsModal.jsx';

class Search extends Component {

  componentWillUnmount() {
    this.props.resetSearchQuery();
  }

  componentWillMount() {
    // Category potentially selected from home page
    const selectedCategory = this.props.categories.selected;
    if (selectedCategory.length) {
      this.props.searchStreams({categories: this.props.categories.selected});
    } else {
      this.props.resetSearchQuery();
      this.props.searchStreams();
    }
  }

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
        this.props[handler](optionsText);
      }
    ); 
  }

  changeViewHandler(view) {
    this.props.toggleSearchResultsView(view);
  }

  renderFilterView() {
    let compact = this.props.streams.view === 'compact' ? 'blue' : '';
    let extended = this.props.streams.view === 'extended' ? 'blue' : '';
    return (
      <span className='align-center'>
        <i onClick={ () => { this.changeViewHandler('compact'); } } className={`material-icons ${compact}`}>view_module</i>
        <i onClick={ () => { this.changeViewHandler('extended'); } } className={`material-icons ${extended}`}>view_list</i>
      </span>
    );
  }

  renderSearchResults() {
    let searchResults = this.props.streams.data;
    if (this.props.streams.view === 'compact') {
      return (
        <SearchResultsCompact 
          searchResults={searchResults} 
          openModal={this.props.openModal}
          addSubscription={this.props.addSubscription}
          removeSubscription={this.props.removeSubscription}
          selectedStream={this.props.modal.selectedStream} 
          modalIsOpen={this.props.modal.modalIsOpen}
          onRequestClose={ () => { this.props.closeModal() } }
          subscriptions={this.props.subscriptions}
        />
      )
    }
    else if (this.props.streams.view === 'extended') {
      return (
        <SearchResultsExtended 
          searchResults={searchResults}
          openModal={this.props.openModal}
          addSubscription={this.props.addSubscription}
          removeSubscription={this.props.removeSubscription}
          selectedStream={this.props.modal.selectedStream} 
          modalIsOpen={this.props.modal.modalIsOpen}
          onRequestClose={ () => { this.props.closeModal() } }
          subscriptions={this.props.subscriptions}
        />
      )
    }
  }

  submitHandler(e) {
    e.preventDefault();
    // this.props.resetSearchQuery();
  	var query = {
  		text: this.props.streams.term,
  		categories: this.props.streams.categories 
  	}
    this.props.resetSearchQuery();
  	this.props.searchStreams(query)
  }

  render() {
    return (
      <div className='container'>
        <SearchBar onTermChange={this.props.searchStreamTerm} />
        <div className='row'>
          <div className='col s6 m6'>
            <SearchFilter filterOptions={this.props.categories} />
          </div>
          <div className='col s6 m2'>
            <SearchFilter filterOptions={this.props.types} />
          </div>
          <div className='col s6 m2'>
            <div className='btn' id='submit' onClick={this.submitHandler.bind(this)}>Search</div>
          </div>
          <div className='col s6 m2'>
            { this.renderFilterView() }
          </div>
        </div>
        <div className='row'>
          { this.renderSearchResults() }
        </div>
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    streams: state.streams,
    subscriptions: state.subscriptions.data.map(s=>s.title),
    categories: {
      title: 'Categories', 
      handler: 'filterStreamCategories',
      options: categoriesList,
      selected: state.streams.categories
    },
    prices: {
      title: 'Price',
      handler: 'filterStreamPrices',
      options: ['Free', 'Paid'],
      selected: state.streams.prices
    },
    types: {
      title: 'Type',
      handler: 'filterStreamTypes',
      options: ['Live', 'Archived'],
      selected: state.streams.types
    },
    days: {
      title: 'Day',
      handler: 'filterStreamDays',
      options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      selected: state.streams.days
    },
    times: {
      title: 'Time',
      handler: 'filterStreamTimes',
      options: ['12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', 
          '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm',
          '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'],
      selected: state.streams.times
    }   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, Actions)(Search);
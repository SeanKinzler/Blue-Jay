import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import categoriesList from '../lib/categories.js';
import Carousel from '../components/Carousel.jsx';
import LiveNow from '../components/LiveNow.jsx';
import Categories from '../components/Categories.jsx';
import io from 'socket.io-client';

class Home extends Component {
  componentDidMount() {
    $('.carousel').css('height', '225px');
  }

  componentWillUnmount() {
    this.props.socket.disconnect();
  }


  render() {
    return (
      <div>
      <Carousel />
        <div className='container'>     
          <div className='row'>
            <div className='col s12 m6'>
              <LiveNow socket={ this.props.socket }/>
            </div>
            <div className='col s12 m6'>        
              <Categories 
                categoriesList={categoriesList}
                selectCategory={this.props.filterStreamCategories}
              />
            </div>
          </div>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.username,
    socket: io.connect(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, Actions)(Home);
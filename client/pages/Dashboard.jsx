import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import StreamsList from '../components/StreamsList.jsx';
import SubscriptionsList from '../components/SubscriptionsList.jsx';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 l6'>
            <SubscriptionsList subscriptions={ this.props.subscriptions.slice(0, 4) }/>
          </div>
          <div className='col s12 l6'>  
            <StreamsList streams={ this.props.userStreams.slice(0, 4) }/>     
          </div>
          <div className='col s12'>
            <ul className='collection with-header'>
              <li className='collection-header color1'><h5>Account Settings</h5></li>
              <li className='collection-item color1'>
                <table className='centered responsive-table'>
                  <tbody>
                    <tr>
                      <td><i className='material-icons circle color1-text text-lighten-5'>person_pin</i><br />Profile</td>
                      <td><i className='material-icons circle color1-text text-lighten-5'>email</i><br />Notifications</td>
                      <td><i className='material-icons circle color1-text text-lighten-5'>credit_card</i><br/>Payments</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.username,
    userStreams: state.userStreams.data,
    subscriptions: state.subscriptions.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, Actions)(Dashboard);
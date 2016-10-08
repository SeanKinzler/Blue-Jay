import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index.jsx';
import StreamsList from '../components/StreamsList.jsx';
import SubscriptionsList from '../components/SubscriptionsList.jsx';

class Dashboard extends Component {

  componentWillMount() {
    this.props.getStreams();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 l6'>
            <SubscriptionsList />
          </div>
          <div className='col s12 l6'>  
            <StreamsList streams={ this.props.streams.slice(0, 4) }/>     
          </div>
          <div className='col s12'>
            <ul className='collection with-header'>
              <li className='collection-header'><h5>Account Settings</h5></li>
              <li className='collection-item'>
                <table className='centered responsive-table'>
                  <tbody>
                    <tr>
                      <td><i className='material-icons circle'>person_pin</i><br />Profile</td>
                      <td><i className='material-icons circle'>email</i><br />Notifications</td>
                      <td><i className='material-icons circle'>credit_card</i><br/>Payments</td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.username,
    streams: state.streams.data,
    subscriptions: state.subscriptions.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, Actions)(Dashboard);
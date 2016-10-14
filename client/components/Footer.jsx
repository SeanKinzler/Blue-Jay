import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions/index.jsx';

class Footer extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="page-footer">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <table className="centered">
                <tr>
                  <td align="left">
                    <h6 className="white-text">
                      © 2016 Copyright Text
                    </h6>
                  </td>
                  <td align="center">
                    <h5 className="white-text">
                      <a href="https://github.com/Blue-Jay-Blues/Blue-Jay">
                        BlueJayBlues
                      </a>
                    </h5>
                  </td>
                  <td align="right">
                    <p className="grey-text text-lighten-4">Want to contact us? Too bad.</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </footer>
    );
  }

}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, Actions)(Footer);

import React from 'react';
import {Link} from 'react-router';
import allIcons from '../lib/allIcons.js';
import allColors from '../lib/allColors.js';
import urlHelper from '../utils/urlHelper.jsx';

export default ({subscriptions}) => {
  subscriptions = subscriptions.filter(function (item) {
    return !!item.title;
  });

  if (subscriptions.length) {
    return (
      <ul className="collection with-header">
        <li className='collection-header'>
          <h5>Subscriptions</h5>
        </li>

        { subscriptions.map((sub, i) => {
          return (
            <li key={i} className="collection-item avatar">
              <i className={`material-icons circle ${ allColors() }`}>{ allIcons() }</i>
              <Link to={ `username/${ urlHelper.slugify(sub.title) }` } >
                <h3 className="title">{ sub.title }</h3>
              </Link>
              <p>{ sub.description }
              </p>
              <Link to={ `${ localStorage.username + '/' + urlHelper.slugify(sub.title) }` } className="secondary-content">
                <i className="material-icons">contact_phone</i>
              </Link>
            </li>
          );
        })}


        <li className="collection-header">
        <Link to='subscriptions'>
          <strong>All My Subscriptions</strong>
        </Link>
        </li>     
      </ul>
    );
  } else {
    return (
      <ul className="collection with-header">
        <li className='collection-header'>
          <h5>Subscriptions</h5>
        </li>
        <li className="collection-item">
          <div>You have no subscriptions. 
            <Link to='/search'>Go search for some!</Link>
          </div>
        </li>
      </ul>
    );
  }

};
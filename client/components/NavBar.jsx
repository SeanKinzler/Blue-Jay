import React from 'react';
import { Link } from 'react-router';

export default () => {
	return (
		<nav>
		  <div className='nav-wrapper blue'>
        <div className='row'>
          <Link className='brand-logo align-center' to='/'>BlueBird</Link>
          <ul>
            <li><Link className='align-center' to='/channel'>A Link</Link></li>
            <li><Link className='align-center' to='/channel'>Another Link</Link></li>
            <li><Link className='align-center' to='/channel'>One More</Link></li>
          </ul>
  		  </div>
      </div>
		</nav>
	)
}
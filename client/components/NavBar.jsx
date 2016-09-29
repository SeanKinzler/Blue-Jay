import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <nav>
      <div className='nav-wrapper blue darken-1'>
        <Link className='brand-logo center' to='/'>BlueBird</Link>
      </div>
    </nav>
  );
}
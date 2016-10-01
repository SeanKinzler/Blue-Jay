import React from 'react';
import {Link} from 'react-router';

export default () => {
	return (
	<div>
		<ul className="collection with-header">
		  <li className="collection-header">
		  	<h5 className='align-center'>Live Now</h5>
		  </li>
		</ul>
		<ul className='collection'>
		  <li className="collection-item avatar">
		    <i className="material-icons circle blue">loop</i>
		    <span className="title">Kazoo Masters</span>
		    <p>Master the Kazoo with ferocious melodies
		    </p>
		  </li>
		  <li className="collection-item avatar">
		    <i className="material-icons circle green">folder</i>
		    <span className="title">Electric Guitar 101</span>
		    <p>Wannabe shredders start here
		    </p>
		  </li>
		  <li className="collection-item avatar">
		    <i className="material-icons circle red">insert_chart</i>
		    <span className="title">Eric's World</span>
		    <p>Live 24/7 feed of Eric
		    </p>
		  </li>
		  <li className="collection-item avatar">
		    <i className="material-icons circle yellow">play_arrow</i>
		    <span className="title">Presidential Debate LXIV</span>
		    <p>Brought to you by Brawndo
		    </p>
		  </li>
		</ul>
	</div>
	)
}
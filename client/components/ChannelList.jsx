import React from 'react';
import {Link} from 'react-router';

export default () => {
	return (
		<ul className="collection with-header">
		  <li className="collection-item avatar">
		    <i className="material-icons circle blue">loop</i>
		    <span className="title">Kazoo Masters</span>
		    <p>Master the Kazoo with ferocious melodies
		    </p>
		    <Link to='channel/one' className="secondary-content"><i className="material-icons">contact_phone</i></Link>
		  </li>
		  <li className="collection-item avatar">
		    <i className="material-icons circle">folder</i>
		    <span className="title">Yoga 101</span>
		    <p>Put those bright stretchy pants to use
		    </p>
		    <Link to='channel/two' className="secondary-content"><i className="material-icons">contact_phone</i></Link>
		  </li>
		  <li className="collection-item avatar">
		    <i className="material-icons circle green">insert_chart</i>
		    <span className="title">Eric's World</span>
		    <p>Live 24/7 feed of Eric
		    </p>
			<Link to='channel/three' className="secondary-content"><i className="material-icons">contact_phone</i></Link>
		  </li>
		  <li className="collection-item avatar">
		    <i className="material-icons circle red">play_arrow</i>
		    <span className="title">Drawing 401</span>
		    <p>Advaced stick figures
		    </p>
			<Link to='channel/four' className="secondary-content"><i className="material-icons">contact_phone</i></Link>
		  </li>
		</ul>
	)
}
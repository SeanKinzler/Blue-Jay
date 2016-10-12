import React from 'react';
import {Link} from 'react-router';

export default ({categoriesList, selectCategory}) => {
	return (
		<div>
			<ul className="collection with-header">
				<li className="collection-header">
				<h5 className='align-center'>Categories</h5>
				</li>
			</ul>
			<div className='row'>
				{ categoriesList.map((category, i) => {
					return (
						<div key={i} className='col s3 center-align'>
							<div className="chip">
							  <Link to='/search' 
							  			onClick={()=> { selectCategory([category]) } } >
							 		{ category }
							  </Link>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
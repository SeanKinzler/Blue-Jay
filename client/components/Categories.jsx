import React from 'react';
import {Link} from 'react-router';

export default ({categoriesList, selectCategory}) => {
	return (
		<div>
			<ul className="collection with-header">
				<li className="collection-header transparent componentGradient">
					<h5 className='align-center'>Categories</h5>
				</li>
			</ul>
			<div className='row'>
				{ categoriesList.map((category, i) => {
					return (
						<div key={i} className='col s3 center-align'>
							<div className="chip transparent componentRadGradient">
							  <Link to='/search' 
							  			onClick={()=> { selectCategory([category]) } } >
							 		<span className="color1-text text-lighten-5">{ category }</span>
							  </Link>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
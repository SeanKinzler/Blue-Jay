import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Carousel extends Component {
	componentDidMount() {
		setInterval(function(){
		  $('.carousel').carousel('next');
		}, 3000);
		$('.carousel.carousel-slider').carousel({full_width: true});
	}
	render() {
		return (
			<div className="carousel carousel-slider center" data-indicators="true">
			  <div className="carousel-fixed-item center">
			  	<Link 
			  		to='login' 
			  		className='btn waves-effect white grey-text darken-text-2'>
			  		Login/Signup
			  	</Link>
			  </div>
			  <div className="carousel-item red white-text" href="#one!">
			    <h2>Education</h2>
			    <p className="white-text">Attend or teach a class</p>
			  </div>
			  <div className="carousel-item amber white-text" href="#two!">
			    <h2>Entertainment</h2>
			    <p className="white-text">Stream yourself to friends</p>
			  </div>
			  <div className="carousel-item green white-text" href="#three!">
			    <h2>Everyone</h2>
			    <p className="white-text">Do you stream?</p>
			  </div>
			</div>
		)
	}
}

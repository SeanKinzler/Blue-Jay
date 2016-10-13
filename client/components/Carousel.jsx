import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeoutId: ''
    };
  }
  
  carouselSlide() {
    return setInterval(function() {
      $('.carousel').carousel('next');
    }, 5000);
  }

  componentDidMount() {
    var timeoutId = this.carouselSlide();
    this.setState({timeoutId: timeoutId});
    $('.carousel.carousel-slider').carousel({
      full_width: true,
      time_constant: 400
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timeoutId);
  }

  render() {
    return (
      <div className="carousel carousel-slider center" data-indicators="true">
        <div className="carousel-fixed-item center">
          <Link 
            to='/search' 
            className='btn waves-effect'>
            Discover Streams
          </Link>
        </div>
        <div className="carousel-item" href="#one!">
          <h2>Education</h2>
          <p>Attend or teach a class</p>
        </div>
        <div className="carousel-item" href="#two!">
          <h2>Entertainment</h2>
          <p>Stream yourself to friends</p>
        </div>
        <div className="carousel-item" href="#three!">
          <h2>Everyone</h2>
          <p>Do you stream?</p>
        </div>
      </div>
    )
  }
}

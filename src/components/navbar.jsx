import React from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery';

class NavBar extends React.Component {
  componentDidMount() { 
    $('.dropdown-toggle').on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
    
      var self = $(this);
      if(self.is('.disabled, :disabled')) {
        return false;
      }
      self.parent().toggleClass("open");
    });
    
    $(document).on('click', function(e) {
      if($('.dropdown').hasClass('open')) {
        $('.dropdown').removeClass('open');
      }
    });

    $('.sidebar-btn.sidebar-slider').on('click', function() {
      $('.overlay').show();
      $('nav').toggleClass("open");
    });
    
    $('.overlay').on('click', function() {
      if($('nav').hasClass('open')) {
        $('nav').removeClass('open');
      }
      $(this).hide();
    });
  }
  render() {
    return (
        <div>

          <header>
            <div className="header-inner clearfix">
              <div className="header-logo">
                <NavLink exact className="logo-text" to="/">
                  <b className="text-warning mt-2"><img src={require('../img/logo.png')} width="60" /></b>
                </NavLink>
              </div>
              <div className="header-menu d-none d-md-block">
                <ul className="ul-base">
                  <li><NavLink className="navitem sidebar-link" to="/trending">Trending</NavLink></li>
                  <li><NavLink className="navitem sidebar-link" to="/popular">Popular</NavLink></li>
                  <li><NavLink className="navitem sidebar-link" to="/top-rated">Top-rated</NavLink></li>
                  <li><a href="" className="google-plus" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                  <li><a href="" className="rss" target="_blank"><i className="fa fa-rss"></i></a></li>
                </ul>
              </div>
              <div className="header-menu">
                <ul className="ul-base">
                  <li><NavLink className="navitem sidebar-link" to="/"><i className="fa fa-home pr-2"></i>Home</NavLink></li>
                  <li><NavLink className="navitem sidebar-link" to="/search"><i className="fa fa-search pr-2"></i>Search</NavLink></li>
                </ul>
              </div>
            </div>
          </header>

        <div className="overlay"></div>
    </div>
    )
  }
}

export default NavBar

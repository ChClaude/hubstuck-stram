import React, { Component } from 'react'
import queryString from 'query-string'
import { getDetailedMovie , getIpAddress } from '../stores/services/moviesService'
import {endTheBar, beginTheBar} from '../stores/services/loadingBarService'

class DetailedMovie extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    movie: {},
    ipAddress: {},
    canRender: false
  }

  loadMovie = () => {
    beginTheBar()
    const { id } = queryString.parse(this.props.location.search)
    getDetailedMovie(id).then(data => this.setState({ movie: data }))
    getIpAddress().then(x => {
      this.setState({ ipAddress: x })
      endTheBar()
      this.setState({ canRender: true })
    })
  }

  componentDidMount() {
    this.loadMovie();
  }

  

  render() {
    const { history } = this.props
    const { movie, ipAddress } = this.state

    if (this.state.canRender) {
      return (
        <div>
        {navigator.onLine === true ? (
          movie.poster_path != null ? (
          <div className='container padding-top-md'>
            <div className='row'>
              <div className="col-md-8">
                <div className='row'>
                  <div className="col-md-6 order-md-2">
                  <h1>{movie.title}</h1>
                    <ul class="nav">
                      <li class="nav-item pr-2">Year: {movie.release_date.substring(0,4)}</li>
                      <li class="nav-item pr-2">Time: <i class="fas fa-stopwatch"></i> {movie.runtime} min</li>
                      <li class="nav-item pr-2">Lang: {movie.original_language}</li>
                      <li class="nav-item pr-2">Rate: {movie.vote_average}</li>
                    </ul>
                    <p className="movie-genre">
                      {movie.genres.map(genre => (
                        <span key={genre.id}> {genre.name}</span>
                      ))}
                    </p>
                    <div className='card_right__review'>
                      <p>{movie.overview}</p>
                      <a href={"http://www.imdb.com/title/"+movie.imdb_id+"/plotsummary?ref_=tt_stry_pl"} target='_blank'>Read more</a>
                    </div>
                    {movie.homepage != null ? (
                      <div className='card_right__button'>
                        <a href={movie.homepage} target='_blank'>VISIT WEBSITE</a>
                      </div> 
                    ) : (
                      " "
                    )}
                  </div>
                  <div className="col-md-6 order-md-1">
                    <img src={'http://image.tmdb.org/t/p/w500/' + movie.poster_path} className="img-fluid" />
                  </div>
                </div>
                  <div className='card_right__details mt-4'>
                    <iframe src={`http://movie2konline.net/api/openload.php?id=${movie.imdb_id}`} height="480" width="100%" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen"/>
                    
                    <div className="d-flex flex-wrap align-items-center">
                    {movie.production_companies.map(x => (
                      <div className="p-2" key={x.id}>
                        {x.logo_path != null ? (
                          <img src={'http://image.tmdb.org/t/p/w200/' + x.logo_path} height='40'/>
                        ) : (
                          <p className="agency-txt">{x.name}</p>
                        )}
                      </div>
                    ))}
                    </div>
                  </div>
              </div>
              <div className="col-md-4">
                <div className='card_right_far'>
                <h4 className="mt-4"><img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png"} width={"50"}/> Youtube relate</h4>
                <hr className="card-hr" />
                  {movie.videos.results.length !== 0 ? (
                    <div>
                      {movie.videos.results.map(trailer => (  
                        <div className='card_right__button' key={trailer.id}>
                        <p>{trailer.name}</p>
                          <a href={'https://www.youtube.com/watch?v='+trailer.key} id={trailer.id} target='_blank'>WATCH { trailer.type }</a>
                        </div>    
                      ))}
                    </div>
                  ) : (
                    "No Trailer Available"
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="content-loader">
            <h1 className="display-4">Nothing to show</h1>
          </div>
        )
        ) : (
          <div class="display-1">No Connection</div>
        )}
        </div>
      )
    } else return false;
    
  }
}

export default DetailedMovie

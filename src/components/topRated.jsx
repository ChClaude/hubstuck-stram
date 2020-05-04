import React, { Component } from "react";
import Movie from "./movie";
import Pagination from "./pagination";
import { getTopRated } from "../stores/services/moviesService";
import { beginTheBar, endTheBar } from "../stores/services/loadingBarService";
import ListOrGrid from "./listOrGrid";
import queryString from "query-string";

class TopRated extends Component {
  state = {
    movies: [],
    rawData: [],
    currentPage: 1,
    layoutMode: 'grid'
  };

  getHeaderQuery = () => queryString.parse(this.props.location.search)


  componentDidMount() {
    beginTheBar();
    let page = this.getHeaderQuery().page || this.state.currentPage
    let layout = this.getHeaderQuery().layout || this.state.layoutMode
    this.props.history.push(`/top-rated?&page=${page}&layout=${layout}`);

    if(layout !== this.state.layoutMode) {
      this.setState({layoutMode: layout})
    }
    if(page !== this.state.currentPage) {
      this.setState({currentPage: page})

    }
    beginTheBar();

    getTopRated(this.state.currentPage).then(movies => {
      this.setState({ movies: movies.results, rawData: movies }, () => {
        endTheBar();
      });
    });
  }

  handlePageChange = page => {
    beginTheBar();
    this.setState({ currentPage: page }, () => {
      getTopRated(this.state.currentPage).then(movies => {
        this.setState({ movies: movies.results, rawData: movies }, () => {
          endTheBar();
        });
      });
    });
  };

  pushToHistory = (page, layout) => {
    this.props.history.push(`/top-rated?&page=${page}&layout=${layout}`);
  };

  handleLayoutChange = mode => {
    this.setState({ layoutMode: mode }, () => {
      this.pushToHistory(this.state.currentPage, this.state.layoutMode);
    });
  };

  render() {
    const { movies } = this.state;
    const { total_pages: totalPages, page: currentPage } = this.state.rawData;

    return (
      <div className="container padding-top-md">
        <div className="row">
          <div className="col-md-12">
            <div className="justify-content-between">
              <div class="d-flex">
                <ListOrGrid
                  active={this.state.layoutMode}
                  changeLayout={e => this.handleLayoutChange(e)}
                />
                <h2 className="ml-2">Top Rate</h2>
              </div>
            <div className="tiles">
              {movies.map(m => (
                <Movie key={m.id} movie={m} type={this.state.layoutMode} />
              ))}
            </div>
              <div className='my-3'>
              <Pagination
                pageCount={totalPages || 1}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default TopRated;

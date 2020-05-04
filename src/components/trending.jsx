import React, { Component } from "react";
import Pagination from "./pagination";
import Movie from "./movie";
import { getTrending } from "../stores/services/moviesService";
import { beginTheBar, endTheBar } from "../stores/services/loadingBarService";
import ListOrGrid from "./listOrGrid";
import queryString from "query-string";

class Popular extends Component {
  state = {
    movies: [],
    rawData: [],
    currentPage: 1,
    layoutMode: "grid"
  };


  getHeaderQuery = () => queryString.parse(this.props.location.search)


  componentDidMount() {
    beginTheBar();
    let page = this.getHeaderQuery().page || this.state.currentPage
    let layout = this.getHeaderQuery().layout || this.state.layoutMode
    this.props.history.push(`/trending?&page=${page}&layout=${layout}`);

    if(layout !== this.state.layoutMode) {
      this.setState({layoutMode: layout})
    }
    if(page !== this.state.currentPage) {
      this.setState({currentPage: page})

    }
    getTrending(this.state.currentPage).then(movies => {
      this.setState({ movies: movies.results, rawData: movies }, () => {
        endTheBar();
      });
    });
  }

  pushToHistory = (page, layout) => {
    this.props.history.push(`/trending?&page=${page}&layout=${layout}`);
  };

  handleLayoutChange = mode => {
    this.setState({ layoutMode: mode }, () => {
      this.pushToHistory(this.state.currentPage, this.state.layoutMode);
    });
  };

  handlePageChange = page => {
    beginTheBar();
    this.setState({ currentPage: page }, () => {
      getTrending(this.state.currentPage).then(movies => {
        this.setState({ movies: movies.results, rawData: movies }, () => {
          endTheBar();
          this.pushToHistory(this.state.currentPage, this.state.layoutMode)
        });
      });
    });
  };

  render() {
    const { movies } = this.state;
    const { total_pages: totalPages, page: currentPage } = this.state.rawData;
    return (
      <div className="container padding-top-md">
        <div className="justify-content-between">
          <div className="d-flex">
            <ListOrGrid
              active={this.state.layoutMode}
              changeLayout={e => this.handleLayoutChange(e)}
            />
            <h2 className="ml-2">Trending</h2>
          </div>
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
    );
  }
}

export default Popular;

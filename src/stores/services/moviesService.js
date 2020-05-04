const API_KEY = "087a15f97ae0caf207dbc11e4e297393";


export function searchMovie(title, page) {
  let API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&append_to_response=releases`

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}&query=${encodeURI(title)}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getGenresByID(ids) {
  const genres = [
    {
      id: 28,
      name: 'Action'
    },
    {
      id: 12,
      name: 'Adventure'
    },
    {
      id: 16,
      name: 'Animation'
    },
    {
      id: 35,
      name: 'Comedy'
    },
    {
      id: 80,
      name: 'Crime'
    },
    {
      id: 99,
      name: 'Documentary'
    },
    {
      id: 18,
      name: 'Drama'
    },
    {
      id: 10751,
      name: 'Family'
    },
    {
      id: 14,
      name: 'Fantasy'
    },
    {
      id: 36,
      name: 'History'
    },
    {
      id: 27,
      name: 'Horror'
    },
    {
      id: 10402,
      name: 'Music'
    },
    {
      id: 9648,
      name: 'Mystery'
    },
    {
      id: 10749,
      name: 'Romance'
    },
    {
      id: 878,
      name: 'Sci-Fi'
    },
    {
      id: 10770,
      name: 'TV Movie'
    },
    {
      id: 53,
      name: 'Thriller'
    },
    {
      id: 10752,
      name: 'War'
    },
    {
      id: 37,
      name: 'Western'
    }
  ]
  let data = []

  ids.forEach(id => {
    let genre = genres.find(g => id === g.id)
    data = [...data, genre]
  })

  return data
}
export function getLatest() {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function getTrending(page) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
    )
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Get most popular Movie 
export function getPopular(page) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Get top rated Movie 
export function getTopRated(page) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
    )
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Get Movie detail 
export function getDetailedMovie(movieID) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&append_to_response=videos`)
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Get tv detail 
export function getDetailedtv(movieID) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.themoviedb.org/3/tv/${movieID}?api_key=${API_KEY}&append_to_response=videos`)
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Get Ip Address 
export function getIpAddress() {
  return new Promise((resolve, reject) => {
    fetch('https://api6.ipify.org?format=json')
      .then(response => response.json())
      .then(json => {
        resolve(json)
      })
      .catch(err => {
        reject(err)
      })
  })
}


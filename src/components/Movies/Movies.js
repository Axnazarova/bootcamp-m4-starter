import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {
        movies: [],
    }



    changeState = () => {
        this.setState({
            movies: this.props.data,

        })
    }

    componentDidMount() {
        this.changeState()
    }



    render() {

        return (

            <>
                <ul className="movies">
                    {this.state.movies && (
                        this.state.movies.map((movie) => (
                            <li className="movies__item" key={movie.imdbID}>
                                < MovieItem {...movie} onStateChange={this.props.onStateChange} />
                            </li>
                        )))}

                </ul>
            </>

        );
    }
}

export default Movies;
import React, { Component } from 'react';
import './MovieItem.css';



class MovieItem extends Component {
    constructor(props) {
        super(props);


        this.state = {
            movie: this.props,
            movieTitle: this.props.Title,
            movieYear: this.props.Year,
            movieİmdbi: this.props.imdbID,
            buttonText: 'Добавить в список',
            buttonActive: this.props.buttonActive

        }

    }




    handleClick = () => {
        this.props.onStateChange(this.state.movieTitle, this.state.movieYear, this.state.movieİmdbi);

    }



    render() {

        const { Title, Year, Poster } = this.props;

        return (
            <form>
                <article className="movie-item">
                    <img className="movie-item__poster" src={Poster} alt='No poster:(' />
                    <div className="movie-item__info">
                        <h3 className="movie-item__title" >{Title}&nbsp;({Year})</h3>
                        <button onClick={this.handleClick} type="button" className="movie-item__add-button" disabled={this.state.buttonActive}>{this.state.buttonText}</button>


                    </div>
                </article>
            </form>

        );
    }
}

export default MovieItem;


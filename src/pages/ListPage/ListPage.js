import React, { Component } from 'react';
import './ListPage.css';


class ListPage extends Component {
    state = {
        movies: [],
        titleList: 'Мой список'
    }




    componentDidMount() {

        this.setState({ movies: this.props.store, titleList: this.props.titleName })
    }


    render() {

        return (
            <div className="list-page" >
                <h1 className="list-page__title">{this.state.titleList}</h1>
                <ul>
                    {this.state.movies.map((item) => {

                        const link = item.imdbID
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${link}/`} target="_blank" rel="noopener noreferrer">{item.title} ({item.year})</a>


                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}


export default ListPage;
import React, { Component } from 'react';
import './ListPage.css';
import { withRouter } from 'react-router-dom';



class ListPage extends Component {
    state = {
        movies: [],
        titleList: 'Мой список',
    }






    componentDidMount() {
        const id = this.props.match.params.id

        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(response => response.json())
            .then(data => {

                this.setState({ movies: data.movies, titleList: data.title })
            })
    }





    render() {

        return (
            <div className="list-page" >
                <h1 className="list-page__title">{this.state.titleList}</h1>

                <ul>
                    {this.state.movies.map((item) => {

                        const link = item.id
                        return (

                            <li key={item.id} >
                                <a href={`https://www.imdb.com/title/${link}/`} target="_blank" rel="noopener noreferrer">{item.value}</a>
                            </li>
                        );
                    })}

                </ul>
            </div >
        );
    }
}



export default withRouter(ListPage);
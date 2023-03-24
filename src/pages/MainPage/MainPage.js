import React, { Component } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';
import { store } from '../../store/store'

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myState: [],
            data: '',
            isLoading: false,
            status: true,
            favorites: [],
            buttonActive: false,

        };
        this.handleStateChange = this.handleStateChange.bind(this);
    }




    handleStateChange(newState, year, id) {
        const item = {
            id: id,
            value: newState + " " + '(' + year + ')'
        };
        const myState = this.state.myState
        const founded = myState.find((item) => {
            return item.id === id
        })

        if (!founded) {
            this.setState({
                myState: [...this.state.myState, item],


            });
        }



        store.dispatch({
            type: 'ADD_TO_LIST',
            payload: { newState, year, id }

        }
        )

    }






    getData = async (link) => {
        await fetch(`http://www.omdbapi.com/?s=${link}&apikey=d7c9e26d`)
            .then(res => res.json())
            .then(data => {

                this.setState({
                    data: data.Search,
                    isLoading: true,
                    status: !this.state.status
                })


            });
    };

    handleDelete = (id) => {
        const updatedList = this.state.myState.filter((item) => item.id !== id);
        this.setState({ myState: updatedList });

        store.dispatch({
            type: 'DELETE_FROM_LIST',
            payload: { id }

        }
        )

    }








    render() {

        return (
            <div className="main-page">
                <Header />
                <main className="main-page__content">
                    <section className="main-page__main-section">
                        <div className="main-page__search-box">
                            <SearchBox getData={this.getData} />
                        </div>
                        <div className="main-page__movies" key={Date.now()}>
                            {this.state.isLoading ? < Movies data={this.state.data} onStateChange={this.handleStateChange} status={this.state.status} handleAddToFavorites={this.handleAddToFavorites} /> : null}
                        </div>
                    </section>
                    <aside className="main-page__favorites">
                        <Favorites data={this.state.data} myState={this.state.myState} stateYear={this.state.stateYear} onDelete={this.handleDelete} />
                    </aside>
                </main>
            </div >

        );
    }
}

export default MainPage;
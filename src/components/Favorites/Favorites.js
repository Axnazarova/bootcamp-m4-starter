import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Favorites.css';
import { store } from '../../store/store'



class Favorites extends Component {
    state = {
        inputTitle: '',
        hideButton: false,
        store: store.getState().load,
        moviesId: store.getState().movie,
        id: ''
    }

    addTitle = (event) => {
        this.setState({ inputTitle: event.target.value })
    }



    saveList = async () => {
        const { inputTitle } = this.state;
        const myState = this.props.myState;
        const list = {
            title: inputTitle,
            movies: myState.map((item) => item.id),
        };

        try {
            const response = await axios.post(
                'https://acb-api.algoritmika.org/api/movies/list',
                list,
                { headers: { 'Content-Type': 'application/json' } }
            );


            const id = response.data.id;
            this.setState({
                id: id
            });

            store.dispatch({
                type: 'ADD_ID_LIST',
                payload: { id }

            }
            )

            store.dispatch({
                type: 'ADD_TITLE_LIST',
                payload: { name: this.state.inputTitle }
            })
            this.setState({ hideButton: true, store: store.getState().load })


        } catch (error) {
            alert(error);
        }


    };









    render() {



        const { inputTitle, hideButton, store, id } = this.state;



        return (




            <form >
                <div className="favorites">
                    <input onChange={this.addTitle} value={this.state.inputTitle} className="favorites__name" placeholder="Введите название списка" disabled={hideButton} />

                    <ul className="favorites_list">
                        {this.props.myState && this.props.myState.map((item) => (
                            <li className="flex" key={item.id}>
                                <div className="favorites_item" key={item.id}>
                                    {item.value}

                                </div>
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    this.props.onDelete(item.id)
                                }} className="favorites_delete">X</button>
                            </li>
                        ))}




                    </ul>
                    {hideButton && store ? <Link to={`/list/${id}`}>Перейти к списку</Link> : <button onClick={this.saveList} type="button" className="favorites__save" disabled={!inputTitle}>Сохранить список</button>}
                </div>
            </form >
        );
    }
}



export default Favorites;



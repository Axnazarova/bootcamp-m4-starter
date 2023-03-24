

const initialState = {
    movie: [],
    load: false,
    name: ''
}
export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            const movie = [...state.movie]
            const founded = movie.find(elem => elem.imdbID === action.payload.id)
            if (founded) {
                return state
            }

            movie.push({
                title: action.payload.newState,
                year: action.payload.year,
                imdbID: action.payload.id
            })

            return {
                ...state,
                movie: movie,
                load: true
            }

        case 'DELETE_FROM_LIST':
            const movie2 = [...state.movie]
            const filteredMovies = movie2.filter(elem => elem.imdbID !== action.payload.id)
            return {
                ...state,
                movie: filteredMovies,
                load: true
            }
        case 'ADD_TITLE_LIST':
            return {
                ...state,
                name: action.payload.name
            }


        case 'ADD_ID_LIST':
            return {
                ...state,
                id: action.payload.id
            }
        default: return state
    }


}
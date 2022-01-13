import { writable } from "svelte/store";
import { initialState, Pokemon, type UPDATE_TYPES } from "./state.types";

export const getState = writable(initialState);

function store() {
    const { subscribe, set, update } = getState;

    return {
        subscribe,
        set,
        update: (type: UPDATE_TYPES, data) => {
            switch (type) {
                case 'setLoading':
                    update(state => ({ ...state, isLoading: data }));
                    break;
                case 'setPokemons':
                    update(state => ({ ...state, pokemons: data, isLoading: false, count: data.length }));
                    break;
                case 'setCount':
                    update(state => ({ ...state, count: data }));
                    break;
                case 'setFavorite':
                    update(state => ({ ...state, favorite: [...state.favorite, data] }));
                    break;
                case 'removeFavorite':
                    update(state => ({
                        ...state,
                        favorite: [
                            ...state.favorite.filter(item => item !== data)
                        ]
                    }));
                    break;
                default:
                    break;
            }
        },
    }
}


export const centralStore = store();

export const getPokemonDetail = (id: number) => {
    let pokemon = {};

    centralStore.subscribe(state => {
        pokemon = state.pokemons?.find(item => item.id === id);
    })
    return pokemon;
}

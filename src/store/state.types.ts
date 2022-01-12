
export interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    abilities: [{
        ability: {
            name: string;
        }
    }
    ]
}

export interface AppState {
    count: number;
    pokemons: Pokemon[];
    isLoading: boolean;
    favorite: number[];
}

export const initialState: AppState = {
    count: 0,
    pokemons: [],
    isLoading: false,
    favorite: [],
}

export type UPDATE_TYPES = 'setLoading' | 'setPokemons' | 'setCount' | 'setFavorite' | 'removeFavorite';
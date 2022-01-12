import axios from "axios";
import type { Pokemon } from "../store/state.types";
import { centralStore } from "../store/store";

export const INIT_POKES = 'pokemon?limit=12&offset=200'

const axiosAPI = axios.create({
    baseURL : "https://pokeapi.co/api/v2/"
});

export function apiRequest(url: string): Promise<any> {
    return axiosAPI.get(url);
}

export async function loadPokemons() {
    let pokemons: Array<Pokemon>= []

    centralStore.update('setLoading', true);
    const response = await apiRequest(INIT_POKES);
    for (const item of response.data.results) {
        pokemons =[...pokemons, await (await axiosAPI.get(item.url)).data]
    }
    centralStore.update('setPokemons', pokemons);
    centralStore.update('setCount', pokemons.length);
    centralStore.update('setLoading', false);
}
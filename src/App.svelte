<script lang="ts">
  import { onMount } from "svelte";
  import { loadPokemons } from "./api/api";
  import CardList from "./components/CardList.svelte";
  import Header from "./components/Header.svelte";
  import type { Pokemon } from "./store/state.types";
  import { centralStore } from "./store/store";

  let loading: boolean;
  let count: number;
  let pokemons: Pokemon[];

  centralStore.subscribe((data) => {
    loading = data?.isLoading;
    count = data?.count;
    pokemons = data?.pokemons;
  });

  onMount(async () => {
    loadPokemons();
  });
</script>

<main>
  <Header {loading} {count} />
  {#if !loading}
    <CardList {pokemons} />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #f8f8f8;
  }
</style>

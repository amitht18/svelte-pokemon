<script lang="ts">
import { centralStore } from "../store/store";


  export let loading = false;
  export let count = 0;

  let arrayOfFavorites: number[] = [];
  centralStore.subscribe((state) => {
    arrayOfFavorites = state.favorite;
  });

  $: favoutites = arrayOfFavorites.length;

</script>

<header class="header">
    <div class="header-left">
        <h1>Pokemons</h1>
        {#if loading}
        <span>Loading pokemons</span>
        {:else}
        <span>{count}</span> pokemons loaded
        {/if}
    </div>
    <div class="header-right">
        Pokemons liked: <span>{favoutites}</span>
    </div>
</header>

<style>
  .header {
    padding: 15px 30px;
    background: #fff;
    border-bottom: 1px solid #eee;
    width: inherit;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin: 0;
  }
</style>

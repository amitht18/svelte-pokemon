<script lang="ts">
  import Card from "./ Card.svelte";
  import type { Pokemon } from "./../store/state.types";

  export let pokemons: Pokemon[] = [];
</script>

<div class="cards-container">
  {#each pokemons as pokemon}
    <Card {pokemon} />
  {/each}
</div>

<style>
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-evenly;
    align-self: center;
    max-width: 1200px;
    margin-top: 30px;
  }
</style>

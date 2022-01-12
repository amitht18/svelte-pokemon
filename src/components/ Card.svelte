<script lang="ts">
  import type { Pokemon } from "./../store/state.types";
  import Icon from "@iconify/svelte";
  import { centralStore } from "../store/store";

  let arrayOfFavorites: number[] = [];
  centralStore.subscribe((state) => {
    arrayOfFavorites = state.favorite;
  });

  $: isFavorite = (): boolean => {
    return !!arrayOfFavorites.find((item) => item === pokemon.id);
  };

  function toggleFavorite() {
    if (isFavorite()) {
      centralStore.update("removeFavorite", pokemon.id);
    } else {
      centralStore.update("setFavorite", pokemon.id);
    }
  }

  export let pokemon: Pokemon;
</script>

<div class="card" id={`${pokemon.id}`}>
  <div class="card-header">
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <span class="card-header__title">{pokemon.name}</span>
  </div>
  <div class="card-body">
    <div class="card-body__labels">
      {#each pokemon.abilities as ability}
        <span class="abilities">{ability.ability.name}</span>
      {/each}
    </div>
  </div>
  <div class="card-footer">
    <div class="card-footer__details">
      <span class="height">H: {pokemon.height}</span>
      <span class="weight">W: {pokemon.weight}</span>
    </div>
    <div class="card-footer__add-fav" on:click={toggleFavorite}>
      {#if isFavorite()}
        <Icon class="favorite" icon="carbon:favorite-filled" />
      {:else}
        <Icon icon="carbon:favorite" />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import './card.scss';
</style>

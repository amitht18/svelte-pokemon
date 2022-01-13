<script lang="ts">
  import FavoriteFilled from "./../assets/icons/heart.svg";
  import SearchIcon from "./../assets/icons/search.svg";
  import { centralStore } from "../store/store";
  import { createEventDispatcher } from "svelte";
  import { clickOutside } from "../helpers/click-outside";
  import type { Pokemon } from "../store/state.types";

  const dispatch = createEventDispatcher();

  export let loading = false;
  export let count = 0;
  let isFavListOpen = false;

  let arrayOfFavorites: number[] = [];
  centralStore.subscribe((state) => {
    arrayOfFavorites = state.favorite;
  });
  $: favoutites = arrayOfFavorites.length;

  $: favoritePokemonDetailList = [];
  centralStore.subscribe((state) => {
    favoritePokemonDetailList = [];
    arrayOfFavorites.map((id) => {
      favoritePokemonDetailList.push(
        state.pokemons.find((pokemon) => pokemon.id === id)
      );
    });
  });

  function handleSearch(event) {
    dispatch("search", { searchString: event.target.value });
  }

  function handleClickOutside() {
    isFavListOpen = false;
  }

  function openFavList() {
    isFavListOpen = true;
  }
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
    <div class="search-box">
      <input
        name="search"
        type="text"
        placeholder="Search"
        on:input={handleSearch}
      />
      <span class="search-icon">
        {@html SearchIcon}
      </span>
    </div>
    <div class="header-right__like-indicator" on:click={openFavList}>
      <span class="icon-liked">
        {@html FavoriteFilled}
      </span>
      <span class="liked-label"> Pokemons liked: </span>
      <span>{favoutites}</span>
      {#if isFavListOpen}
        <div
          class="favorites-list"
          use:clickOutside
          on:click_outside={handleClickOutside}
        >
          {#if favoritePokemonDetailList.length > 0}
            {#each favoritePokemonDetailList as favPoke}
              <div class="fav-poke">
                <img src={favPoke.sprites.front_default} />
                <span>{favPoke.name}</span>
              </div>
            {/each}
          {:else}
            <div class="empty-list">
              <span>No pokemons liked yet</span>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</header>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    background: #fff;
    border-bottom: 1px solid #eee;
    width: inherit;
    position: sticky;
    top: 0;
    z-index: 1;
    transition: all 0.3s ease;

    &-right {
      display: flex;
      align-items: center;
      gap: 10px;

      .search-box {
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 5px 10px;
        width: 200px;
        height: 30px;
        background: #fafafa;
        transition: all 0.3s ease;
        margin-right: 10px;

        &:hover {
          border: 1px solid #ccc;
        }

        input {
          border: none;
          outline: none;
          width: 100%;
          height: 100%;
          background: transparent;
          font-size: 14px;
          font-weight: 300;
          color: #333;
          transition: all 0.3s ease;
          margin: 0;
        }

        .search-icon {
          width: 24px;
          height: 24px;
        }
      }

      &__like-indicator {
        position: relative;
        display: flex;
        align-items: center;
        gap: 4px;
        border: 2px solid #fb7676;
        border-radius: 20px;
        padding-right: 8px;

        .favorites-list {
          position: absolute;
          right: 0;
          top: 40px;
          width: 300px;
          height: 400px;
          overflow: auto;
          background: #fbfbfb;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
            rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

          .fav-poke {
            height: 80px;
            display: flex;
            margin: 10px;
            background: #fff;
            border-radius: 5px;
          }
          .fav-poke img {
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .fav-poke span {
            padding: 5px 10px;
            font-size: 16px;
            font-weight: 500;
            text-transform: capitalize;
          }

          .empty-list {
            height: calc(100% - 20px);
            width: calc(100% - 20px);
            margin: 10px;
            background: #fff;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .icon-liked {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: #fb7676;
        border-radius: 50%;
      }
    }
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin: 0;
  }

  // mobile breakpoint
  @media (max-width: 768px) {
    h1 {
      font-size: 2em;
    }

    .header-right {
      .liked-label {
        display: none;
      }
    }
  }

  // mobile breakpoint
  @media (max-width: 520px) {
    .header {
      flex-direction: column;

      &-right {
        width: 100%;
        justify-content: space-between;
        margin-top: 20px;
      }
    }
  }

  :global(.icon-liked svg) {
    width: 18px;
    height: 18px;
  }

  :global(.icon-liked svg path) {
    fill: #fff;
    stroke: #fff;
  }
</style>

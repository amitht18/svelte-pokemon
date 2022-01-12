<script lang="ts">
  import FavoriteFilled from "./../assets/icons/heart.svg";
  import SearchIcon from "./../assets/icons/search.svg";

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
    <div class="search-box">
      <input name="search" type="text" placeholder="Search" />
      <span class="search-icon">
        {@html SearchIcon}
      </span>
    </div>
    <div class="header-right__like-indicator">
      <span class="icon-liked">
        {@html FavoriteFilled}
      </span>
      <span class="liked-label"> Pokemons liked: </span>
      <span>{favoutites}</span>
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
        display: flex;
        align-items: center;
        gap: 4px;
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

  :global(.icon-liked svg) {
    width: 18px;
    height: 18px;
  }

  :global(.icon-liked svg path) {
    fill: #fff;
    stroke: #fff;
  }
</style>

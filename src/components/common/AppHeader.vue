<template>
  <header class="container-fluid">
    <nav class="container w-100">
      <div>
        <router-link to="eth">ETH</router-link>
        <router-link to="erc20">ERC20</router-link>
        <router-link to="btc">BTC</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped lang="scss">
header {
  background: var(--color-orange);
  padding: 10px 0;
  max-width: 100%;
  display: flex;
  justify-content: left;
  align-items: start;

  nav {
    display: flex;
    justify-content: start;
    align-items: start;
  }

  div {
    border: 3px solid black;
    display: flex;
  }

  a {
    text-align: center;
    min-width: 60px;
    font-size: 20px;
    font-weight: 700;
    padding: 0 10px;
    height: 100%;

    &.router-link-exact-active {
      color: var(--color-white);
      background: black;
    }
  }
}
</style>

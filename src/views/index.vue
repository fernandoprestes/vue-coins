<script setup lang="ts">
  import CardCoinList from '~/components/CardCoinList.vue';
  import TheHeader from '~/components/TheHeader.vue';
</script>

<template>
  <main class="h-screen w-full bg-background pt-8 text-white md:px-8">
    <TheHeader />
    <CardCoinList />
  </main>
</template>

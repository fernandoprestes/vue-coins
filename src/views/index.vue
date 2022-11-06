<script setup lang="ts">
  import TheHeader from '~/components/TheHeader.vue';
  import CardCoinList from '~/components/CardCoinList.vue';
  import TableListMarketCap from '~/components/TableListMarketCap.vue';
</script>

<template>
  <main class="h-screen w-full overflow-auto bg-background pt-8 pb-4 text-white md:px-8">
    <TheHeader />
    <CardCoinList />
    <TableListMarketCap />
    <div class="pt-4">
      <p class="text-center text-gray-500">
        2022 -
        <a
          class="hover:text-gray-300"
          href="https://github.com/fernandoprestes"
        >
          github/fernandoprestes
        </a>
      </p>
    </div>
  </main>
</template>

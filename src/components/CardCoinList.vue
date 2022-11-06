<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
  import { inject, onMounted, reactive } from 'vue';
  import type SimpleService from '~/services/SimpleService';
  import CardCoinItem from './CardCoinItem.vue';

  const simpleService = inject('simpleService') as SimpleService;

  const ids = ['bitcoin', 'ethereum', 'cardano', 'terra-luna-2', 'solana', 'polkadot', 'dacxi'];
  const currencies = ['usd', 'brl'];
  const query = `ids=${ids}&vs_currencies=${currencies}&precision=6`;

  interface ICoins {
    coinName: string;
    currencies: { usd: number; brl: number };
  }

  const state = reactive({ coins: [] as ICoins[] });

  onMounted(async () => {
    const response = Object.entries(await simpleService.getSimplePrice(query));
    response.forEach((item: [string, any]) => {
      state.coins.push({ coinName: item[0], currencies: item[1] });
    });
    state.coins.sort((a, b) => (a.coinName > b.coinName ? 1 : b.coinName > a.coinName ? -1 : 0));
  });
</script>

<template>
  <div
    class="mx-auto grid h-[416px] max-w-[1330px] gap-4 overflow-auto px-4 sm:grid-cols-2 md:flex md:h-auto md:flex-row md:py-4 md:px-0"
  >
    <CardCoinItem
      v-for="(item, index) in state.coins"
      :key="index"
      :coin-name="item.coinName"
      :coin-currency-brl="item.currencies.brl"
      :coin-currency-usd="item.currencies.usd"
    />
  </div>
</template>

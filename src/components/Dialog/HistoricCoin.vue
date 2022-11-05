<script lang="ts" setup>
  import { inject, onMounted, reactive, watch } from 'vue';
  import { currencyFormatter } from '~/composables/useFormatter';
  import type CoinsService from '~/services/CoinsService';

  const coinsService = inject('coinsService') as CoinsService;

  interface Props {
    data: { id: string };
  }
  const props = defineProps<Props>();

  const state = reactive({
    isLoading: true,
    teste: '',
    date: new Date().toLocaleString('pt-BR', { dateStyle: 'short' }).replaceAll('/', '-'),
    inputDateSearch: new Date()
      .toLocaleString('pt-BR', { dateStyle: 'short' })
      .replaceAll('/', '-')
      .split('-')
      .reverse()
      .join('-'),
    coin: {
      name: '',
      symbol: '',
      image: '',
      current_price: {
        brl: 0,
        usd: 0,
      },
    },
  });

  async function findOneCoinHisticalBtDate() {
    state.isLoading = true;
    const { name, symbol, image, market_data } = await coinsService.getCoinsHistoricalByDate(props.data.id, state.date);
    state.coin.name = name;
    state.coin.symbol = symbol;
    state.coin.image = image.small;
    state.coin.current_price.brl = market_data.current_price.brl;
    state.coin.current_price.usd = market_data.current_price.usd;
    state.isLoading = false;
  }

  watch(
    () => state.inputDateSearch,
    () => {
      if (!state.inputDateSearch) return;
      const newDate = state.inputDateSearch.toString().split('-').reverse().join('-');
      const currentDate = new Date().toLocaleString('pt-BR', { dateStyle: 'short' }).replaceAll('/', '-');
      if (newDate > currentDate) return;
      state.date = newDate;
      findOneCoinHisticalBtDate();
    },
  );

  onMounted(async () => {
    await findOneCoinHisticalBtDate();
    state.isLoading = false;
  });
</script>

<template>
  <div
    v-if="state.isLoading"
    class="flex-1"
  >
    ...carregando
  </div>
  <div
    v-else
    class="flex w-full flex-1 flex-col gap-4"
  >
    <div class="flex items-center gap-4">
      <img
        class="h-12 w-12"
        :src="state.coin.image"
        :alt="state.coin.name"
      />
      <div>
        <h2 class="text-2xl">{{ state.coin.name }}</h2>
        <span class="text-xl font-thin">{{ state.coin.symbol }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="flex justify-between text-lg">
        R$ <span> {{ currencyFormatter(state.coin.current_price.brl.toString(), 'BRL') }}</span>
      </div>
      <div class="flex justify-between">
        US$ <span>{{ currencyFormatter(state.coin.current_price.usd.toString(), 'USD') }}</span>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-gray-700 py-2 text-white">
    <input
      v-model="state.inputDateSearch"
      class="w-full border-none bg-transparent p-2 outline-none"
      type="date"
    />
  </div>
</template>

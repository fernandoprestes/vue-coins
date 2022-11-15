<script lang="ts" setup>
  import { inject, onMounted, reactive, ref, watch } from 'vue';
  import { currencyFormatter } from '~/composables/useFormatter';
  import type CoinsService from '~/services/CoinsService';
  import Loading from '../Loading.vue';

  const coinsService = inject('coinsService') as CoinsService;

  interface Props {
    data: { id: string };
  }
  const props = defineProps<Props>();

  const errorMessage = ref('');

  const state = reactive({
    isLoadingContent: true,
    isValidDateRange: true,
    isLoadingUpdate: false,
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

  async function findOneCoinHisticalByDate() {
    state.isLoadingContent = true;
    const { name, symbol, image, market_data } = await coinsService.getCoinsHistoricalByDate(props.data.id, state.date);
    state.coin = {
      name,
      symbol,
      image: image.small,
      current_price: {
        brl: market_data.current_price.brl,
        usd: market_data.current_price.usd,
      },
    };
    state.isLoadingContent = false;
  }

  async function updateCurrentPrice() {
    state.isValidDateRange = false;
    state.isLoadingUpdate = true;
    const { market_data } = await coinsService.getCoinsHistoricalByDate(props.data.id, state.date);
    state.coin = {
      ...state.coin,
      current_price: {
        brl: market_data.current_price.brl,
        usd: market_data.current_price.usd,
      },
    };
    state.isValidDateRange = true;
    state.isLoadingUpdate = false;
  }

  watch(
    () => state.inputDateSearch,
    () => {
      errorMessage.value = '';
      if (!state.inputDateSearch) return;
      if (new Date(state.inputDateSearch).toISOString() > new Date().toISOString()) {
        errorMessage.value = 'Data incorreta! Selecione uma data anterior da data atual!';
        state.isValidDateRange = false;
        state.isLoadingUpdate = false;
        return;
      }
      const newDate = state.inputDateSearch.toString().split('-').reverse().join('-');
      state.date = newDate;
      updateCurrentPrice();
    },
  );

  onMounted(async () => {
    await findOneCoinHisticalByDate();
    state.isLoadingContent = false;
  });
</script>

<template>
  <Loading v-if="state.isLoadingContent" />
  <div
    v-else
    class="flex w-full flex-1 flex-col justify-between gap-4"
  >
    <div class="flex items-center justify-start gap-4">
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

    <Loading v-if="state.isLoadingUpdate" />
    <div v-else>
      <div
        v-if="!state.isValidDateRange"
        class="flex flex-1 flex-wrap items-center justify-center text-center"
      >
        <p class="w-64">
          {{ errorMessage }}
        </p>
      </div>
      <div
        v-else
        class="flex flex-col"
      >
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
        class="w-full appearance-none border-none bg-transparent p-2 outline-none"
        type="date"
      />
    </div>
  </div>
</template>
<style lang="css" scoped>
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
</style>

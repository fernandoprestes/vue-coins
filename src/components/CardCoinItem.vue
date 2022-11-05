<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';

  import { currencyFormatter } from '~/composables/useFormatter';

  interface Props {
    coinName: string;
    coinCurrencyBrl: number;
    coinCurrencyUsd: number;
  }
  const props = defineProps<Props>();

  const imgUrl = ref();
  watchEffect(async () => {
    imgUrl.value = (await import(/* @vite-ignore */ `../assets/img/${props.coinName}.png`)).default;
  });
</script>

<template>
  <div class="flex min-w-[240px] flex-1 flex-col space-y-2 rounded-lg border border-gray-700 px-4 py-3">
    <div class="flex items-center gap-4">
      <img
        class="h-8 w-8"
        :src="imgUrl"
        :alt="`${coinName} coin`"
        :title="`${coinName} coin`"
      />
      <h2 class="text-2xl capitalize">{{ coinName.replaceAll('-', ' ') }}</h2>
    </div>
    <div class="flex flex-col font-bold">
      <div class="flex justify-between text-xl">
        R$ <span>{{ currencyFormatter(coinCurrencyBrl.toString(), 'BRL') }}</span>
      </div>
      <div class="flex justify-between text-lg">
        US$ <span>{{ currencyFormatter(coinCurrencyUsd.toString(), 'USD') }}</span>
      </div>
    </div>
  </div>
</template>

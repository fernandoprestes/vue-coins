<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { currencyFormatter } from '~/composables/useFormatter';

  import useDialog from '~/composables/useDialog';
  const { open } = useDialog();

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

  function handleOpenDialog() {
    open({ component: 'DialogHistoricCoin', props: { id: props.coinName } });
  }
</script>

<template>
  <div
    class="flex min-w-[240px] flex-1 cursor-pointer flex-col space-y-2 rounded-lg border border-gray-700 px-4 py-3 hover:border-gray-500"
    @click="handleOpenDialog"
  >
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
      <div class="flex gap-8 text-xl md:justify-between">
        R$ <span>{{ currencyFormatter(coinCurrencyBrl.toString(), 'BRL') }}</span>
      </div>
      <div class="flex gap-8 text-lg md:justify-between">
        US$ <span>{{ currencyFormatter(coinCurrencyUsd.toString(), 'USD') }}</span>
      </div>
    </div>
  </div>
</template>

import { describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import CardCoinItem from '~/components/CardCoinItem.vue';

describe('CardCoinItem', () => {
  const wrapper = shallowMount(CardCoinItem, {
    propsData: {
      coinName: 'bitcoin',
      coinCurrencyBrl: 5.658745,
      coinCurrencyUsd: 1.225413,
    },
  });

  test('should component exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have the currency BRL format', () => {
    expect(wrapper.find('#brlCurrency').text()).toBe('R$ 5,658745');
  });

  test('should have the currency USD format', () => {
    expect(wrapper.find('#usdCurrency').text()).toBe('US$ 1,225413');
  });
});

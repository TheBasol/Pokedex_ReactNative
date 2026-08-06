import 'react-native-gesture-handler/jestSetup';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { PokedexApp } from '../src/PokemonApp';

jest.mock('react-native-image-colors', () => ({
  getColors: jest.fn().mockResolvedValue({
    platform: 'android',
    dominant: '#ffffff',
    average: '#ffffff',
    vibrant: '#ffffff',
  }),
}));

test('renders correctly', async () => {
  jest.useFakeTimers();
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<PokedexApp />);
  });
  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

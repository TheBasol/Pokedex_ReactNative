/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { PokedexApp } from './src/PokemonApp';

AppRegistry.registerComponent(appName, () => PokedexApp);

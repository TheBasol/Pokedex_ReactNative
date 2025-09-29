import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { PokemonScreen } from "../screens/pokemon/PokemonScreen";
import { SearchScreen } from "../screens/search/SearchScreen";

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemonId: number };
  SearchScreen: undefined;
};

const MyStack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <MyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyStack.Screen name="HomeScreen" component={HomeScreen} />
      <MyStack.Screen name="PokemonScreen" component={PokemonScreen} />
      <MyStack.Screen name="SearchScreen" component={SearchScreen} />
    </MyStack.Navigator>
  );
};
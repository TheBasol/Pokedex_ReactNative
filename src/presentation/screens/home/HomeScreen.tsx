import { StyleSheet, View, Dimensions } from "react-native"
import { Text } from "react-native-paper"
import { getPokemons } from "../../../actions/pokemons"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { PokeballBG } from "../../components/ui/PokeballBG"
import { FlatList } from "react-native-gesture-handler"
import { globalTheme } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PokemonCard } from "../../components/pokemons/PokemonCard"

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async ( params ) => {
      const pokemons = await getPokemons( params.pageParam );
      pokemons.forEach( pokemon => {
        queryClient.setQueryData( ['pokemon', pokemon.id], pokemon );
      } )

      return pokemons;
    },
    select: ( data ) => data.pages.flat(),
    getNextPageParam: ( lastPage, allPages ) => allPages.length,
  })

  const { width, height } = Dimensions.get('window');

  return (
    <View style={ globalTheme.globalMargin }>

      <PokeballBG style={[
        styles.imgPosition,
        {
          top: -height * 0.05,
          right: -width * 0.1
        }
      ]} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => (
          <Text variant="displayMedium" >
            Pokédex
          </Text>
        )}
        columnWrapperStyle={styles.row} // Alinea las tarjetas en filas
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={ () => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: { 
    position: 'absolute'
  },
  row: {
    justifyContent: 'space-around', // Distribuye las tarjetas uniformemente
  }
})
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Pokemon } from "../../../domain/entities/pokemon";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";
import { Formatter } from "../../../config/helpers/formatter";
import { PokemonTypeBadge } from "./PokemonTypeBadge";
import { isLightColor } from "../../../config/helpers/change-color";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;
  const textColor = isLightColor(pokemon.color) ? "#1E293B" : "#FFFFFF";

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() =>
        navigation.navigate("PokemonScreen", { pokemonId: pokemon.id })
      }
    >
      <View style={[styles.cardContainer, { backgroundColor: pokemon.color }]}>
        {/* Informacion del lado izquierdo */}
        <View style={styles.infoContainer}>
          <Text
            style={[styles.name, { color: textColor }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {Formatter.capitalize(pokemon.name)}
          </Text>
          <Text style={[styles.idText, { color: textColor }]}>
            {formattedId}
          </Text>

          {/* Badges de tipo alineados abajo */}
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <PokemonTypeBadge key={type} type={type} size="small" />
            ))}
          </View>
        </View>

        {/* Pokeball de fondo en la esquina inferior derecha */}
        <View style={styles.pokeballContainer}>
          <Image
            source={require("../../../assets/pokeball-light.png")}
            style={styles.pokeball}
          />
        </View>

        {/* Sprite del Pokemon */}
        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 6,
    height: 120,
    flex: 0.5,
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
    overflow: "hidden",
    position: "relative",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
    maxWidth: "65%",
    zIndex: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  idText: {
    fontSize: 12,
    fontWeight: "700",
    opacity: 0.8,
    marginTop: 2,
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    marginTop: "auto",
  },
  pokeballContainer: {
    position: "absolute",
    right: -15,
    bottom: -15,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pokeball: {
    width: 100,
    height: 100,
    opacity: 0.25,
  },
  pokemonImage: {
    width: 95,
    height: 95,
    position: "absolute",
    right: -2,
    bottom: -2,
    zIndex: 5,
  },
});
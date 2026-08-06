import React, { useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chip, Text } from 'react-native-paper';

import { RootStackParams } from '../../navigator/StackNavigator';
import { getPokemonById } from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { Formatter } from '../../../config/helpers/formatter';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { ThemeContext } from '../../context/ThemeContext';
import { PokemonTypeBadge } from '../../components/pokemons/PokemonTypeBadge';
import { PokemonStatBar } from '../../components/pokemons/PokemonStatBar';
import { isLightColor } from '../../../config/helpers/change-color';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

type ActiveTab = 'stats' | 'sprites' | 'moves' | 'info';

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const { pokemonId } = route.params;

  const [activeTab, setActiveTab] = useState<ActiveTab>('stats');

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');

  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60,
  });

  if (!pokemon) {
    return <FullScreenLoader />;
  }

  const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
  const totalStats = pokemon.stats.reduce((acc, stat) => acc + stat.value, 0);

  const headerTextColor = isLightColor(pokemon.color) ? '#1E293B' : '#FFFFFF';

  const sheetBgColor = isDark ? '#1E1E2E' : '#FFFFFF';
  const cardBgColor = isDark ? '#2A2A3C' : '#F8FAFC';
  const textColor = isDark ? '#F1F5F9' : '#0F172A';
  const subTextColor = isDark ? '#94A3B8' : '#64748B';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <View style={styles.tabContent}>
            <View style={styles.statsHeader}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Estadísticas Base</Text>
              <View style={[styles.totalBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }]}>
                <Text style={[styles.totalText, { color: subTextColor }]}>
                  Total: <Text style={{ fontWeight: '800', color: textColor }}>{totalStats}</Text>
                </Text>
              </View>
            </View>

            {pokemon.stats.map(stat => (
              <PokemonStatBar
                key={stat.name}
                name={stat.name}
                value={stat.value}
                isDark={isDark}
              />
            ))}
          </View>
        );

      case 'sprites':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: textColor, marginBottom: 14 }]}>
              Galería de Sprites ({pokemon.sprites.length})
            </Text>
            <View style={styles.spritesGrid}>
              {pokemon.sprites.map((spriteUri, index) => {
                const isShiny = spriteUri.includes('shiny');
                const isOfficial = spriteUri.includes('official-artwork');
                const isShowdown = spriteUri.includes('showdown');

                let label = `Forma ${index + 1}`;
                if (isOfficial) label = 'Arte Oficial';
                else if (isShowdown) label = isShiny ? 'Animado Shiny' : 'Animado';
                else if (isShiny) label = 'Shiny';
                else if (index === 0) label = 'Frontal';
                else if (index === 1) label = 'Posterior';

                return (
                  <View
                    key={spriteUri + index}
                    style={[styles.spriteCard, { backgroundColor: cardBgColor }]}
                  >
                    <FadeInImage uri={spriteUri} style={styles.spriteItemImage} />
                    <Text style={[styles.spriteLabel, { color: subTextColor }]}>{label}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );

      case 'moves':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: textColor, marginBottom: 14 }]}>
              Movimientos ({pokemon.moves.length})
            </Text>
            <View style={styles.movesGrid}>
              {pokemon.moves.map(move => (
                <View
                  key={move.name}
                  style={[styles.moveCard, { backgroundColor: cardBgColor }]}
                >
                  <Text style={[styles.moveName, { color: textColor }]}>
                    {Formatter.capitalize(move.name)}
                  </Text>
                  <View style={[styles.levelBadge, { backgroundColor: pokemon.color }]}>
                    <Text style={styles.levelText}>
                      {move.level > 0 ? `Niv. ${move.level}` : 'MT / Oculto'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case 'info':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: textColor, marginBottom: 10 }]}>
              Habilidades
            </Text>
            <View style={styles.chipRow}>
              {pokemon.abilities.map(ability => (
                <Chip
                  key={ability}
                  style={[styles.infoChip, { backgroundColor: cardBgColor }]}
                  textStyle={{ color: textColor, fontWeight: '600' }}
                >
                  {Formatter.capitalize(ability)}
                </Chip>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24, marginBottom: 10 }]}>
              Aparición en Juegos ({pokemon.games.length})
            </Text>
            <View style={styles.chipRow}>
              {pokemon.games.map(game => (
                <Chip
                  key={game}
                  style={[styles.infoChip, { backgroundColor: cardBgColor }]}
                  textStyle={{ color: subTextColor, fontSize: 12 }}
                >
                  {Formatter.capitalize(game)}
                </Chip>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: pokemon.color }}>
      <View style={[styles.backButtonContainer, { top: top + 10 }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerHero}>
          <Image source={pokeballImg} style={styles.pokeballBg} />

          <View style={[styles.titleRow, { marginTop: top + 55 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.pokemonName, { color: headerTextColor }]}>
                {Formatter.capitalize(pokemon.name)}
              </Text>
              <View style={styles.typesRow}>
                {pokemon.types.map(type => (
                  <PokemonTypeBadge key={type} type={type} size="medium" />
                ))}
              </View>
            </View>
            <Text style={[styles.pokemonId, { color: headerTextColor }]}>
              {formattedId}
            </Text>
          </View>

          <View style={styles.pokemonImageContainer}>
            <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
          </View>
        </View>

        <View style={[styles.sheetContainer, { backgroundColor: sheetBgColor }]}>
          <View style={[styles.tabBar, { backgroundColor: cardBgColor }]}>
            <Pressable
              style={[
                styles.tabItem,
                activeTab === 'stats' && { backgroundColor: pokemon.color },
              ]}
              onPress={() => setActiveTab('stats')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'stats' ? '#FFFFFF' : subTextColor },
                ]}
              >
                Stats
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabItem,
                activeTab === 'sprites' && { backgroundColor: pokemon.color },
              ]}
              onPress={() => setActiveTab('sprites')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'sprites' ? '#FFFFFF' : subTextColor },
                ]}
              >
                Sprites
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabItem,
                activeTab === 'moves' && { backgroundColor: pokemon.color },
              ]}
              onPress={() => setActiveTab('moves')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'moves' ? '#FFFFFF' : subTextColor },
                ]}
              >
                Ataques
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabItem,
                activeTab === 'info' && { backgroundColor: pokemon.color },
              ]}
              onPress={() => setActiveTab('info')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'info' ? '#FFFFFF' : subTextColor },
                ]}
              >
                Info
              </Text>
            </Pressable>
          </View>

          {renderTabContent()}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 999,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerHero: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    position: 'relative',
    minHeight: 330,
  },
  pokeballBg: {
    width: 250,
    height: 250,
    position: 'absolute',
    right: -30,
    bottom: 10,
    opacity: 0.2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pokemonName: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  pokemonId: {
    fontSize: 22,
    fontWeight: '800',
    opacity: 0.85,
    marginTop: 6,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  pokemonImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: -50,
    zIndex: 10,
  },
  pokemonImage: {
    width: 230,
    height: 230,
  },
  sheetContainer: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 55,
    minHeight: 450,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  tabContent: {
    marginTop: 5,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  totalBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  totalText: {
    fontSize: 13,
  },
  spritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  spriteCard: {
    width: (width - 56) / 2,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  spriteItemImage: {
    width: 90,
    height: 90,
  },
  spriteLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  movesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moveCard: {
    width: (width - 56) / 2,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moveName: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    marginRight: 6,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoChip: {
    marginBottom: 6,
    borderRadius: 12,
  },
});
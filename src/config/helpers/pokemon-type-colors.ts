export interface TypeColorInfo {
  bg: string;
  text: string;
}

export const POKEMON_TYPE_COLORS: Record<string, TypeColorInfo> = {
  normal:   { bg: '#A8A878', text: '#FFFFFF' },
  fire:     { bg: '#F08030', text: '#FFFFFF' },
  water:    { bg: '#6890F0', text: '#FFFFFF' },
  grass:    { bg: '#78C850', text: '#FFFFFF' },
  electric: { bg: '#F8D030', text: '#212121' },
  ice:      { bg: '#98D8D8', text: '#212121' },
  fighting: { bg: '#C03028', text: '#FFFFFF' },
  poison:   { bg: '#A040A0', text: '#FFFFFF' },
  ground:   { bg: '#E0C068', text: '#212121' },
  flying:   { bg: '#A890F0', text: '#FFFFFF' },
  psychic:  { bg: '#F85888', text: '#FFFFFF' },
  bug:      { bg: '#A8B820', text: '#FFFFFF' },
  rock:     { bg: '#B8A038', text: '#FFFFFF' },
  ghost:    { bg: '#705898', text: '#FFFFFF' },
  dragon:   { bg: '#7038F8', text: '#FFFFFF' },
  steel:    { bg: '#B8B8D0', text: '#212121' },
  fairy:    { bg: '#EE99AC', text: '#FFFFFF' },
  dark:     { bg: '#705848', text: '#FFFFFF' },
};

export const getTypeColor = (type: string): TypeColorInfo => {
  const normalizedType = type.toLowerCase().trim();
  return POKEMON_TYPE_COLORS[normalizedType] || { bg: 'rgba(255,255,255,0.25)', text: '#FFFFFF' };
};

export interface StatInfo {
  label: string;
  color: string;
  max: number;
}

export const POKEMON_STAT_INFO: Record<string, StatInfo> = {
  hp:                { label: 'HP',       color: '#FF5959', max: 255 },
  attack:            { label: 'ATK',      color: '#F5AC78', max: 190 },
  defense:           { label: 'DEF',      color: '#FAE078', max: 230 },
  'special-attack':  { label: 'SP. ATK',  color: '#9DB7F5', max: 194 },
  'special-defense': { label: 'SP. DEF',  color: '#A7DB8D', max: 230 },
  speed:             { label: 'SPD',      color: '#FA92B2', max: 180 },
};

export const getStatInfo = (statName: string): StatInfo => {
  const normalized = statName.toLowerCase().trim();
  return POKEMON_STAT_INFO[normalized] || {
    label: statName.toUpperCase(),
    color: '#8B949E',
    max: 200,
  };
};

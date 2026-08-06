import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTypeColor } from '../../../config/helpers/pokemon-type-colors';
import { Formatter } from '../../../config/helpers/formatter';

interface Props {
  type: string;
  size?: 'small' | 'medium';
}

export const PokemonTypeBadge = ({ type, size = 'medium' }: Props) => {
  const typeInfo = getTypeColor(type);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: typeInfo.bg },
        size === 'small' ? styles.smallBadge : styles.mediumBadge,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: typeInfo.text },
          size === 'small' ? styles.smallText : styles.mediumText,
        ]}
      >
        {Formatter.capitalize(type)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginRight: 8,
  },
  mediumBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  smallBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  mediumText: {
    fontSize: 14,
  },
  smallText: {
    fontSize: 12,
  },
});

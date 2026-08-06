import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatInfo } from '../../../config/helpers/pokemon-type-colors';

interface Props {
  name: string;
  value: number;
  isDark?: boolean;
}

export const PokemonStatBar = ({ name, value, isDark = false }: Props) => {
  const statInfo = getStatInfo(name);
  const percentage = Math.min(100, Math.round((value / statInfo.max) * 100));

  const textColor = isDark ? '#E2E8F0' : '#334155';
  const labelColor = isDark ? '#94A3B8' : '#64748B';
  const trackBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }]}>{statInfo.label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>

      <View style={[styles.track, { backgroundColor: trackBg }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: statInfo.color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    width: 65,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  value: {
    width: 35,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    marginRight: 12,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});

import { BebasNeue_400Regular, useFonts } from '@expo-google-fonts/bebas-neue';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function generateColorPair(): { text: string; background: string } {
  const h = Math.random() * 360;
  const textS = 90 + Math.random() * 10;
  const textL = 55 + Math.random() * 10;
  const bgH = (h + 150) % 360;
  const bgS = 80 + Math.random() * 10;
  const bgL = 18 + Math.random() * 10;
  return {
    text: hslToHex(h, textS, textL),
    background: hslToHex(bgH, bgS, bgL),
  };
}

export default function App() {
  const [fontsLoaded] = useFonts({ BebasNeue_400Regular });
  const [colors, setColors] = useState(generateColorPair());

  useEffect(() => {
    const interval = setInterval(() => {
      setColors(generateColorPair());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Cody Sucks
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'BebasNeue_400Regular',
    fontSize: 72,
    letterSpacing: 6,
  },
});

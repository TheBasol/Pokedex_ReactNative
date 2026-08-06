import ImageColors from "react-native-image-colors";
import { darkenColor, isLightColor } from "./change-color";

export const getColorFromImage = async (image: string): Promise<string> => {
  const fallbackColor = '#505050';

  try {
    if (!ImageColors || typeof ImageColors.getColors !== 'function') {
      return fallbackColor;
    }

    const colors = await ImageColors.getColors(image, {
      fallback: fallbackColor,
    });

    let color: string = fallbackColor;

    switch (colors?.platform) {
      case 'android':
        color = colors.dominant ?? fallbackColor;
        break;
      case 'ios':
        color = colors.background ?? fallbackColor;
        break;
      default:
        color = fallbackColor;
    }

    if (color && isLightColor(color)) {
      color = darkenColor(color, 0.2);
    }

    return color || fallbackColor;
  } catch (error) {
    return fallbackColor;
  }
};

import ImageColors from "react-native-image-colors";
import { darkenColor, isLightColor } from "./change-color";

export const getColorFromImage = async(image: string) => {

    const fallbackColor = 'grey';

  const colors = await ImageColors.getColors(image, {
    fallback: fallbackColor,
  });

  let color: string = '';

  switch (colors.platform) {
    case 'android':
      color = colors.dominant ?? fallbackColor;
      break
    case 'ios':
      color = colors.background ?? fallbackColor;
      break
    default:
      color = fallbackColor;
  }

    if (isLightColor(color)) {
    color = darkenColor(color, 0.2); // 0.2 = 20% más oscuro
  }

  return color;

};

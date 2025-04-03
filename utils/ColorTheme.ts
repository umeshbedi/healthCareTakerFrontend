import { DefaultTheme, DarkTheme } from "@react-navigation/native"

const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#2e4f46',
      background: '#393939',
      text: 'white',
      card: "#5e5e5e",
      notification:"#b98e61"
    },
  }


  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2e4f46',
      background: '#fafafa',
      text: 'rgb(74,74,74)',
      card: "white",
      notification:"#b98e61"
    },
  }

export const colorTheme = {
    dark: MyDarkTheme,
    light: MyLightTheme
}

export const customColors = {
  lightGreen : "#779677",
  lightOrange:"#d0b244"
}
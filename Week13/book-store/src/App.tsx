import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { ThemeName, dark, light, getTheme } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useState } from "react";

function App() {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  return (
    <ThemeProvider theme = {getTheme(themeName)}>
      <GlobalStyle themeName={themeName} />
      <ThemeSwitcher themeName={themeName} setThemeName = {setThemeName} />
        <Layout>
          <Home/>
      </Layout>
    </ThemeProvider>
    
  )
  
}

export default App;

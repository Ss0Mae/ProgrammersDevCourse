import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { ThemeName, dark, light, getTheme } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";

function App() {
  return (
    <BookStoreThemeProvider>
        <ThemeSwitcher />
          <Layout>
            <Home/>
        </Layout>
    </BookStoreThemeProvider>
  )
  
}

export default App;

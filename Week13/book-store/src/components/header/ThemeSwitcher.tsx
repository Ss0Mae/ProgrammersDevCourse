import { ThemeName } from "../../style/theme";

interface Props{
    themeName: ThemeName;
    setThemeName: (themeName: ThemeName) => void;
}
function ThemeSwitcher({ themeName, setThemeName }: Props) {
    const toggleTheme = () => {
        setThemeName(themeName === "light" ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme}>{themeName}</button>
    )
}

export default ThemeSwitcher;
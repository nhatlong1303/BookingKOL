import { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createTheme, } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
    themeMode: ThemeMode
    toggleTheme: () => void
}
interface Props {
    children: any
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)
const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: Props) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        const mode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(mode);
    }

    const themeMui = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#FF9767'
            },
            common: {
                Brand: {
                    Orange: '#FF9767',
                    Teal: '#87DBDD',
                    Yellow: '#FFE180',
                    OffWhite: '#FAFAFA',
                },
                Gradient: {
                    Aurora: 'linear-gradient(225deg, #87DBDD 0%, #FF9767 50%, #FFE180 100%)',
                    Sunshine: 'linear-gradient(225deg, #87DBDD 0%, #FFE180 100%)',
                    Sunset: 'linear-gradient(225deg, #FF9767 0%, #FFE180 100%)',
                },
                Ink: {
                    Dark: '#073763',
                    Gray: '#A2AEB3',
                    Cement: '#C8CFD2',
                },
                Neutral: {
                    Smoke: '#F3F4F5',
                    White: '#FFFFFF',
                    Mask: '#010B13',
                },
                Denotative: {
                    Error: '#F56C6C',
                    Success: '#5FD993',
                    Warning: '#FFD85C',
                    Infor: '#4067E5',
                },

            }
        },
    });

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <MuiThemeProvider theme={themeMui}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export {
    useThemeContext,
    ThemeProvider
}
import { createTheme, PaletteColorOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
    interface Palette {
        color: PaletteColorOptions;
    }
    interface PaletteOptions {
        color: PaletteColorOptions;
    }
}
const { palette } = createTheme();
const themeMui = createTheme({
    palette: {
        color: palette.augmentColor({
            color: {
                main: "#00ff00"
            }
        }),
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});
export default themeMui;
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#d66d7f", 
        },
        secondary: {
            main: "#f5cccc", 
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#000000",
            secondary: "#333333",
        },
    },
    typography: {
        fontFamily: "Tektur, Helvetica, Arial, sans-serif",
        button: {
            textTransform: "none",
            fontWeight: "bold",
            fontFamily: "Tektur, sans-serif", // Added button fontFamily override
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Tektur, sans-serif", // Added button fontFamily override
                    color: "black", 
                    backgroundColor: "#f5cccc",
                    "&:hover": {
                        backgroundColor: "#e2bcbc",
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#f5f5f5",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                body2: {
                    marginLeft: "8px",
                    color: "#333",
                },
            },
        },
    },
});

export default theme;

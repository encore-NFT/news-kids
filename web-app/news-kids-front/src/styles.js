import { createTheme } from "@material-ui/core";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing:border-box;
    }
    body{
        font-size: 15px;
        font-family:'Open Sans', sans-serif;
        background-color: #f9f9f9;
        color: #333333;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`;

export const theme = createTheme({
    palette: {
        primary: {
            light: '#ffcd38',
            main: '#ffc107',
            dark: '#b28704',
            contrastText: '#333',
        },
        secondary: {
            light: '#ffd433',
            main: '#ffca00',
            dark: '#b28d00',
            contrastText: '#666',
        },
    },
});
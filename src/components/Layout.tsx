import {AppBar, Box, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {Container} from "@mui/system";
import React, {useState} from "react";
import {useAppTheme} from "../hooks/useAppTheme";
import App from "../App";
import {Header} from "./Header";
import {ResponsiveDrawer} from "./ResponsiveDrawer";
import {Route, Routes} from "react-router-dom";
import {CategoryList} from "../features/categories/ListCategory";
import {CategoryCreate} from "../features/categories/CreateCategory";
import {CategoryEdit} from "../features/categories/EditCategory";
import {ListCastmembers} from "../features/cast/ListCastmembers";
import {CreateCastMember} from "../features/cast/CreateCastMember";
import {EditCastMember} from "../features/cast/EditCastMember";
import {GenreList} from "../features/genre/GenreList";
import {GenreCreate} from "../features/genre/GenreCreate";
import {GenreEdit} from "../features/genre/GenreEdit";
import {VideosList} from "../features/videos/VideosList";
import {VideosCreate} from "../features/videos/VideosCreate";
import {VideosEdit} from "../features/videos/VideosEdit";
import {SnackbarProvider} from "notistack";


const drawerWidth = 240;

export function Layout({children}: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentThema, toggleCurrentThema] = useAppTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }


    return (
        <ThemeProvider theme={currentThema}>
            <CssBaseline/>
            <Box sx={{display: "flex"}}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        ml: {sm: `${drawerWidth}px`},
                    }}
                >
                    <Header
                        handleDrawerToggle={handleDrawerToggle}
                        toggle={toggleCurrentThema}
                        theme={currentThema.palette.mode === "dark" ? "dark" : "light"}
                    />
                </AppBar>

                <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle}/>

                <SnackbarProvider
                    autoHideDuration={2000}
                    maxSnack={3}
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                >
                    <Container maxWidth="lg" sx={{color:"white", my: 12}}>
                        {children}
                    </Container>
                </SnackbarProvider>
            </Box>
        </ThemeProvider>
    );
}
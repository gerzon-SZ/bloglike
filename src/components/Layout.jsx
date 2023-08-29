import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import * as React from 'react';
import SideNav from './SideNav';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
const Layout = () => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ width:"100vw" }}>
                <ResponsiveAppBar />
            </Container>
            <Container sx={{ height:"100vh" }}>
                <main className="App">
                    <Outlet />
                </main>
            </Container>
        </>
    )
}

export default Layout
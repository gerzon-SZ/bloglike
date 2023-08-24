import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';

const Layout = () => {
    return (
        <>
            <ResponsiveAppBar />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout
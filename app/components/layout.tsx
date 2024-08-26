import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-grow mx-auto p-6 bg-white">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;

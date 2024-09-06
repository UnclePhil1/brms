import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-grow mx-auto p-6 bg-white">
                {children}
            </main>
        </div>
    );
};

export default Layout;

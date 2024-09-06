import React from 'react';
import Layout from './layout';
import RoleBasedPage from './components/Render';
import Navbar from './components/navbar';

export default function Home() {

  return (
    <Layout>
      <Navbar />
      <RoleBasedPage />
    </Layout>
  );
}

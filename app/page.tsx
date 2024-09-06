import React from 'react';
import Layout from './layout';
import RoleBasedPage from './components/Render';

export default function Home() {

  return (
    <Layout>
      <RoleBasedPage />
    </Layout>
  );
}

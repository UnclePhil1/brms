import React from 'react';
import Layout from './layout';
import RoleBasedPage from './components/Render';

export default function Home() {

  return (
    <Layout>
      <RoleBasedPage />
      <h1 className='text-black'>Hello Deve</h1>
    </Layout>
  );
}

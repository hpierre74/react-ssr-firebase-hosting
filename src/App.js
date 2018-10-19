import React from 'react';
import Home from './modules/home/home.connector';
import Contact from './modules/contact/contact.connector';
import Layout from './components/layout.component';

const App = () => (
  <Layout>
    <Home />
    <Contact />
  </Layout>
);

export default App;

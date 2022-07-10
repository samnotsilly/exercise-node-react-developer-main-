import React from 'react';
// import logo from './logo.svg';
// import BasicTable from './views/BasicTable';
import RepoTable from './views/RepoTable';
import data from './data.json';

import './App.css';

export function App() {
  return (
    <div className="App">
      <RepoTable data={data} />
    </div>
  );
}

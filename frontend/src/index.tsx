import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Routes } from 'react-router-dom';
import AddIce from './AddIce';
import IceList from './IceList';
import './skeleton.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/addIce" element={<AddIce />} />
        <Route path="/" element={<IceList />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('game')
);

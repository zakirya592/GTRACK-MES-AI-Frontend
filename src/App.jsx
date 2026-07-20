import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import PageRouter from './routes/PageRouter';

function App() {

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <PageRouter/>
    </div>
  );
}

export default App

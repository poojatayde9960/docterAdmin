import React, { useState } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import AppRoutes from './doctor/routes/AppRoutes'

const App = () => {

  return <>
    <HashRouter>
      <AppRoutes />
    </HashRouter>

  </>
}

export default App
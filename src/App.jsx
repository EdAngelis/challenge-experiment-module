import { AppProvider } from './context'

import Home from './pages/home'
import './App.css'

function App () {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  )
}

export default App

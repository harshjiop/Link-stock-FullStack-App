import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Home } from './pages'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Home/>
    </>
  )
}

export default App

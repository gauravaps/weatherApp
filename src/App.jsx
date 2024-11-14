import React from 'react'
import Weather from './components/Weather'
import TimeAndAndLocation from './components/TimeAndAndLocation'

const App = () => {
  return (
    <div className='app-container'>
      <TimeAndAndLocation/>
      <Weather/>
      
    </div>
  )
}

export default App
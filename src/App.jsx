import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
      return (
            <div>
                  <p>You clicked {count} times</p>
                  <button style={{gap: "10px"}} onClick={() => setCount(count + 1)}>+</button>
                  <button onClick={() => setCount(count - 1)}>-</button>
            </div>
      ); 
}

export default App

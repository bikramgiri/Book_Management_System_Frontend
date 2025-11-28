import React, { useEffect } from 'react'

function App() {
      // *1. Empty Dependency Array(Mostly used): Runs only once after the initial render
      useEffect(() => {
            console.log("Component Mounted");
      }, []);

      // *2. With Dependency Array: Runs after the initial render and whenever any dependency changes
      // const [count, setCount] = React.useState(0);
      useEffect(() => {
            console.log("Count changed:", count);
      }, [count]);

      // *3. No Dependency Array: Runs after every render
      const [count, setCount] = React.useState(0);
      useEffect(() => {
            console.log("Component Rendered");
      });

      return (
            <>
            // *1. Example for Empty Dependency Array
            <div>
                  <h1>Hello World!</h1>
            </div>

            // *2. Example for Dependency Array
            <div>
                  <h1>Count: {count}</h1>
                  <button onClick={() => setCount(count + 1)}>+</button>
                  <button onClick={() => setCount(count - 1)}>-</button>
            </div>

            // *3. Example for No Dependency Array
            <div>
                 <h1>Count: {count}</h1>
                 <button onClick={() => setCount(count + 1)}>+</button> <br />
                 <button onClick={() => setCount(count - 1)}>-</button> <br />
                  <button onClick={() => console.log("Button Clicked")}>Click Me</button>
            </div>
            </>
      ); 
}

export default App

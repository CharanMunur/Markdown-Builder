import React, { useState } from "react";
import { Button } from "./components/ui/button";
import ModeToggle from "./components/mode-toggle";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <ModeToggle />
      <p>{count}</p>
      <Button variant="default" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );
};

export default App;

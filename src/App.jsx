import React, { useState } from "react";
import TopBar from "./components/header/topBar";
import EditorPane from "./components/editor/EditorPane";
import PreviewPane from "./components/preview/PreviewPane";
import { Separator } from "./components/ui/separator";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar />
      <Separator />
      <div className="flex flex-1 min-h-0">
        <EditorPane value={value} onChange={setValue} />
        <PreviewPane value={value} />
      </div>
    </div>
  );
};

export default App;

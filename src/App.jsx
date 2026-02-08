import React, { useState } from "react";
import TopBar from "./components/header/topBar";
import EditorPane from "./components/editor/EditorPane";
import PreviewPane from "./components/preview/PreviewPane";
import { Separator } from "./components/ui/separator";
import defaultMarkdown from "./assets/markdown.md?raw";

const App = () => {
  const [value, setValue] = useState(defaultMarkdown);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar value={value}  onReset={() => setValue(defaultMarkdown)}/>
      <Separator />
      <div className="flex flex-1 min-h-0">
        <EditorPane value={value} onChange={setValue} />
        <PreviewPane value={value} />
      </div>
    </div>
  );
};

export default App;

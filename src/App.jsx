import React, { useRef, useState } from "react";
import TopBar from "./components/header/topBar";
import EditorPane from "./components/editor/EditorPane";
import PreviewPane from "./components/preview/PreviewPane";
import { Separator } from "./components/ui/separator";
import defaultMarkdown from "./assets/markdown.md?raw";

const App = () => {
  const [value, setValue] = useState(defaultMarkdown);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const previewRef = useRef(null); // article content
  const previewViewportRef = useRef(null); // scroll container

  const handleEditorSync = (ratio) => {
    if (!syncEnabled) return;
    const el = previewViewportRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    const target = (ratio || 0) * max;
    requestAnimationFrame(() => {
      el.scrollTop = target;
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar
        value={value}
        onReset={() => setValue(defaultMarkdown)}
        previewRef={previewRef}
        syncEnabled={syncEnabled}
        onToggleSync={setSyncEnabled}
      />
      <Separator />
      <div className="flex flex-1 min-h-0">
        <EditorPane
          value={value}
          onChange={setValue}
          syncEnabled={syncEnabled}
          onSyncScroll={handleEditorSync}
        />
        <PreviewPane
          value={value}
          previewRef={previewRef}
          viewportRef={previewViewportRef}
        />
      </div>
    </div>
  );
};

export default App;

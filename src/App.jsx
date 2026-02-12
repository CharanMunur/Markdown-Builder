import React, { useCallback, useEffect, useRef, useState } from "react";
import TopBar from "./components/header/TopBar";
import EditorPane from "./components/editor/EditorPane";
import PreviewPane from "./components/preview/PreviewPane";
import { Separator } from "./components/ui/separator";
import defaultMarkdown from "./assets/markdown.md?raw";

const App = () => {
  const MIN_EDITOR_WIDTH = 20;
  const MAX_EDITOR_WIDTH = 80;
  const [value, setValue] = useState(defaultMarkdown);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [editorWidth, setEditorWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const splitContainerRef = useRef(null);
  const previewRef = useRef(null); // article content
  const previewViewportRef = useRef(null); // scroll container

  const clampEditorWidth = useCallback((nextWidth) => {
    return Math.max(MIN_EDITOR_WIDTH, Math.min(MAX_EDITOR_WIDTH, nextWidth));
  }, []);

  const updateWidthFromPointer = useCallback(
    (clientX) => {
      const container = splitContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.width <= 0) return;

      const nextPercent = ((clientX - rect.left) / rect.width) * 100;
      setEditorWidth(clampEditorWidth(nextPercent));
    },
    [clampEditorWidth]
  );

  const handleResizeStart = useCallback(
    (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      setIsResizing(true);
      updateWidthFromPointer(event.clientX);
    },
    [updateWidthFromPointer]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event) => {
      updateWidthFromPointer(event.clientX);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
    };

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
    };
  }, [isResizing, updateWidthFromPointer]);

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
      <div
        ref={splitContainerRef}
        className={`flex flex-1 min-h-0 ${isResizing ? "select-none" : ""}`}
      >
        <div
          className="h-full min-w-0 shrink-0"
          style={{ width: `${editorWidth}%` }}
        >
          <EditorPane
            value={value}
            onChange={setValue}
            syncEnabled={syncEnabled}
            onSyncScroll={handleEditorSync}
          />
        </div>
        <div
          role="separator"
          aria-label="Resize panes"
          aria-orientation="vertical"
          onPointerDown={handleResizeStart}
          className="group relative shrink-0 cursor-col-resize touch-none bg-background"
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
          <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-primary/30 opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100" />
        </div>
        <div className="h-full min-w-0 flex-1">
          <PreviewPane
            value={value}
            previewRef={previewRef}
            viewportRef={previewViewportRef}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

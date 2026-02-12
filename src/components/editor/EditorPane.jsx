import React, { useCallback, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "@/providers/theme/theme-provider";

const EditorPane = ({ value, onChange, syncEnabled, onSyncScroll }) => {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const syncEnabledRef = useRef(syncEnabled);
  const syncCallbackRef = useRef(onSyncScroll);

  useEffect(() => {
    syncEnabledRef.current = syncEnabled;
  }, [syncEnabled]);

  useEffect(() => {
    syncCallbackRef.current = onSyncScroll;
  }, [onSyncScroll]);

  const handleChange = (val) => onChange(val ?? "");
  const handleBeforeMount = useCallback((monaco) => {
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#141414",
      },
    });
  }, []);

  const handleEditorDidMount = useCallback(
    (editor) => {
      editorRef.current = editor;
      editor.onDidScrollChange(() => {
        if (!syncEnabledRef.current) return;
        const h = editor.getScrollHeight();
        const viewport = editor.getLayoutInfo().height;
        const max = Math.max(h - viewport, 0);
        const ratio = max > 0 ? editor.getScrollTop() / max : 0;
        syncCallbackRef.current?.(ratio, "editor");
      });
    },
    []
  );

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="markdown"
        value={value}
        onChange={handleChange}
        beforeMount={handleBeforeMount}
        onMount={handleEditorDidMount}
        theme={theme === "dark" ? "custom-dark" : "light"}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default EditorPane;

import React, { useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "@/providers/theme/theme-provider";

const EditorPane = ({ value, onChange }) => {
  const { theme } = useTheme();
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

  return (
    <div className="w-1/2 h-full">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="markdown"
        value={value}
        onChange={handleChange}
        beforeMount={handleBeforeMount}
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

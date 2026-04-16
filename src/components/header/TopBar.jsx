import React, { useState } from "react";
import ModeToggle from "../mode-toggle";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Check, Copy, Download, RotateCcwIcon } from "lucide-react";
import { FieldLabel } from "../ui/field";
import handleExport from "../export/HandleExport";
import { ImGithub } from "react-icons/im";

const TopBar = ({ value, onReset, previewRef, syncEnabled, onToggleSync }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = value ?? "";
    if (!text) return;

    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1200);
        return;
      } catch {}
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between border border-border bg-card/80 px-4 py-2 text-foreground backdrop-blur select-none">
      <div className="flex items-center gap-3">
        <div className="flex  items-center gap-3 text-2xl font-semibold tracking-wide select-none">
          &lt;Markdown Editor/&gt;
          <a
            href="https://github.com/CharanMunur/Markdown-Editor"
            target="_black"
            rel="Github source code"
          >
            <ImGithub />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcwIcon />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!value}
          >
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport(previewRef)}
          >
            <Download />
            Export
          </Button>
        </div>
        <div className="mx-1 h-6 w-px bg-border" />
        <div className="flex items-center gap-3">
          <FieldLabel htmlFor="switch-size-sm" className="text-sm">
            Sync Scroll
          </FieldLabel>
          <Switch
            id="switch-size-sm"
            checked={syncEnabled}
            onCheckedChange={onToggleSync}
          />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

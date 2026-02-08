import React from "react";
import ModeToggle from "../mode-toggle";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Clipboard, Download, RotateCcwIcon } from "lucide-react";
import { FieldLabel } from "../ui/field";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 border border-border bg-card/80 px-4 py-2 text-foreground shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-semibold tracking-wide">
          &lt;Markdown Builder/&gt;
        </div>
      </div>
      <div className="flex items-center gap-4 justify-self-center">
        <Button variant="outline" size="sm">
          <RotateCcwIcon />
          Reset
        </Button>
        <Button variant="outline" size="sm">
          <Clipboard />
          Copy
        </Button>
        <Button variant="outline" size="sm">
          <Download />
          Export PDF
        </Button>
      </div>
      <div className="flex items-center justify-self-end gap-3">
        <FieldLabel htmlFor="switch-size-sm" className="text-sm">Sync Scroll</FieldLabel>
        <Switch id="switch-size-sm"  />
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;

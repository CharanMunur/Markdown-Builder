import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "../ui/scroll-area";

const PreviewPane = ({
  value,
  previewRef,
  viewportRef,
}) => {
  return (
    <ScrollArea
      className="markdown-preview h-full w-full bg-card text-foreground"
      viewportRef={viewportRef}
    >
      <article className="markdown-body p-4 pb-4" ref={previewRef}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {value}
        </Markdown>
      </article>
    </ScrollArea>
  );
};

export default PreviewPane;

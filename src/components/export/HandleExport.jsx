import printJS from "print-js";
import "print-js/dist/print.css";

export default function handleExport(previewRef) {
  if (!previewRef.current) return;

  // Detect if we're in dark mode
  const isDarkMode = document.documentElement.classList.contains("dark");
  
  // Ensure the element has an ID for print-js
  const originalId = previewRef.current.id;
  if (!originalId) {
    previewRef.current.id = "markdown-preview-export";
  }

  // Use print-js to print the specific element
  // type: 'html' allows us to print a specific DOM element
  // targetStyles: ['*'] forces it to compute and inline ALL styles, ensuring theme colors (oklch) work
  printJS({
    printable: previewRef.current.id,
    type: "html",
    targetStyles: ["*"],
    documentTitle: "Markdown Export",
    style: `
      @media print {
        @page {
          margin: 15mm;  
          size: A4;
        }
        
        /* Ensure colors print correctly */
        * { 
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Apply theme-appropriate background */
        body {
          background-color: ${isDarkMode ? '#17181c' : '#ffffff'} !important;
        }

        /* Remove scrollbars - make content wrap instead */
        pre, code, .markdown-body pre {
          overflow: visible !important;
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }

        /* Ensure no content is cut off */
        * {
          overflow: visible !important;
        }
      }
    `
  });

  // Restore ID if we changed it
  if (!originalId) {
    previewRef.current.removeAttribute("id");
  }
}

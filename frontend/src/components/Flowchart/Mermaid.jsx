import React, { useEffect } from "react";
import mermaid from "mermaid";

const MermaidChart = ({ chartSyntax }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, [chartSyntax]);

  return (
    <div className="mermaid">
      {chartSyntax}
    </div>
  );
};

export default MermaidChart;

import React from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

function DiffViewer(props) {
  return (
    <>
      <p>DiffViewer</p>
      <ReactDiffViewer
        oldValue={props.currentResume}
        newValue={props.optimizedResume}
        splitView={props.splitView}
      />
    </>
  );
}

export default DiffViewer;

import React from "react";
import { useAppContext } from "../Context/Context";
import "./NoteList.css"

const NoteList = () => {
  const { token,
    setToken,
    notes,
    setNotes,
    selectedNote,
    setSelectedNote,} = useAppContext();

  const extractFirstTwoLinesAsHtml = (html) => {
    // Create a temporary DOM element to parse the HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Get all child nodes
    const childNodes = tempElement.childNodes;

    // Extract the first two visible lines' worth of content
    let lineCount = 0;
    let extractedHtml = "";
    for (let node of childNodes) {
      if (lineCount >= 2) break;

      // Check for text nodes or elements
      if (node.nodeType === Node.TEXT_NODE) {
        extractedHtml += node.textContent;
        lineCount++;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        extractedHtml += node.outerHTML;
        lineCount++;
      }
    }

    return extractedHtml;
  };

  return (
    <aside className="note-list">
      <ul>
        {notes.map((note) => (
          <li
            key={note.id} // Use a unique ID
            className={selectedNote?.id === note.id ? "selected" : ""}
            onClick={() => setSelectedNote(note)}
          >
            {/* Render extracted HTML */}
            <div
              className="note-preview"
              dangerouslySetInnerHTML={{ __html: extractFirstTwoLinesAsHtml(note.html) }}
            />
            <span className="timestamp">{note.updatedAt}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};



export default NoteList;

import React from "react";
import { useAppContext } from "../Context/Context";

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
      <h3>Notes</h3>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id} // Use a unique ID
            className={selectedNote?.id === note.id ? "active" : ""}
            onClick={() => setSelectedNote(note)}
          >
            {/* Render extracted HTML */}
            <div
              className="note-preview"
              dangerouslySetInnerHTML={{ __html: extractFirstTwoLinesAsHtml(note.html) }}
            />
            <span className="timestamp">{formatTimestamp(note.updatedAt)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const formatTimestamp = (epoch) => {
    const date = new Date(epoch); // Convert to Date object
    return date.toLocaleString(); // Format as local readable string
  };

export default NoteList;

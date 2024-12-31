import React, { useState, useEffect } from "react";
import { useAppContext } from "../Context/Context";
import "./NoteEditor.css";

const NoteEditor = () => {
  const { selectedNote } = useAppContext(); // Access the currently selected note
  const [editorContent, setEditorContent] = useState(""); // Editor content state

  // Update the editor content when the selected note changes
  useEffect(() => {
    if (selectedNote) {
      setEditorContent(selectedNote.contentHtml); // Populate with HTML content
    }
  }, [selectedNote]);

  const handleContentChange = (event) => {
    setEditorContent(event.target.value); // Update editor content as the user types
  };

  const saveContent = () => {
    // Logic to save the updated content to the backend
    console.log("Saving content:", editorContent);
    // Call API or update note in context
  };

  if (!selectedNote) {
    return <p className="no-selection">Please select a note to edit.</p>;
  }

  return (
    <div className="text-editor">
      <h2 className="editor-header">Editing: {selectedNote.title}</h2>
      <textarea
        value={editorContent}
        onChange={handleContentChange}
        className="editor-textarea"
      />
      <button onClick={saveContent} className="save-button">
        Save
      </button>
    </div>
  );
};

export default NoteEditor;

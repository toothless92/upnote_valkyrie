import React, { useState, useEffect } from "react";
import { useAppContext } from "../Context/Context";
import ReactQuill, {Quill} from "react-quill"; // React wrapper for Quill
import "react-quill/dist/quill.snow.css"; // Include Quill styling
import "./NoteEditor.css";
import { htmlEditButton } from 'quill-html-edit-button';


function addLineBreaks(html) {
  return html;
  // .replace(/<\/(p|div|h1|h2|h3|li|br)>/g, '\n') // Add line breaks after these tags
  // .replace(/<br\s*\/?>/g, '\n') // Specifically handle <br> tags
  // .replace(/\s*\n\s*/g, '\n') // Clean up extra spaces around newlines
  // .trim(); // Remove leading/trailing whitespace
}

const NoteEditor = () => {
  const { selectedNote } = useAppContext(); // Access the currently selected note
  const [editorContent, setEditorContent] = useState(""); // Editor content state

  // Update the editor content when the selected note changes
  useEffect(() => {
    if (selectedNote) {
      setEditorContent(selectedNote.html); // Populate with HTML content
    }
  }, [selectedNote]);

  const handleContentChange = (value) => {
    setEditorContent(value); // Update editor content as the user types
  };

  const saveContent = () => {
    // Logic to save the updated content to the backend
    console.log("Saving content:", editorContent);
    // Call API or update note in context
  };

  if (!selectedNote) {
    return <p className="no-selection">Please select a note to edit.</p>;
  }

  Quill.register('modules/htmlEditButton', htmlEditButton);

  return (
    <div className="note-space">
      <div className="note-editor">
        <h2 className="editor-header">Editing: {selectedNote.title}</h2>
        <ReactQuill
          value={editorContent}
          onChange={handleContentChange}
          theme="snow"
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ header: [1, 2, 3, false] }],
              ["link", "image"],
            ],
            htmlEditButton: {},
            
          }}
        />
        <button onClick={saveContent} className="save-button">
          Save
        </button>
      </div>
      <div className="note-viewer">
        <div className="note-info">Note ID: {selectedNote.id}</div>
        <div className="note-info">Created: {selectedNote.createdAt}</div>
        <div className="note-info">HTML: {selectedNote.html}</div>
        {/* <h2 className="editor-header">Editor Content (HTML):</h2>
        <div className="html-display">{addLineBreaks(editorContent)}</div> */}
      </div>
    </div>
  );
};

export default NoteEditor;

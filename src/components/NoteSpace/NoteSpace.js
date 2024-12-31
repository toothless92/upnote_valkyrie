// NoteSpace.js
import React, { useState, useEffect } from "react";
import "./NoteSpace.css";
import { fetchData } from "../../utils/api.js";
import { loginButton, logoutButton } from "../Login/logout.js";
import { useAppContext } from "../Context/Context.js";
import NoteList from "./NoteList.js";
import NoteEditor from "./NoteEditor.js";

const NoteViewer = () => {
  const { token, setToken, notes, setNotes, selectedNote, setSelectedNote } =
    useAppContext();
  // debugger;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch notes when the token is available
  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchData(token)
        .then((data) => {
          // debugger;

          const notesData = data.dataByNamespace.notes.flatMap(
            (noteNamespace) =>
              noteNamespace.values.map((noteValues) => {
                return {
                  id: noteValues[0], // Assuming index 0 is always the ID
                  html: noteValues[1], // Assuming index 1 is always the HTML
                  plainText: noteValues[2], // Assuming index 2 is always the plain text
                  contentHtml: noteValues[3] || "", // Safe access for optional contentHtml
                  contentText: noteValues[4] || "", // Safe access for optional contentText
                  updatedAt: noteValues[11], // Updated at index 11
                  createdAt: noteValues[12], // Created at index 12
                  syncedAt: noteValues[13], // Synced at index 13
                };
              })
          );

          debugger;
          setNotes(notesData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading)
    return (
      <div>
        <p>Loading notes...</p>
        {logoutButton()}
      </div>
    );
  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        {loginButton()}
      </div>
    );

  if (!token)
    return (
      <div>
        <p>Please log in to view your notes.</p>
        {loginButton()}
      </div>
    );
  // debugger;
  return (
    <div className="note-viewer">
      <header className="header">
        <h1>UpNote Valkarie</h1>
        {logoutButton()}
      </header>
      <aside className="sidebar">
        <NoteList />
      </aside>
      <NoteEditor />
    </div>
  );
};

export default NoteViewer;

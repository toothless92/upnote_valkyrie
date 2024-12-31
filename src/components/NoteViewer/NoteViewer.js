// NoteViewer.js
import React, { useState, useEffect } from "react";
import "./NoteViewer.css";
import { fetchData } from "../../utils/api.js";
import { loginButton, logoutButton } from "../Login/logout.js";
import { useAppContext } from "../Context/Context";
import NoteList from "./NoteList";
import NoteEditor from "./NoteEditor";

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

          const notesData = data.dataByNamespace.notes[0].values.map(
            (note) => ({
              id: note[0],
              html: note[1],
              plainText: note[2],
              contentHtml: note.html,
              contentText: note.text,
              updatedAt: note[11],
              createdAt: note[12],
              syncedAt: note[13],
            })
          );
          // debugger;
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
    <div className="layout">
      <header className="header">
        <h1>UpNote Valkarie</h1>
        {logoutButton()}
      </header>
      <aside className="sidebar">
        <NoteList />
      </aside>
      <main className="editor">
        <NoteEditor />
      </main>
    </div>
  );
};

export default NoteViewer;

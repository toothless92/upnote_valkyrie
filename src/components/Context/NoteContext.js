// src/context/NoteContext.js
import React, { createContext, useState, useContext } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Store the auth token
  const [notes, setNotes] = useState([]); // Store all notes
  const [selectedNote, setSelectedNote] = useState(null); // Store the currently selected note

  return (
    <NoteContext.Provider
      value={{ token, setToken, notes, setNotes, selectedNote, setSelectedNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

// Custom hook for consuming the context
export const useNoteContext = () => useContext(NoteContext);

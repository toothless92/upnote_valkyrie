import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // React wrapper for Quill
import 'react-quill/dist/quill.snow.css'; // Include Quill styling

function TextEditor() {
    const [content, setContent] = useState('');
  
    const handleChange = (value) => {
      setContent(value);
    };
  
    return (
      <div>
        <ReactQuill
          value={content}
          onChange={handleChange}
          theme="snow" // Options: 'snow' or 'bubble'
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],       // Formatting buttons
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
              [{ 'header': [1, 2, 3, false] }],     // Headers
              ['link', 'image'],                    // Add links and images
            ],
          }}
        />
        <p>Editor Content (HTML):</p>
        <div>{content}</div>
      </div>
    );
  }
  
  export default TextEditor;
// src/App.js
import React, { useState } from 'react';
import STLViewer from './STLViewer';

function App() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            setFile(fileUrl);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>STL File Translator</h1>
            <input type="file" accept=".stl" onChange={handleFileChange} />
            {file && <STLViewer file={file} />}
        </div>
    );
}

export default App;
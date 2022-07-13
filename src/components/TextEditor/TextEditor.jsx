import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        console.log(editorState);
    }, [editorState]);

    return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default TextEditor;

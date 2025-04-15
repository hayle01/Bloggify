import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "./quill.snow.css";

export const QuilEditor = ({ value, onChange, placeholder, className, height = 400 }, ref) => {
    // create a separate ref for the reactquill component
    const quillRef = useRef();

    const [editorValue, setEditorValue] = useState(value || "");

    // update local state when prop value changes
    useEffect(() => {
      setEditorValue(value || "");
    }, [value]);

    const handleChange = useCallback((value) => {
      setEditorValue(value);
      onChange(value)
    }, [onChange]);

    // setup module
    const modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}, {'header': 3}, {'header': 4}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ]
    }

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent', 'link', 'image', 'code-block', 'script'
    ];



    return (
      <div className={className || ""} style={{ height: `${height}px` }}>
        <ReactQuill
          value={editorValue}
          onChange={handleChange}
          ref={quillRef}
          placeholder={placeholder || 'Write your content'}
          theme="snow"
          style={{height: `${height - 42}px`}}
          modules={modules}
          formats={formats}
        />
      </div>
    );
  };

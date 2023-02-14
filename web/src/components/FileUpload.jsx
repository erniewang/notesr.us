import { useRef, useState } from 'react'
import { UploadIcon } from '@primer/octicons-react';
import './file_upload.css';

export const FileUpload = (props) => {
  const { accept, msg } = props;
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  function handleFile(files) {
    let data = new FormData();
    const file = files[0];
    data.append('file', file, file.name);
    //  dont provide headers such as 'Content-Type', otherwise fastapi will have 422 Unprocessable Entity
    fetch('/api/upload', { method: 'POST', body: data })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  } 
  
  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // triggers when file is dropped
  const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };
  
  // triggers when file is selected with click
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };
  
// triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };
  
  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
        <div>
          <p>{ msg }</p>
          <button className="upload-button" onClick={onButtonClick}>
	    <UploadIcon />
	    Or click to upload
	  </button>
        </div> 
      </label>
      { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
  );
};

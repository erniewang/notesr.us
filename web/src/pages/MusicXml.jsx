import { useEffect, useState } from 'react';
import { FileUpload } from '../components/FileUpload.jsx';
import OsmDisplay from '../components/OsmDisplay.jsx';

function MusicXml() {
  const [file, setFile] = useState("");
  

  useEffect( () => {
    //setFile("/api/files/Nanomimes.musicxml");
    setFile('https://notesr.us/api/files/Nanomimes.musicxml');
  }, []);
  return (
    <>
      <div>
          <FileUpload
	    msg="Drag MusciXML file here"
	  />
	  <OsmDisplay file={file} />
      </div>
    </>
  )
}

export default MusicXml;


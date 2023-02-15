import { useEffect, useState } from 'react';
import { FileUpload } from '../components/FileUpload';
//import OsmDisplay from '../components/OsmDisplay.jsx';
//import Score from '../components/Score.jsx';
import { OsmdScore } from '../components/OsmdScore';

function MusicXml() {
  const [file, setFile] = useState("");
  

  useEffect( () => {
    //setFile("/api/files/Nanomimes.musicxml");
    //setFile("/api/files/score.xml");
    //setFile('https://notesr.us/api/files/Nanomimes.musicxml');
    setFile('https://notesr.us/api/files/MuzioClementi_SonatinaOpus36No1_Part1.musicxml');
  }, []);
  return (
    <>
      <div>
          <FileUpload
	    msg="Drag MusciXML file here"
	  />
	  <OsmdScore file={file} />
      </div>
    </>
  )
}

export default MusicXml;


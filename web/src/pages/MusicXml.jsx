import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Center } from '@chakra-ui/react';
import { FaSpinner } from 'react-icons/fa';
import { FileUpload } from '../components/FileUpload';
//import OsmDisplay from '../components/OsmDisplay.jsx';
//import Score from '../components/Score.jsx';
import { OsmdScore } from '../components/OsmdScore';

const musicxml_samples = [
  'prelude_in_c.musicxml',
  'Clementi_Opus36No3.musicxml',
  'JohannSebastianBach_Air.musicxml',
  'Clementi_Opus36No1_Part1.musicxml',
];

function MusicXml() {
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');
  const [file, setFile] = useState("");
  

  useEffect( () => {
    setFile('https://notesr.us/api/files/samples/prelude_in_c.musicxml');
  }, []);

  useEffect( () => {
    setLoading(false);
    if(!uploadResult)return;
    console.log('uploadResult = ' + uploadResult);
    if('file' in uploadResult){
      setFile(`https://notesr.us/api/files/${uploadResult.file}`);
    }
    if('files' in uploadResult){
      setFile(`https://notesr.us/api/files/${uploadResult.files[0]}`);
    }
  }, [uploadResult]);

  return (
    <>
      <div>
        <Center>
          <FileUpload
	    setLoading={setLoading}
	    setUploadResult={setUploadResult}
	    msg="Drag MusciXML (.mxl or .musicxml) file here"
	  />
	  { loading && <FaSpinner icon="spinner" className="fa_spinner" /> }
        </Center>
        <div>
          <span>Samples: </span>
          <ButtonGroup>
            { musicxml_samples.map((e) => (
                <Button
                  key={e}
                  size='xs'
                  onClick={() => setFile(`https://notesr.us/api/files/samples/${e}`)}
                >
                  {e}
                </Button>
              ))
            }
          </ButtonGroup>
        </div>
	<OsmdScore file={file} />
      </div>
    </>
  )
}

export default MusicXml;

import { useEffect, useState } from 'react';
import { Center } from '@chakra-ui/react';
import { FaSpinner } from 'react-icons/fa';
import { FileUpload } from '../components/FileUpload.jsx';
import AbcEditor from '../components/AbcEditor';


const Pitch2Notes = () => {
  const [loading, setLoading] = useState(false);
  const [gotAbcBack, setGotAbcBack] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [abctxt, setAbctxt] = useState('');

  const showAbc = (text) => {
    setLoading(false);
    setAbctxt(text);
    setGotAbcBack(true);
  };

  useEffect( () => {
    if(!uploadResult)return;
    console.log('uploadResult = ' + uploadResult.abc);
    fetch(`/api/files/${uploadResult.abc}`)
      .then((res) => res.text())
      .then((text) => showAbc(text))
      .then((err) => console.log(err));
  }, [uploadResult]);

  return (
    <>
      <div>
	<Center>
          <FileUpload
	    msg="Drag wav or mp3 file here"
	    setLoading={setLoading}
	    setUploadResult={setUploadResult}
	  />
	</Center>

        <Center>
	  { loading && <FaSpinner icon="spinner" className="fa_spinner" /> }
	  { gotAbcBack && <AbcEditor abctxt={abctxt} /> }
        </Center>
      </div>
    </>
  )
};

export default Pitch2Notes;

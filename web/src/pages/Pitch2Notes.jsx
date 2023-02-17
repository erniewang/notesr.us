import { useEffect } from 'react';

import { FileUpload } from '../components/FileUpload.jsx';

const Pitch2Notes = () => {

  useEffect( () => {
  }, []);
  return (
    <>
      <div>
          <FileUpload
	    msg="Drag wav or mp3 file here"
	  />
          <div>
	  to do
          </div>
      </div>
    </>
  )
};

export default Pitch2Notes;

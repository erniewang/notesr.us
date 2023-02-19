import { useEffect, useState } from 'react';
import { Button, Center, Icon, Text } from '@chakra-ui/react';
import { FaMicrophone, FaSpinner } from 'react-icons/fa';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import AbcEditor from '../components/AbcEditor';


const NoteListener = () => {
  const [recording, setRecording] = useState(false);
  const [gotAbcBack, setGotAbcBack] = useState(false);
  const [abctxt, setAbctxt] = useState('');
  const recorderControls = useAudioRecorder();

  const showAbc = (text) => {
    setAbctxt(text);
    setGotAbcBack(true);
  };

  const onGotAbcBack = (data) => {
    if(data.abc){
      fetch(`/api/files/${data.abc}`)
        .then((res) => res.text())
        .then((text) => showAbc(text))
        .then((err) => console.log(err));
    }
  };

  const postAudioBlob = (blob) => {
    let form = new FormData();
    // Chrome, Edge, Firefox save to webm
    // TODO: test on Safari
    form.append('file', blob, 'mic.webm');
    fetch('/api/upload', { method: 'POST', body: form})
      .then((res) => res.json())
      .then((data) => onGotAbcBack(data))
      .then((err) => console.log(err));
  };

  useEffect( () => {
  }, [abctxt]);

  const onStartStopRecording = () => {
    setGotAbcBack(false);
    if(!recording){
      recorderControls.startRecording();
      setRecording(true);
    } else {
      recorderControls.stopRecording();
      setRecording(false);
    }
  };

  return (
    <>
      <div>
	<div style={{display: 'none'}}>
          <AudioRecorder 
            onRecordingComplete={(blob) => postAudioBlob(blob)}
            recorderControls={recorderControls}
          />
        </div>
	<Center>
	<Text>
          Click microphone to start recording, click again to stop. 
          Your notes will appear below the microphone.
	</Text>
	</Center>
	<Center>
	<Button
	  m={2}
	  cursor='pointer'
	  size='lg'
          variant='outline'
          onClick={onStartStopRecording}
	>
          <Icon as={FaMicrophone} boxSize='2em' />
        </Button>
	</Center>

        <Center>
	  { recording && <FaSpinner icon="spinner" className="fa_spinner" /> }
	  { gotAbcBack && <AbcEditor abctxt={abctxt} /> }
        </Center>
      </div>
    </>
  )
};

export default NoteListener;


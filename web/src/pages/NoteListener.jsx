import { useEffect, useState } from 'react';
import { Button, Center, Icon, Text } from '@chakra-ui/react';
import { FaMicrophone, FaSpinner } from 'react-icons/fa';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';


const NoteListener = () => {
  const [recording, setRecording] = useState(false);
  const [waitingForBackend, setWaitingforBackend] = useState(false);
  const recorderControls = useAudioRecorder();

  const postAudioBlob = (blob) => {
    let form = new FormData();
    // Chrome, Edge, Firefox save to webm
    // TODO: test on Safari
    form.append('file', blob, 'mic.webm');
    fetch('/api/upload', { method: 'POST', body: form})
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((err) => console.log(err));
  };

  useEffect( () => {
  }, []);

  const onStartStopRecording = () => {
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
	<Text>
          Click microphone to start recording, click again to stop. 
          Your notes will appear below the microphone.
	</Text>
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

        <div>
	  { recording && <FaSpinner icon="spinner" className="fa_spinner" /> }
        </div>
      </div>
    </>
  )
};

export default NoteListener;


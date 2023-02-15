import React, { createRef, useEffect } from 'react';
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { Button, ButtonGroup, Center } from '@chakra-ui/react'
//import AudioPlayer from "../lib/osmd_audio_player";
import AudioPlayer from "osmd-audio-player";

export const OsmdScore = ({file}) => {
  window.audioPlayer = new AudioPlayer();
  const divRef = createRef();

  useEffect(() => {
    if(!file){
      return;
    }
    (async () => {
      const osmd = new OpenSheetMusicDisplay(divRef.current);
      await osmd.load(file);
      await osmd.render();
      await window.audioPlayer.loadScore(osmd);
    })();
  },[file, divRef]);

  const play = () => { 
    window.audioPlayer.play(); 
  };

  const pause = () => { 
    window.audioPlayer.pause(); 
  };
  
  const stop = () => { 
    window.audioPlayer.stop(); 
  };

  return (
    <div>
      <Center>
        <ButtonGroup variant='outline' spacing='5'>
          <Button colorScheme='blue' onClick={play}>Play</Button>
          <Button colorScheme='orange' onClick={pause}>Pause</Button>
          <Button colorScheme='red' onClick={stop}>Stop</Button>
        </ButtonGroup>
      </Center>
      <div ref={divRef} />
    </div>
  );
};

import React, { createRef, useEffect } from 'react';
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { Button, ButtonGroup, Center, Icon } from '@chakra-ui/react'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
//import AudioPlayer from "../lib/osmd_audio_player";
import AudioPlayer from "osmd-audio-player";

export const OsmdScore = ({file}) => {
  window.audioPlayer = new AudioPlayer();
  const divRef = createRef();

  useEffect(() => {
    if(!file){
      return;
    }
    divRef.current.innerHTML = '';
    console.log('#'.repeat(20) + ' OsmdScore ' + '#'.repeat(20));
    console.log(file);
    (async () => {
      const osmd = new OpenSheetMusicDisplay(divRef.current);
      await osmd.load(file);
      await osmd.render();
      await window.audioPlayer.loadScore(osmd);
    })();
  },[file]);

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
        <ButtonGroup variant='outline' spacing='5' m={2}>
          <Button onClick={play}><Icon as={FaPlay} /></Button>
          <Button onClick={pause}><Icon as={FaPause} /></Button>
          <Button onClick={stop}><Icon as={FaStop} /></Button>
        </ButtonGroup>
      </Center>
      <div ref={divRef} />
    </div>
  );
};

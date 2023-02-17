import { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import { FaArrowDown, FaArrowUp, FaUndo } from 'react-icons/fa';
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';

const cooley = 'X:1\nT: Cooley\'s\nM: 4/4\nL: 1/8\nR: reel\nK: Emin\nD2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|\n"Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||\n|:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|\n"Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]\n';

export const NoteEditor = () => {
  const [abctxt, setAbctxt] = useState(cooley);
  const [editor, setEditor] = useState(undefined);
  const [transposeLevel, setTransposeLevel] = useState(0);
  const [params, setParams] = useState({
    render: { selectTypes: false },
    synth: { }
  });

  const setupEditor = () => {
    setEditor(new abcjs.Editor('editor_abc', {
      canvas_id: 'paper_abc',
      warnings_id: 'warnings_abc',
      abcjsParams: { selectTypes: false },
      synth: {
        el: '#audio_abc',synth: { selectTypes: false },
        options: {
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          options: {}
        }
      }
    }));
  };
  
  useEffect( () => {
    //abcjs.renderAbc('paper', tune, {});
    setupEditor(); 
  }, []);

  useEffect( () => {
    //abcjs.renderAbc('paper', tune, {});
  }, [abctxt]);

  useEffect( () => {
    if(!editor)return;
    editor.paramChanged(params.render);
    editor.synthParamChanged(params.synth);
  }, [params, editor]);

  const onAbcChange = (e) => {
    setAbctxt(e.target.value);
  };

  const transposeUp = () => {
    const newLevel = transposeLevel + 1;
    setTransposeLevel(newLevel);
    if(newLevel){
      setParams({
        render: { selectTypes: false, visualTranspose: newLevel},
        synth: { midiTranspose: newLevel }
      });
    } else {
      setParams({
        render: { selectTypes: false},
        synth: {}
      });
    }
  };

  const transposeDown = () => {
    const newLevel = transposeLevel - 1;
    setTransposeLevel(newLevel);
    setParams({
      render: { selectTypes: false, visualTranspose: newLevel},
      synth: { midiTranspose: newLevel }
    });
  };

  const transposeReset = () => {
    setTransposeLevel(0);
    setParams({
      render: { selectTypes: false, visualTranspose: 0},
      synth: { midiTranspose: 0 }
    });
  };

  return (
    <Grid
      templateColumns='repeat(3, 1fr)'
      gap={3}
    >
      <GridItem colSpan={1}>
	<div>
	  <p>Paste your ABC text below:</p>
	  <textarea
	    id="editor_abc"
	    value={abctxt}
            cols={50}
            rows={15}
            wrap="soft"
            onChange={onAbcChange}
	  />
          <div id="warnings_abc"></div>
	  <Text fontSize='sm'color="red">
	    The text you highlighted will be shown in red in score.
	  </Text>
	</div>
        <div id="audio_abc"></div>
        <Box border='2px' borderColor='gray.200'>
	  <Text as='b'>Transpose</Text>
	  <br />
	  <span>current level: </span>
	  <Text as='mark'> {transposeLevel} </Text>
	  &nbsp; 
          <button onClick={transposeUp}><Icon as={FaArrowUp} /></button>
          <button onClick={transposeDown}><Icon as={FaArrowDown} /></button>
          <button onClick={transposeReset}><Icon as={FaUndo} /></button>
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <div id="paper_abc" />
      </GridItem>
    </Grid>
  );
}

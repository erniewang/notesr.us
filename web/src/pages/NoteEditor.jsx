import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Text } from '@chakra-ui/react'
import AbcEditor from '../components/AbcEditor';
import abcs from '../components/abc_samples';


export const NoteEditor = () => {
  const [abctxt, setAbctxt] = useState(abcs.Cooley);

  useEffect(() => {
    //console.log(abctxt);
    console.log("setting abctxt from NoteEditor");
    //console.log(abctxt);
  },[abctxt]);

  return (
    <div>
      <span>Samples: </span>
      <ButtonGroup>
        { Object.keys(abcs).map((k) => (
            <Button
              key={k}
              size='xs'
              onClick={() => setAbctxt(abcs[k])}
            >
              {k}
            </Button>
          ))
        }
      </ButtonGroup>
      <AbcEditor abctxt={abctxt} />
    </div>
  );
}

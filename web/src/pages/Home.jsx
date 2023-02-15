import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';


const features = [
  {
    title: 'Note Display (MusicXML)',
    text: 'Upload your MusicXML file, display notes and play your music in the browser.',
  },
  {
    title: 'Note Display (ABC)',
    text: 'Paste a text of ABC notation, display your music notes and play music.',
  },
  {
    title: 'Note Editor',
    text: 'Edit your music score, play it and download it.',
  },
  {
    title: 'Chord Generator',
    text: 'Generate all kinds of chords.',
  },
  {
    title: 'Note Listener',
    text: 'Play, sing; NoteListener will put your music into notes and let you download your score.',
  },
  {
    title: 'Ear Trainer',
    text: 'Develop your music intuition',
  },
];

export const Home = () => {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>NotesR.US is a toolbox for musicians</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Select one from top menu.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, idx) => (
            <HStack key={idx} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

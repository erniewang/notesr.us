import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';

function Footer() {
  return (
    <>
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Center>
          <Text fontSize={'sm'}>© 2022 Ernie Wang</Text>
        </Center>
      </Box>
    </>
  );
}

export default Footer;

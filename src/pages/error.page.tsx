import React from 'react';
import { Link } from 'react-router-dom';
import { Center, Box, Heading, Text, Button } from '@chakra-ui/react';

const Error404 = () => (
  <Center h="100vh">
    <Box textAlign="center">
      <Heading as="h1" size="2xl" mb="4">
        Ops! Pagina non trovata
      </Heading>
      <Text fontSize="xl" mb="4">
        La pagina che stai cercando non è disponibile.
      </Text>
      <Link to="/">
        <Button colorScheme="teal" variant="solid">
          Torna alla Home
        </Button>
      </Link>
    </Box>
  </Center>
);

export default Error404;

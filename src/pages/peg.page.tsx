import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";



function Peg() {

  return (
    <>
      <Flex marginY='100px' w='70%' alignItems='center' flexDirection='column'>
        <Heading> Progetto Educativo </Heading>
        <Divider marginY='1em' />
        <iframe 
          src="https://drive.google.com/file/d/1w6oWde-OhfEkiHomhR1CfrPbnp2btbJm/preview" 
          width="90%" 
          height="590" 
          allow="autoplay">
        </iframe>
      </Flex>
    </>
  );
}

export default Peg;

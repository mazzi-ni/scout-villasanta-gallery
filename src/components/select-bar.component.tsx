import React, { useState } from 'react';
import { 
  Box, 
  Center, 
  Flex,
  Text,
  Button,
  Stack,
  Spacer,
  Slide,
  useColorModeValue,
} from "@chakra-ui/react";
import { BrancaColorMapping, EBranca } from "../types/album.type";

const brache = [
  "LC",
  "EG",
  "RS",
  "COCA",
]

type SelectBarProps = {
  options: { label: string; value: String; selected: boolean }[];
  onFilter: (value: String) => void;
};

export const SelectBar = ({ options, onFilter } : SelectBarProps) => {
  const [currentOption, setCurrentOption] = useState(options[0].value);

  const handleSelect = (value: String) => {
    setCurrentOption(value);
    onFilter(value);
  };

  return (
  <Flex
    position="fixed"
    bottom="10px"
    width="100%"
    justifyContent="center"
    zIndex="sticky"
    >
    <Box 
      bg={useColorModeValue('gray.100', 'gray.900')} 
      px={4}
      rounded={"40px"}
      minW={"300px"}
      style={{ boxShadow: "0px 0px 30px 0px rgba(0,0,0,.22)",  }}
      padding={"2px"}
    >

      <Flex direction='row' align='center'>
      
        {options.map((option) => (
          <Button 
            colorScheme={BrancaColorMapping[option.label as EBranca]} 
            margin='1px'
            variant='ghost' 
            rounded='40px'
            key={option.value as any} 
            onClick={() => handleSelect(option.value)}
            isActive={currentOption === option.value}
          >
            {option.label}
          </Button>
        ))}
      </Flex>
    </Box>
  </Flex>
  );
}

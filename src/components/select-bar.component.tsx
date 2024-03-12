import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Text,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Album, BrancaColorMapping, EBranca } from "../types/album.type";
import axios from "axios";

// type SelectBarProps = {
//   options: { label: string; value: String; selected: boolean }[];
//   onFilter: (value: String) => void;
// };

type SelectBarProps = {
  options: { label: string; value: string; selected: boolean }[];
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>; // Add this line
  onFilter: (value: string) => void;
};

export const SelectBar = ({ options, setAlbums, onFilter }: SelectBarProps) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const [currentOption, setCurrentOption] = useState(options[0].value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const urlRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);

  const handleSelect = (value: string) => {
    setCurrentOption(value);
    onFilter(value);
  };

  const handleAdd = () => {
    if (!urlRef.current || !nameRef.current) {
      console.log("Input reference is null");
      return;
    }

    const fetch_album_url = "https://fetch-google-album.netlify.app/api/";
    const url = urlRef.current.value;
    const name = nameRef.current.value;
    const id = url.replace("https://photos.app.goo.gl/", "");

    axios
      .get(fetch_album_url + id)
      .then((res) => {
        let album: Album = {
          name: name,
          album_cover: res.data[0],
          album_link: url,
          date: Date.now().toString(),
          branca: EBranca.EG,
          place: "villasanta(MB)",
        };

        console.log(album);
        setAlbums((prevAlbums) => [album, ...prevAlbums]);

        axios
          .post("https://sheetdb.io/api/v1/szlv36k1mncvl", {
            id: "INCREMENT",
            ...album,
          })
          .then((res) => console.log(res.status))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
        bg={useColorModeValue("white", "#343f53")}
        rounded={"40px"}
        minW={"300px"}
        style={{ boxShadow: "0px 0px 30px 0px rgba(0,0,0,.22)" }}
        padding={"2px"}
      >
        <Flex direction="row" align="center">
          {options.map((option) => (
            <Button
              colorScheme={BrancaColorMapping[option.label as EBranca]}
              margin="1px"
              variant="ghost"
              rounded="40px"
              key={option.value as any}
              onClick={() => handleSelect(option.value)}
              isActive={currentOption === option.value}
            >
              {option.label}
            </Button>
          ))}
        </Flex>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          style={{ boxShadow: "0px 0px 30px 0px rgba(0,0,0,.22)" }}
          bg={useColorModeValue("#e2e8f0", "#343f53")}
          _hover={{
            bg: useColorModeValue("#a3bffa", "#1a202c"),
          }}
          padding="0"
          marginX="10px"
          aria-label="Aggiungi"
          height="100%"
          width="48px"
          icon={<AddIcon />}
          isRound
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        />

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input ref={nameRef} placeholder="Campo Estivo 2021" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Album Url</FormLabel>
                <Input
                  ref={urlRef}
                  placeholder="https://photos.app.goo.gl/LHR6y2ayCAZnHSfy7"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={() => {
                  handleAdd();
                  onClose();
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

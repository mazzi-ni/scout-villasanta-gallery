import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure,
  SimpleGrid,
  MenuItem,
  MenuButton,
  Menu,
  MenuList,
  useToast,
  CircularProgress,
  Center,
} from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Album, BrancaColorMapping, EBranca } from "../types/album.type";
import axios from "axios";
import { AlbumCard } from "./album-card.component";
import { Loader } from "./loader.component";
import { abort } from "process";

type SelectBarProps = {
  options: { label: string; value: string; selected: boolean }[];
  setAlbums: React.Dispatch<React.SetStateAction<Album[]>>; // Add this line
  onFilter: (value: string) => void;
  albums: Album[];
};

const OverlayOne = () => (
  <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
);

export const SelectBar = ({
  options,
  setAlbums,
  onFilter,
  albums,
}: SelectBarProps) => {
  const [currentOption, setCurrentOption] = useState(options[0].value);
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<number>();
  const [newalbum, setNewalbum] = useState<Album>({
    name: "",
    album_cover: "",
    album_link: "",
    date: Date.now().toString(),
    branca: EBranca.EG,
    place: "villasanta(MB)",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const urlRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const placeRef = React.useRef<HTMLInputElement>(null);
  const [countStep, setCountStep] = useState(0);

  const onCloseModal = () => {
    setNewalbum({
      name: "",
      album_cover: "",
      album_link: "",
      date: Date.now().toString(),
      branca: EBranca.EG,
      place: "villasanta(MB)",
    });
    setLoading(true);
    setCountStep(0);
    onClose();
  };

  const handleNextStep = () => {
    if (countStep === step.length - 1) {
      step[countStep].handler();
      onCloseModal();
      return;
    }

    if (countStep < step.length - 1) {
      if (!step[countStep].handler()) {
        onCloseModal();
        return;
      }

      setCountStep(countStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (countStep === 0) {
      onCloseModal();
      return;
    }
    if (countStep > 0) {
      setCountStep(countStep - 1);
    }
  };

  const step = [
    {
      title: "Album Url",
      content: () => (
        <>
          <FormControl mt={4}>
            <FormLabel>Album Url</FormLabel>
            <Input
              ref={urlRef}
              placeholder="https://photos.app.goo.gl/LHR6y2ayCAZnHSfy7"
            />
          </FormControl>
        </>
      ),
      handler: () => {
        const albumExists = albums.some(
          (album) => album.album_link === urlRef.current?.value
        );
        if (urlRef.current?.value === "") {
          // onCloseModal();
          toast({
            title: "Inserire un link",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          return false;
        }

        if (albumExists) {
          // onCloseModal();
          toast({
            title: "Album già esiste",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          return false;
        }

        setNewalbum((album) => ({
          ...album,
          album_link: urlRef.current?.value || "",
        }));

        return true;
      },
    },
    {
      title: "Select Image Cover",
      content: () => {
        let id = newalbum.album_link.replace("https://photos.app.goo.gl/", "");

        axios
          .get("https://fetch-google-album.netlify.app/api/" + id)
          .then((res) => {
            setImages(res.data);
            setLoading(false);
          })
          .catch((err) => console.log(err.status));

        return (
          <>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="green.300" />
              </Center>
            ) : (
              <Box height={"100%"}>
                <SimpleGrid columns={3} spacing={4}>
                  {images.map((img: string, index: number) => (
                    <Image
                      key={index}
                      rounded={"2xl"}
                      src={img}
                      loading="lazy"
                      alt={`album-cover ${index}`}
                      onError={() => console.log(img)}
                      border={
                        selectedImage === index ? "5px solid #3182ce" : ""
                      }
                      onClick={() => {
                        console.log(img);
                        setSelectedImage(index);
                        setNewalbum((album) => ({
                          ...album,
                          album_cover: img,
                        }));
                      }}
                      _hover={{
                        cursor: "pointer",
                        transitionDuration: "0.2s",
                        transitionTimingFunction: "ease-in-out",
                        transform: "scale(1.02)",
                        boxShadow: "0px 0px 30px 0px rgba(0,0,0,.22)",
                      }}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </>
        );
      },
      handler: () => {
        if (newalbum.album_cover === "") {
          toast({
            title: "Selezionare una copertina",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
          return false;
        }
        return true;
      },
    },
    {
      title: "Dati Album",
      content: () => (
        <>
          <SimpleGrid
            columns={2}
            spacing="2"
            alignItems={"end"}
            templateColumns="2fr 1fr"
          >
            <FormControl mt={2}>
              <FormLabel>Nome</FormLabel>
              <Input ref={nameRef} placeholder="Campo Scout 2021" />
            </FormControl>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme={BrancaColorMapping[newalbum.branca]}
              >
                {newalbum.branca}
              </MenuButton>
              <MenuList>
                {(Object.values(EBranca) as EBranca[]).map(
                  (branca: EBranca) => (
                    <MenuItem
                      key={branca}
                      onClick={() => {
                        setNewalbum((album) => ({
                          ...album,
                          branca: branca,
                        }));
                      }}
                    >
                      {branca}
                    </MenuItem>
                  )
                )}
              </MenuList>
            </Menu>

            <FormControl mt={2}>
              <FormLabel>Place</FormLabel>
              <Input ref={placeRef} placeholder="Villasanta (MB)" />
            </FormControl>

            <SingleDatepicker
              name="date-input"
              date={date}
              onDateChange={setDate}
              configs={{
                dateFormat: "dd-MM-yyyy",
                dayNames: "abcdefg".split(""), // length of 7
                monthNames: "ABCDEFGHIJKL".split(""), // length of 12
                firstDayOfWeek: 2, // default is 0, the dayNames[0], which is Sunday if you don't specify your own dayNames,
              }}
            />
          </SimpleGrid>
        </>
      ),
      handler: () => {
        setNewalbum((album) => ({
          ...album,
          name: nameRef.current?.value as string,
          place: placeRef.current?.value as string,
          date: date.toLocaleString("it-IT"),
        }));

        return true;
      },
    },
    {
      title: "preview new Album",
      content: () => (
        <Box>
          <AlbumCard album={newalbum} />
        </Box>
      ),
      handler: () => {
        axios
          .post("https://sheetdb.io/api/v1/szlv36k1mncvl", {
            id: "INCREMENT",
            ...newalbum,
          })
          .then((res) => console.log(res.status))
          .catch((err) => {
            console.log(err);
            return false;
          });

        console.log(newalbum);
        setAlbums((albums) => [newalbum, ...albums]);
        onClose();
        return true;
      },
    },
  ];

  const handleSelect = (value: string) => {
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

        <Modal
          isCentered
          isOpen={isOpen}
          onClose={() => {
            onCloseModal();
          }}
          scrollBehavior={"inside"}
          size={"xl"}
        >
          {overlay}
          <ModalContent>
            <ModalHeader>{step[countStep].title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>{step[countStep].content()}</ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                onClick={handlePreviousStep}
                disabled={countStep === 0}
                hidden={countStep === 0}
              >
                Previous
              </Button>
              <Button
                mr={3}
                onClick={handleNextStep}
                disabled={countStep === step.length}
              >
                {countStep === step.length - 1 ? "Add" : "Next"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

// <ModalHeader>New Album</ModalHeader>
// <ModalCloseButton />
// <ModalBody pb={6}>{step[3].content("0") as JSX.Element}</ModalBody>
// <ModalFooter>
//   <Button
//     mr={3}
//     onClick={() => {
//       handleAdd();
//       onClose();
//     }}
//   >
//     Add
//   </Button>
// </ModalFooter>

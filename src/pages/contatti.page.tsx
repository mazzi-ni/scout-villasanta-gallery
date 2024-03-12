import {
  Container,
  Flex,
  Link,
  Spacer,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdBuild, MdCall } from "react-icons/md";

export default function Contact() {
  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          // bg="#02054B"
          // color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 4, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 10, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading marginY="10px">Info</Heading>
                  <Accordion defaultIndex={[0]}>
                    <AccordionItem w="100%" _expanded={{ fontWeight: "bold" }}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <Text fontWeight="bold"> Chi Siamo </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} maxW="600px">
                        Sul territorio di Villasanta il movimento scout è
                        rappresentato da uno dei gruppi più antichi d'Italia
                        (1916) appartenente all'Associazione Guide e Scout
                        Cattolici Italiani AGESCI.
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <Text fontWeight="bold">
                              {" "}
                              Info per l'iscrizione{" "}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4} maxW="600px">
                        <Text>
                          Per informazioni relative alla procedura d'iscrizione
                          è possibile contattare Giovanna al numero: 039 305004
                          o per qualsiasi altra informazione inviare una e-mail
                          a info@scoutvillasanta.it
                        </Text>
                        <Box h="10px" />
                        <Text>
                          Per effettuare l'iscrizione bisogna compilare la
                          <Link
                            href="http://www.scoutvillasanta.it/iscrizioni/Scheda%20Iscrizione.pdf"
                            fontWeight="bold"
                            isExternal
                          >
                            {" "}
                            scheda di iscrizione <ExternalLinkIcon mx="2px" />{" "}
                          </Link>
                          e può essere riconsegnate presso la bottega equo e
                          solidale "Equinozio" in
                          <Link
                            isExternal
                            href="https://maps.app.goo.gl/gVwMw5G2uZ151Rvt9"
                          >
                            {" "}
                            piazza Martiri della Libertà 1 Villasanta.{" "}
                          </Link>
                        </Text>
                        <Divider marginY="20px" />
                        <Button
                          rightIcon={<MdCall />}
                          colorScheme="teal"
                          variant="ghost"
                        >
                          <Text> 039 305004 </Text>
                        </Button>
                        <Button
                          rightIcon={<MdEmail />}
                          colorScheme="teal"
                          variant="ghost"
                        >
                          info@scoutvillasanta.it
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </WrapItem>
              <WrapItem>
                <Flex
                  bg="white"
                  borderRadius="lg"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Flex>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}

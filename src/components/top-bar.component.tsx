import {
  Box,
  Flex,
  Image,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { DarkModeSwitcher } from "./dark-mode-switcher.component"


const Links = [
  { name: 'Home', link: 'home' }, 
  { name: 'Foto', link: 'foto' }, 
  { name: 'Progetto Educativo', link: 'peg' }, 
  { name: 'Contatti', link: 'contatti' }, 
]

const NavLink = ({ nav_link }: { nav_link: any }) => {
  const { name, link } = nav_link;

  return (
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      <Link to={link}>
        {name}
      </Link>
    </Box>
  )
}

export const TopBar = ( ) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box 
        bg={useColorModeValue('white', '#343f53')} 
        px={4}
        rounded={"lg"}
        pos={"fixed"}
        zIndex={"sticky"}
        w={"80%"}
        style={{ boxShadow: "0px 0px 30px 0px rgba(0,0,0,.22)",  }}
        paddingX={"15px"}
        paddingY={"10px"}
        >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image
              width={{ sm: "40px", md: "50px", lg: "60px" }}
              src="VILLASANTA1_Colore_HiRes.png"
              paddingLeft={"7px"}
            />
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.link} nav_link={link}></NavLink>
              ))}
            </HStack>
          </HStack>
          <DarkModeSwitcher />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.link} nav_link={link}></NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  )
}

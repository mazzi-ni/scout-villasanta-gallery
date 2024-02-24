import { Alert, AlertIcon, Box, SimpleGrid } from "@chakra-ui/react";
import { AlbumCard } from "./album-card.component";
import { Album } from "../types/album.type";

// Full screen 
// <Box w="100%" padding="2%">
//    <SimpleGrid columns={4} spacing={5} minChildWidth="350px">

export const AlbumGallery = ({ albums }: { albums: Album[] }) => (
  <Box w="100%" padding="3%">
   <SimpleGrid columns={4} spacing={5} minChildWidth="350px">
      {albums.length ? (
        albums.map((album, index) => <AlbumCard key={index} album={album} />)
      ) : (
        <Box height={"80vh"}>
          <Alert status="warning">
            <AlertIcon />
            Ancora non ci sono album per questa branca, torna tra qualche
            giorno!
          </Alert>
        </Box>
      )}
    </SimpleGrid>
  </Box>
);

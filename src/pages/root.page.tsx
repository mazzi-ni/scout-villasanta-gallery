import React from "react";
import {
  Box,
  Center,
  Flex,
} from "@chakra-ui/react";
import { Outlet , useOutlet } from "react-router-dom";
import { TopBar } from "../components/top-bar.component";
import { Footer } from "../components/footer.component";
import Home from "./home.page";


function Root() {
  const outlet = useOutlet();
  
  return (
    <>
      <Flex direction={"column"} h='100vh'>
        <Flex direction={"column"} >
          <Box
            height={"100px"}
            width={"100%"}
            paddingLeft={"10%"}
            paddingRight={"10%"}
            paddingTop={"2%"}
          >
            <TopBar/>
          </Box>
          <Box>
            <Center>
              { outlet === null ? <Home /> : <Outlet /> }
            </Center>
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

export default Root;

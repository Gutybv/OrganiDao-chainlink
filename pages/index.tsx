import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Nav from './components/navbar';
import Typewriter from "typewriter-effect";
import {
  Text,
  Container,
  Stack,
  Heading,
  Button,
  useColorModeValue,
  useColorMode,
  Box,
  IconButton,
} from "@chakra-ui/react";


export default function Home() {
  const color = useColorModeValue("black", "white");
  const regularText = useColorModeValue("gray.700", "gray.300");
  return (
    <>
    <Nav/>
    <Container maxW="3xl">
      <Stack
        spacing={8}
        textAlign={"center"}
        align="center"
        py={{ base: 40, md: 36 }}
      >
        <Heading as="h1" size="2xl" fontWeight="700"   bgClip='text' bgGradient='linear(to-l, #FF2CDF, #0014FF)'>
          <Text pb={2} color={color}>
            Let's start organizing your
          </Text>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Guild")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Community")
                .pauseFor(1500)
                .deleteAll()
                .typeString("DAO")
                .start();
            }}
          />
        </Heading>
        <Text fontSize="xl" fontWeight="400" color={regularText}>
        Start your DAO/Guild very easy with us, just upload your IPFS and we do the work. We create the NFT for you to access the DAO and we start creating automated tasks every month so that together we can make the community grow.        </Text>
        <Stack spacing={4} direction="row">
          <Button bgGradient='linear(to-br, #FF2CDF, #0014FF)' color='white'  variant="solid" size="lg" mr={2} onClick={() => {
              window.open("./startdao", "_self");
            }}>
            Create Community
          </Button>
          <Button bgGradient='linear(to-br, #FF2CDF, #0014FF)' color='white' variant="solid" size="lg" mr={2} onClick={() => {
              window.open("./mydao/addTask", "_self");
            }} >
            Create Task
          </Button>
        </Stack>
        
      </Stack>
    </Container>
    </>
  )
}

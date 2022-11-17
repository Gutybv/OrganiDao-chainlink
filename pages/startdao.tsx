import {
  Text,
  FormControl,
  Box,
  Button,
  Input,
  Center,
  Stack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Select,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import Nav from "./components/navbar";
import CONTRACT_ABI from "./abi/contract-abi.json";
import React from "react";

export default function StartDao() {
  const [link, setLink] = React.useState("");

  const chainLink = (event: any) => {
    setLink(event.target.value);
  };

  const createMintNft = async () => {
    console.log("createMintNft");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      "0xc6E0701F7237CEc0207c0768170E353EEAd8e9b4",
      CONTRACT_ABI,
      provider.getSigner()
    );
    console.log("Contract", contract);
    console.log("link", link);
    try {
      const mintNft = await contract.safeMint(
        provider.getSigner().getAddress(),
        link
      );
      console.log("Mint NFT", mintNft);
      const transactionMintNft = await mintNft.wait();
      console.log("Transaction Mint NFT", transactionMintNft);
    } catch (error) {
      console.log(error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Nav />
      <Box>
        <Center>
          <Box pt={20} pb={10}>
            <Text fontSize="5xl" fontWeight="900" color="white" align="center">
              Welcome to Inti
            </Text>
            <Text
              fontSize="xl"
              fontWeight="400"
              color="white"
              align="center"
              pt="20px"
            >
              Let us help you create your dao or <br />
              community in a few minutes
            </Text>
          </Box>
        </Center>
        <Center>
          <Stack spacing={4} direction="row">
            <Box borderRadius="lg" h={300} w={280} backgroundColor="#2A334A">
              <Center>
                <Box>
                  <Image
                    boxSize="140px"
                    src="/image/CreateDAO.png"
                    my={5}
                    ml={3}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="600"
                    color="white"
                    align="center"
                    pt={5}
                  >
                    I already have a <br />
                    NFT memership
                  </Text>
                </Box>
              </Center>
            </Box>
            <Box
              borderRadius="lg"
              h={300}
              w={280}
              backgroundColor="#2A334A"
              onClick={onOpen}
            >
              <Center>
                <Box>
                  <Image
                    boxSize="140px"
                    src="/image/FindDao.png"
                    my={5}
                    ml={3}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="600"
                    color="white"
                    align="center"
                    pt={5}
                  >
                    Create a new <br /> DAO/Community
                  </Text>
                </Box>
              </Center>
              <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent>
                  <Center>
                    <Text fontSize="20" fontWeight="600" align="center" py={7}>
                      Start your <br /> DAO/Community
                    </Text>
                  </Center>
                  <ModalCloseButton />
                  <ModalBody>
                    <SimpleGrid columns={2} spacing={6}>
                      <Box>
                      <Text pb={2}>Let's get started</Text>
                      <Select placeholder="What are you building?">
                        <option value="option1">Guild</option>
                        <option value="option2">Community</option>
                        <option value="option3">DAO</option>
                        <option value="option4">Group</option>
                      </Select>  
                      </Box>
                      
                      <FormControl isRequired >
                        <FormLabel>Name of your Community/DAO</FormLabel>
                        <Input type="text" />
                      </FormControl>

                      <FormControl isRequired >
                        <FormLabel>Link image (IPFS or PNG) </FormLabel>
                        <Input type="text" onChange={chainLink} value={link} />
                      </FormControl>

                      
                    </SimpleGrid>
                      <Text align="center" fontSize='xl' pt={9} fontWeight="bold">Metadata</Text>
                    <SimpleGrid columns={2} spacing={4} pt={6}>
                    <FormControl isRequired >
                        <FormLabel>Attribute 1</FormLabel>
                        <Input type="text" placeholder="COMMUNITY NAME" />
        
                      </FormControl>
                      <FormControl isRequired >
                        <FormLabel>Value</FormLabel>
                        <Input type="text" placeholder="Polygon Guild Santiago" />
                      </FormControl>
                      <Box>
                        <FormLabel>Attribute 2</FormLabel>
                        <Input type="text" placeholder="COUNTY" />
                      </Box>
                      <Box>
                        <FormLabel>Value</FormLabel>
                        <Input type="text" placeholder="Chile" />
                      </Box>
                      <Box>
                        <FormLabel>Attribute 3</FormLabel>
                        <Input type="text" placeholder="CITY" />
                      </Box>
                      <Box>
                        <FormLabel>Value</FormLabel>
                        <Input type="text" placeholder="Santiago" />
                      </Box>
                      
                    </SimpleGrid>
                    
                  </ModalBody>

                  <ModalFooter pt={10}>
                    <Button colorScheme="blue" mr={3} onClick={createMintNft}>
                      Mint nft
                    </Button>
                    <Button>How to create a link IPFS</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Stack>
        </Center>
      </Box>
    </>
  );
}

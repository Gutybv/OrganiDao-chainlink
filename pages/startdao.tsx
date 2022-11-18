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
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import Nav from "./components/navbar";
import CONTRACT_ABI from "./abi/contract-abi.json";
import React from "react";

export default function StartDao() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [isMinted, setIsMinted] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [link, setLink] = React.useState("");

  const chainLink = (event: any) => {
    setLink(event.target.value);
  };

  const createMintNft = async () => {
    setIsLoading(true);
    console.log("createMintNft");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      "0x1AED6A8276f611d50ef4b83352D4df5580e727b1",
      CONTRACT_ABI,
      provider.getSigner()
    );
    console.log("Contract", contract);
    console.log("link", link);
    try {
      const mintNft = await contract.safeMint(
        provider.getSigner().getAddress(),
        'https://ipfs.filebase.io/ipfs/QmdDBBsNn3wMWG5uGkj3MypXaQSTFKuANoVxPvWX2wEQsG/QmWuneCtxnC3PxP2rjVdj2YuBLLDLqNYJhF5NHhtNGr1N3'
      );
      setSigned(true);
      console.log("Mint NFT", mintNft);
      const transactionMintNft = await mintNft.wait();
      console.log("Transaction Mint NFT", transactionMintNft);
      setIsLoading(false);
      setSigned(false);
      setIsMinted(true);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
      setSigned(false);
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
              Welcome to OrganiDAO
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
            <Box borderRadius="lg" h={300} w={280} backgroundColor="#2A334A" _hover={{ cursor: "pointer" }} onClick={() => {
              window.open("./mydao/dashboard", "_self");
            }}>
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
              _hover={{ cursor: "pointer" }}
            >
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
                  {!isLoading && !signed && !isMinted && (
                  <ModalBody>
                    <SimpleGrid columns={2} spacing={6}>
                      <Box>
                      <Text pb={2}>Let s get started</Text>
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
                    <Box pt={10}>
                      <Center>
                    <Button colorScheme="blue" mr={3} onClick={createMintNft}>
                      Mint nft
                    </Button>
                    <Button>How to create a link IPFS</Button>  
                    </Center>
                    </Box>
                  </ModalBody>
                  
                    )}
                    {isLoading && !signed && (
                            <Center>
                              <Box>
                                <Text
                                  fontWeight={700}
                                  textAlign="center"
                                  pb={6}
                                  pt={10}
                                >
                                  Waiting your sign
                                </Text>
                                <Spinner
                                  thickness="4px"
                                  speed="0.65s"
                                  emptyColor="gray.200"
                                  color="blue.500"
                                  size="lg"
                                  ml={12}
                                  mb={10}
                                />
                              </Box>
                            </Center>
                          )}
                          {signed && isLoading && (
                            <Center>
                              <Box>
                                <Text
                                  fontWeight={700}
                                  textAlign="center"
                                  pb={6}
                                  pt={10}
                                >
                                  Waiting for the magic
                                </Text>{" "}
                                <Spinner
                                  thickness="4px"
                                  speed="0.65s"
                                  emptyColor="gray.200"
                                  color="blue.500"
                                  size="lg"
                                  ml={12}
                                  mb={10}
                                />
                              </Box>
                            </Center>
                          )}
                          {signed && !isLoading && (
                            <Text>Transaction confirmed</Text>
                          )}
                          {isMinted && !signed && !isLoading && (
                              <Center>
                            <Box mt={5}>
                              <Alert status="success">
                                <AlertIcon />
                                <AlertTitle>You create a new Guild</AlertTitle>
                                
                              </Alert>
                              <Button mt={5} ml={8} onClick={() => {
              window.open("./mydao/dashboard", "_self");
            }}>
                                Go to your Guild
                              </Button>
                            </Box>
                              </Center>
                          )}

                  <ModalFooter pt={10}>
                    
                    
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

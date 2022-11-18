import {
  Box,
  Text,
  Stack,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Select,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import { FiDelete, FiPlusCircle } from "react-icons/fi";
import SidebarWithHeader from "../components/sideBar";
import CONTRACT_ABI from "../abi/contract-abi.json";
import React from "react";
import { ethers } from "ethers";

export default function AddPeople() {
  const [id, setId] = React.useState("");
  const [link, setLink] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [isMinted, setIsMinted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const chainLink = (event: any) => {
    setLink(event.target.value);
  };

  const chainId = (event: any) => {
    setId(event.target.value);
  };

  const leaveDao = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      "0xF22214C26d0A1DaC8f6631ce893ABf423B84D4Be",
      CONTRACT_ABI,
      provider.getSigner()
    );

    try {
      const leave = await contract.burn(id);
      setSigned(true);
      console.log("leave", leave);
      const transactionLeave = await leave.wait();
      console.log("transactionLeave", transactionLeave);
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

  const createMintNft = async () => {
    setIsLoading(true);
    console.log("createMintNft");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      "0xF22214C26d0A1DaC8f6631ce893ABf423B84D4Be",
      CONTRACT_ABI,
      provider.getSigner()
    );
    console.log("Contract", contract);
    console.log("link", link);
    try {
      const mintNft = await contract.safeMint(
        link,
        "https://ipfs.filebase.io/ipfs/QmdDBBsNn3wMWG5uGkj3MypXaQSTFKuANoVxPvWX2wEQsG/QmWuneCtxnC3PxP2rjVdj2YuBLLDLqNYJhF5NHhtNGr1N3"
      );

      setSigned(true);
      console.log("Mint NFT", mintNft);
      const transactionMintNft = await mintNft.wait();
      console.log("Transaction Mint NFT", transactionMintNft);
      setIsLoading(false);
      setSigned(false);
      setIsMinted(true);
      setIsMinted(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      setSigned(false);
      console.log(error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  return (
    <>
      <Box>
        <SidebarWithHeader>
          <Box>
            <Text
              fontSize="2xl"
              align="center"
              textAlign="center"
              fontWeight="700"
            >
              Add more people to your Guild{" "}
            </Text>
            <Text fontSize="md" mx={60} align="center" pt={4}>
						Add people to your community/Dao/Guild, so that they have access to the organization. 
            </Text>
          </Box>
          <Center pt={16}>
            <Stack spacing={7} direction="row">
              <Box
                borderRadius="lg"
                h={240}
                w={280}
                backgroundColor="#2A334A"
                onClick={onOpen}
								_hover={{ cursor: "pointer" }}
              >
                <Center>
                  <Box>
                    <Text fontSize="100" pt={10} pb={5} ml={5}>
                      <FiPlusCircle />
                    </Text>
                    <Text fontSize="lg">Add a new member</Text>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <Center>
                          <Text
                            fontSize="20"
                            fontWeight="600"
                            align="center"
                            py={7}
                          >
                            Add a new member
                          </Text>
                        </Center>
                        <ModalCloseButton />
                        <ModalBody>
                          <Box pb={10}>
                            <Text pb={2}>Choose your community</Text>
                            <Select placeholder="Polygon Guild Santiago">
                              <option value="option1">
                                Polygon Guild Santiago
                              </option>
                            </Select>
                          </Box>

                          {!isLoading && !signed && (
                            <FormControl isRequired>
                              <FormLabel>Address new person</FormLabel>
                              <Input
                                type="text"
                                onChange={chainLink}
                                value={link}
                              />
                            </FormControl>
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
                          {isMinted && (
                            <Box>
                              <Alert status="success">
                                <AlertIcon />
                                <AlertTitle>Transaction confirmed</AlertTitle>
                                <AlertDescription>
                                  You add a new person
                                </AlertDescription>
                              </Alert>
                            </Box>
                          )}
                        </ModalBody>

                        <ModalFooter pt={10}>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={createMintNft}
                          >
                            Mint nft
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                </Center>
              </Box>
              <Box
                borderRadius="lg"
                h={240}
                w={280}
                backgroundColor="#2A334A"
                onClick={onOpen2}
              >
                <Center>
                  <Box>
                    <Text fontSize="100" pt={10} pb={5} ml={3}>
                      <FiDelete />
                    </Text>
                    <Text fontSize="lg">Leave Community</Text>
                    <Modal isOpen={isOpen2} onClose={onClose2}>
                      <ModalOverlay />
                      <ModalContent>
                        <Center>
                          <Text
                            fontSize="20"
                            fontWeight="600"
                            align="center"
                            py={7}
                          ></Text>
                        </Center>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text fontSize="md" fontWeight="600" align="center">
                            Are you sure you want to leave the community?
                          </Text>
                          {!isLoading && !signed && (
                            <Box>
                              <FormControl isRequired pt={10}>
                                <FormLabel>Put your ID</FormLabel>
                                <Input value={id} onChange={chainId} />
                              </FormControl>
                              <Center py={10}>
                                <Box>
                                  <Button
                                    variant="ghost"
                                    mr={3}
                                    onClick={onClose2}
                                  >
                                    No
                                  </Button>
                                  <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={leaveDao}
                                  >
                                    Yes{" "}
                                  </Button>
                                </Box>
                              </Center>
                            </Box>
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
                          {isMinted && !isLoading && !signed &&(
                            <Box>
                              <Alert status="success">
                                <AlertIcon />
                                <AlertTitle>You leave the community, see you soon 👋 </AlertTitle>
                                
                              </Alert>
                            </Box>
                          )}
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                  </Box>
                </Center>
              </Box>
            </Stack>
          </Center>
        </SidebarWithHeader>
      </Box>
    </>
  );
}

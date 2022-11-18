import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FiEdit, FiPlusCircle } from "react-icons/fi";
// import Multistep from "../components/multiStep";
import SidebarWithHeader from "../components/sideBar";
import CONTRACT_ABI from "../abi/contracRandom-abi.json";
import { ethers } from "ethers";
import NextLink from "next/link";

export default function Task() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [signed, setSigned] = React.useState(false);
  const [isMinted, setIsMinted] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    generateRandomLink(), [];
  });
  const linkNft = [
    "https://ipfs.filebase.io/ipfs/QmWmxTVjYQavbUKECZwTSpJiLT14E6tcj6fJNYhpHMh3r7/QmWxiFacp7FkiMRrLXTuCyUiUruug7iUPTuFNtFby1R1a5",
    "https://ipfs.filebase.io/ipfs/QmW2azHyoh81XNty7dLdMe2ppkY3LQyGXU4B5AYai3xfRJ/QmSzeFLSrDyAPXwj7TQ7CAwbf3XaBuMeouaKaX4kGggWPM",
    "https://ipfs.filebase.io/ipfs/QmPN33SusqCvZM9rwy6F4LYu3t6TneKtRwc1fjsYXTdMgz/QmUUZ8byA8C1oabFQx67Qb5R2qV4cG1eNAPKwNrq2cryMu",
    "https://ipfs.filebase.io/ipfs/QmcZeuXKnFwThqSxtT2cPKU5z36iTY4fdzfcp6M2Ef24Zp/QmdyE5kqNPH7BazAbwoUavvqQtZUHEW8EbwusZVFEynzL5",
    "https://ipfs.filebase.io/ipfs/QmTgvdp4wg5qSucNFbgbkJeFGC1K2inoazzZj4G6YMbQTD/Qmeyp7q38sjhEvSsZJD87H7jVWhavToe5DZK57eXmxpabn",
  ];
  const [randomLink, setRandomLink] = React.useState(0);
  const generateRandomLink = () => {
    const random = Math.floor(Math.random() * linkNft.length);
    setRandomLink(random);
    console.log(linkNft[random]);
    return linkNft[random];
    // linkNft.splice(random, 1);
    // console.log(linkNft);
  };
  const taskNft = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      "0xbde975CFA1d7829d846b131495218F30Eb610720",
      CONTRACT_ABI,
      provider.getSigner()
    );
    console.log("Contract", contract);
    try {
      const mintNft = await contract.safeMint(
        provider.getSigner().getAddress(),
        linkNft[randomLink]
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
              fontSize="3xl"
              align="center"
              textAlign="center"
              fontWeight="700"
            >
              Let's create tasks for your community{" "}
            </Text>
            <Text fontSize="md" mx={60} align="center" pt={4}>
              Depending on what you want your DAO people to do, a monthly
              collection of NFTs will be created automatically and randomly
              distributed among your DAO people.
            </Text>
          </Box>
          <Center pt={16}>
            <Stack spacing={7} direction="row">
              <Box
                borderRadius="lg"
                h={240}
                w={280}
                backgroundColor="#2A334A"
                _hover={{ cursor: "pointer" }}
                onClick={onOpen}
              >
                <Center>
                  <Box>
                    <Text fontSize="100" pt={10} pb={5} ml={5}>
                      <FiPlusCircle />
                    </Text>
                    <Text fontSize="lg">Create a new task</Text>
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
                            Create community tasks
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
                            <Box>
                              <Text pb={4} fontWeight="bold" fontSize="lg">
                                Choose the task for your community
                              </Text>
                              <Center>
                                <CheckboxGroup
                                  colorScheme="green"
                                  defaultValue={["naruto", "kakashi"]}
                                >
                                  <Stack direction={["column", "row"]}>
                                    <SimpleGrid columns={2} spacing={5}>
                                      <Checkbox value="naruto">
                                        Face-to-face events
                                      </Checkbox>
                                      <Checkbox value="Online">
                                        Online events
                                      </Checkbox>
                                      <Checkbox value="Twitter">
                                        Twitter space
                                      </Checkbox>
                                      <Checkbox value="Learning">
                                        Learning
                                      </Checkbox>
                                      <Checkbox value="Networking">
                                        Networking event
                                      </Checkbox>
                                      <Checkbox value="Tresory">
                                        Tresory
                                      </Checkbox>
                                      <Checkbox value="Community">
                                        Community Growth
                                      </Checkbox>
                                      <Checkbox value="Marketing">
                                        Marketing
                                      </Checkbox>
                                      <Checkbox value="Partnership">
                                        Partnership
                                      </Checkbox>
                                      <Checkbox value="Free">Free</Checkbox>
                                    </SimpleGrid>
                                  </Stack>
                                </CheckboxGroup>
                              </Center>
                              <Text pt={10} pb={3}>
                                Add another task
                              </Text>
                              <Input></Input>
                              <Center>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  mt={5}
                                  onClick={taskNft}
                                >
                                  Mint nft
                                </Button>
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

                        <ModalFooter pt={10}></ModalFooter>
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
                _hover={{ cursor: "pointer" }}
                onClick={onOpen2}
              >
                <Center>
                  <Box>
                    <Text fontSize="100" pt={10} pb={5}>
                      <FiEdit />
                    </Text>
                    <Text fontSize="lg">Edit Tasks</Text>
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
                            Let's see my task!
                          </Text>
                          {!isLoading && !signed && (
                            <Box>
                              <Center py={10}>
                                <Box>
                                  <Button
                                    variant="ghost"
                                    mr={3}
                                    onClick={onClose2}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    colorScheme="blue"
                                    mr={3}
                                    onClick={taskNft}
                                  >
                                    Mint Task{" "}
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
                          {isMinted && !isLoading && !signed && (
                            <Box>
                              <NextLink href="https://testnets.opensea.io/es/account?tab=collected"  >
                                <Button _hover={{ cursor: "pointer" }}>
                                  Close
                                </Button>
                              </NextLink>
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

// FiPlusCircle

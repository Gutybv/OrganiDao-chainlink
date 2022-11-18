import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sideBar";
import { BigNumber, ethers } from "ethers";
import CONTRACT_ABI from "../abi/contract-abi.json";
import React, { useEffect } from "react";


export default function Dashboard() {
    const [balance, setBalance] = React.useState(0);
    useEffect(() => {
        balanceNft();
    },[])
    const balanceNft = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const contract = new ethers.Contract(
            "0xF22214C26d0A1DaC8f6631ce893ABf423B84D4Be",
            CONTRACT_ABI,
            provider.getSigner()
          );
          console.log("Contract", contract);
            try {
                const balance = await contract.totalSupply(provider.getSigner().getAddress());
                console.log("Balance", balance.toString());
                return setBalance(balance.toString());
            }
            catch (error) {
                console.log(error);
            }
    }
  return (
    <>
      <Box>
        <SidebarWithHeader>
          <Box>
            <Text align="center" textAlign="center" fontSize="xl" fontWeight="bold">Welcome to <br /> Polygon Guild Santiago</Text>
            <SimpleGrid columns={3} spacing={20} pt={10}>
                <Box height='130px'  bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={8} fontWeight="bold">Nº members</Text>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold"> 1  </Text>
                </Box>
                <Box height='130px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={8} fontWeight="bold">Nº Task</Text>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">0</Text>
                </Box>
                <Box height='130px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={8} fontWeight="bold">Nº Task Completed</Text>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">0</Text>
                </Box>
                <Box height='130px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={8} fontWeight="bold"> % Task Complete</Text>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold"> 0%</Text>
                </Box>
                <Box height='130px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={8} fontWeight="bold">Nº of my tasks</Text>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">0</Text>
                </Box>
                <Box height='130px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={8} fontWeight="bold">% of my task completed</Text>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">0%</Text>
                </Box>        
            </SimpleGrid>
            
          </Box>
        </SidebarWithHeader>
      </Box>
    </>
  );
}

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
            "0x1AED6A8276f611d50ef4b83352D4df5580e727b1",
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
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold"> {balance}  </Text>
                </Box>
                <Box height='80px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">Nº Task</Text>
                </Box>
                <Box height='80px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">Nº Task Completed</Text>
                </Box>
                <Box height='80px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold"> % Task Complete</Text>
                </Box>
                <Box height='80px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">Nº of my tasks</Text>
                </Box>
                <Box height='80px' bg='#2A334A'>
                    <Text align="center" fontSize='xl' pt={2} fontWeight="bold">% of my task completed</Text>
                </Box>        
            </SimpleGrid>
            
          </Box>
        </SidebarWithHeader>
      </Box>
    </>
  );
}

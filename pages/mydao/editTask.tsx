import { Box, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sideBar";


export default function EditTask(){
    return (
        <>

            <Box >
                <SidebarWithHeader>
                    <Box>
                        <Text fontSize='2xl' align="center" textAlign='center' fontWeight='700'>Let's create tasks for your community </Text>
                        <Text fontSize='md' mx={60} align="center" pt={4}>Depending on what you want your DAO people to do, a monthly collection of NFTs will be created automatically and randomly distributed among your DAO people.</Text>
                        
                    </Box>


                </SidebarWithHeader>
            </Box>
        
        </>
    )

}
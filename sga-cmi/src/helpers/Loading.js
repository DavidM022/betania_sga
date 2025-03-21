import { Flex } from "@chakra-ui/react";
import { RiseLoader } from "react-spinners";

export function Loading() {
    return (
        <Flex
            w="100%"
            h="75vh"
            alignItems="center"
            justifyContent="center"
        >
            <RiseLoader 
                color="#645CAA"
                loading={true}
                size={40}
                // speedMultiplier={.5}
            />
        </Flex> 
    );
}
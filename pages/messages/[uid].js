import {Flex, Heading} from "@chakra-ui/react";
import MessageBox from "~/components/partial-components/messages/Message-Box";
import SmallFooter from "~/components/partial-components/small-footer";

export default function index() {
  return (
    <>
      <Flex
        overflowY={"-moz-hidden-unscrollable"}
        align="center"
        justify={"center"}
      >
        <Flex
          flex="1 1 76vh"
          direction="column"
          justify="center"
          align="center"
          ml={{base: "2", md: "10"}}
          mr={{base: "2", md: "10"}}
          gap="20px"
        >
          <MessageBox />
        </Flex>
      </Flex>
      <SmallFooter />
    </>
  );
}

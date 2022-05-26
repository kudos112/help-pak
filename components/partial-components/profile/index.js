import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";
import {Avatar, Flex, Heading, HStack, Kbd, Text, Wrap} from "@chakra-ui/react";
import React from "react";
import {HiOutlineLocationMarker} from "react-icons/hi";

export default function Profile({user}) {
  return (
    <Flex m={10} direction="column" gap={10}>
      <Wrap spacing={5}>
        <Avatar />
        <div>
          <Heading color={"customGray"}>{user?.name}</Heading>
          <Kbd>{user?.userType}</Kbd>
        </div>
      </Wrap>
      <HStack fontSize={25} color="customGray">
        <EmailIcon />
        <a href={`mailto:${user?.email}`}>{user?.email}</a>
      </HStack>

      <HStack fontSize={25} color="customGray">
        <PhoneIcon />
        <a href={`tel:${user?.phoneNo}`}>{user?.phoneNo}</a>
      </HStack>
    </Flex>
  );
}

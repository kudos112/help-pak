import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

export const errorNotification = (
  title,
  description,
  position = "bottom-right"
) =>
  toast({
    title: title,
    description: description,
    status: "error",
    duration: 3000,
    isClosable: true,
    position,
  });

export const successNotification = (
  title,
  description,
  position = "bottom-right"
) =>
  toast({
    title: title,
    description: description,
    status: "success",
    duration: 3000,
    position,
    isClosable: true,
  });
export const warningNotification = (
  title,
  description,
  position = "bottom-right"
) =>
  toast({
    title: title,
    description: description,
    status: "warning",
    duration: 3000,
    position,
    isClosable: true,
  });

export const infoNotification = (
  title,
  description,
  position = "bottom-right"
) =>
  toast({
    title: title,
    description: description,
    status: "info",
    duration: 3000,
    position,
    isClosable: true,
  });
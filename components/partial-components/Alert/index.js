const {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton,
} = require("@chakra-ui/react");

function CompExample({type, title, description}) {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({defaultIsOpen: true});

  return (
    <Alert status={type}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}!</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
}

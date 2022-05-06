import {Flex} from "@chakra-ui/react";
import ReactZmage from "~/components/data/react-zmage/react-zmage.component";

const Testing = () => {
  const images = [
    "https://zmage.caldis.me/imgSet/childsDream/5.jpg",
    "https://zmage.caldis.me/imgSet/childsDream/6.jpg",
  ];
  //   return <div>hel</div>;
  return (
    <Flex>
      {" "}
      <ReactZmage images={images} />{" "}
    </Flex>
  );
};

export default Testing;

import {Flex} from "@chakra-ui/react";
// import Zmage from "react-zmage";
import dynamic from "next/dynamic";
// import {useEffect, useState} from "react";

const Zmage = dynamic(import("react-zmage"), {ssr: false});

const ReactZmage = ({image}) => {
  // const [imagesSet, setImagesSet] = useState([]);
  //   const [browsing, setBrowsing] = useState(false);
  // useEffect(() => {
  //   const imagesConfig = images.map((image) => {
  //     return {
  //       src: image,
  //       alt: "image",
  //     };
  //   });
  //   setImagesSet(imagesConfig);
  // }, []);
  return (
    <Flex w={"full"}>
      <Zmage
        // controller={{
        //   close: true,
        //   zoom: true,
        //   download: true,
        //   rotate: true,
        //   flip: true,
        //   pagination: true,
        // }}
        src={image}
        alt={"image"}
        // set={imagesSet}
      />
    </Flex>
  );
};

export default ReactZmage;

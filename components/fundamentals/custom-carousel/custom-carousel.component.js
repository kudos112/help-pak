import Slider from "react-slick";
import {useRef, useState} from "react";
import styles from "./custom-carousel.module.scss";
import ZoomImage from "~/components/common/zoom-image/zoom-image.component";

import {
  AspectRatio,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function ImageCarousel({images}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [image, setImage] = useState("");
  const carousel = useRef();
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    arrows: true,
    customPaging: function (i) {
      return (
        <a>
          <img
            src={images[i].src}
            height="100%"
            width="100%"
            alt={images[i].alt}
          />
        </a>
      );
    },
  };
  return (
    <div className={styles.wrapper}>
      <Slider {...settings} ref={carousel}>
        {images.map((item, index) => (
          <div key={index}>
            {/* <img className={styles.image} src={item.src} alt={item.alt} /> */}
            <AspectRatio maxW="100%" ratio={6 / 2}>
              <Image
                onClick={() => {
                  setImage(item.src);
                  onOpen();
                }}
                src={item.src}
                alt={item.alt}
              />
              {/* <ZoomImage
                key={index}
                src={item.src}
                alt={item.alt}
                objectFit="cover"
              /> */}
            </AspectRatio>
          </div>
        ))}
      </Slider>
      <Modal
        onClose={onClose}
        size={"3xl"}
        isOpen={isOpen}
        allowPinchZoom={true}
        closeOnOverlayClick
        m={9}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Click to zoom</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center color="white">
              <ZoomImage src={image} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

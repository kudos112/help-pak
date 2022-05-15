import {Tooltip} from "@chakra-ui/react";
import React from "react";
import posed from "react-pose";
import styles from "./styles.module.scss";
const Image = posed.img({
  zoomedIn: {
    position: "fixed",
    // height: "100vh",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flip: true,
  },
  zoomedOut: {
    position: "static",
    width: "auto",
    height: "auto",
    flip: true,
  },
});

class ZoomImg extends React.Component {
  state = {isZoomed: false};
  zoomIn() {
    window.addEventListener("scroll", this.zoomOut);
    this.setState({isZoomed: true});
  }

  zoomOut = () => {
    window.removeEventListener("scroll", this.zoomOut);
    this.setState({isZoomed: false});
  };

  render() {
    const Frame = posed.div({
      zoomedIn: {
        applyAtStart: {display: "block"},
        opacity: 1,
      },
      zoomedOut: {
        applyAtEnd: {display: "none"},
        opacity: 0,
      },
    });
    const {imageWidth, imageHeight, ...props} = this.props;
    const {isZoomed} = this.state;
    const pose = isZoomed ? "zoomedIn" : "zoomedOut";
    const transition = {
      duration: 400,
      ease: [0.08, 0.69, 0.2, 0.99],
    };
    return (
      <div
        onClick={() => (this.state.isZoomed ? this.zoomOut() : this.zoomIn())}
        style={{width: imageWidth, height: imageHeight}}
      >
        <Frame pose={pose} transform={transition} className={styles.frame} />
        <Tooltip label="🍳">
          <Image
            className={styles.img}
            pose={pose}
            transform={transition}
            {...props}
          />
        </Tooltip>
      </div>
    );
  }
}

export default ZoomImg;

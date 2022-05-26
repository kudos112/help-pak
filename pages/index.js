import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Text,
  chakra,
  Link,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";
import child from "~/public/images/child.png";
import Image from "next/image";
import {BiDonateHeart} from "react-icons/ai";
import Footer from "~/components/partial-components/footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.textSection}>
          {" "}
          <Heading className={styles.heading}>
            Help someone's <span className={styles.dream}>dream</span> come true{" "}
          </Heading>{" "}
          <p className={styles.subtitle}>
            {" "}
            Giving is not just about making a donation, it’s about making a
            difference
          </p>
          <Button className={styles.button}>Donate Now</Button>{" "}
        </div>
        <Hide breakpoint="(max-width: 1000px)">
          {" "}
          <div className={styles.img}>
            <Image
              src={child}
              width="500"
              height="500"
              objectFit="fill"
              alt="donation.jpg"
            />
          </div>
        </Hide>
      </div>
      {/* <div className={styles.sponsors}>
        <Image
          src="https://edhi.org/wp-content/uploads/2017/11/logo.png"
          width={200}
          height={80}
        />
        <Image
          src="https://alkhidmat.org/assets/img/AKFP_Mobile_Logo.png"
          width={200}
          height={80}
        />
        <Image
          src="https://www.fauji.org.pk/assets/img/logos/front-logo.png"
          width={200}
          height={80}
        />
        {/* <Image
          src="http://darulsukun.com/wp-content/uploads/2020/03/logo-2-1-1.png"
          width={100}
          height={80}
        /> *
      </div> */}
      <div className={styles.heaven} p="5%">
        <div className={styles.heavenMain}>
          <p className={styles.heavenHeading}>
            EVERY
            <span className={styles.green}> CHARITABLE </span> ACT IS A STEPPING
            STONE TOWARDS <span className={styles.green}>HEAVEN.</span>
          </p>
          <div>
            <img
              className={styles.heavenImg1}
              src="https://www.northeastern.edu/graduate/blog/wp-content/uploads/2020/01/Global-Health-Hero.jpg"
            />
            <div className={styles.heavenImages}>
              <img
                className={styles.heavenImg2}
                src="https://cdn.givind.org/static/images/categorypage/v3/mobile/mobile-education.jpg"
              />
              <img
                className={styles.heavenImg3}
                src="https://www.healthyway.com/wp-content/uploads/2021/07/brett-jordan-erLrY4aKztg-unsplash-1200x900.jpg"
              />
            </div>
          </div>
        </div>
        <img className={styles.payment} src="payment.png" />
      </div>
      <div className={styles.itemDonation}>
        <p className={styles.idheading}>
          <span className={styles.green}>Donate</span> if you don’t need it.
        </p>
        <div className={styles.idimages}>
          <div className={styles.idsec1}>
            <div>
              <p className={styles.idheading2}>
                <span className={styles.d}>D</span>onate it{" "}
              </p>
              <p className={styles.idheading3}>Don't Dump it </p>
            </div>
            <img className={styles.img1} src="donation2.png" />
          </div>

          <img className={styles.img2} src="donation.png" />
        </div>
      </div>
      <div className={styles.medicalCamps}>
        <p className={styles.mcheading}>Medical Camps</p>
        <img className={styles.mcimg} src="medicalcamp.png" />
        <div className={styles.medicalCampBottom}>
          <Link href="/medical-camp/request">
            <Text
              color="customGray"
              decoration={"underline"}
              _hover={{color: "blue.600"}}
            >
              <b>Organize Medical Camps here</b>
            </Text>
          </Link>
          <Link href="/medical-camp">
            <Text
              color="customGray"
              decoration={"underline"}
              _hover={{color: "blue.600"}}
            >
              <b>Upcoming Medical Camps</b>
            </Text>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

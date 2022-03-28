import { Box, Button, Heading } from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";
import child from "~/public/images/child.png";
import Image from "next/image";
import { BiDonateHeart } from "react-icons/ai";

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
            Giving is not just about make a donation, it’s about making a
            difference
          </p>
          <Button className={styles.button}>Donate Now</Button>{" "}
        </div>
        <div className={styles.img}>
          <Image src={child} width={500} height={500} alt="donation.jpg" />
        </div>
      </div>
      <div className={styles.sponsors}>
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
        /> */}
      </div>
    </div>
  );
}

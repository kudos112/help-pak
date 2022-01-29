import CustomInput from "../../components/custom-input/custom-input";
import CustomButton from "../../components/custom-button/custom-button";
import { Divider } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "../../public/donation.jpg";
import Colors from "../../public/colors";
import styles from "./styles.module.scss";

export default function Login() {
  return (
    <div className={styles.page} style={{ height: "90vh" }}>
      <div className={styles.img}>
        <Image src={donation} width={1100} height={660} alt="donation.jpg" />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.heading}>
          <span className={styles.gray}>Welcome</span>
          <span className={styles.green}>Back</span>
        </div>
        <div className={styles.inputContent}>
          <div className={styles.fields}>
            <CustomInput
              title="Enter Your Email"
              placeholder="email"
              type="email"
              name="email"
            />
            <CustomInput
              title="Enter Your password"
              placeholder="password"
              name="password"
              type="password"
            />
            <CustomButton title="Lets Help Pakistan" />

            <Divider className="mt-7" />

            <Link href="/registration/forgot-password" passHref>
              <a className={styles.forgotPassword}>forgot password?</a>
            </Link>

            <span>
              {"don't have account?"}
              <Link href="/registration/signup" passHref>
                <a className={styles.signup}>Create Now</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import CustomInput from "../../components/custom-input/custom-input.component";
import styles from "./styles.module.scss";
import { Divider } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "../../public/donation.jpg";
import CustomButton from "../../components/custom-button/custom-button.component";

export default function Login() {
  return (
    <div className={styles.page} style={{ height: "90vh" }}>
      <div className={styles.img}>
        <Image src={donation} width={1100} height={660} alt="donation.jpg" />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.heading}>
          <span className={styles.gray}>Forgot</span>
          <span className={styles.green}>Password</span>
        </div>
        <div className={styles.inputContent}>
          <div className={styles.fields}>
            <CustomInput title="Enter Your Email" placeholder="email" />
            <CustomButton
              onClick={() => alert("logged in")}
              title="Reset Your Password"
            />

            <Divider className="mt-7" />

            <div className={styles.footer}>
              <span style={{ color: "#6b7280" }}>
                Go to
                <Link href="/authentication/login" passHref>
                  <a style={{ color: "#15803d", marginLeft: "0.5rem" }}>
                    Login Page
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

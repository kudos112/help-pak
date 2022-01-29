import CustomInput from "../../components/custom-input/custom-input";
import CustomButton from "../../components/custom-button/custom-button";
import { Divider, Select } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "../../public/donation.jpg";
import Colors from "../../public/colors";
import styles from "./styles.module.scss";

export default function SignUp() {
  return (
    <div className={styles.page} style={{ height: "90vh" }}>
      <div className={styles.img}>
        <Image src={donation} width={1100} height={660} alt="donation.jpg" />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.heading}>
          <span className={styles.gray}>Register</span>
          <span className={styles.green}>Yourself</span>
        </div>
        <div className={styles.inputContent}>
          <div className={styles.fields}>
            <div style={{ width: "100%" }}>
              <p className={styles.title}>Choose your type</p>
              <Select
                className="mt-1"
                focusBorderColor={Colors.darkGreen}
                iconColor={Colors.gray}
                backgroundColor="#E5E7EB"
                placeholder="Select option"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>

            <CustomInput
              title="Enter Your Name"
              placeholder="name"
              type="name"
              name="name"
            />

            <CustomInput
              title="Attach Front Side of CNIC"
              placeholder="Click here to link"
            />
            <CustomInput
              title="Enter Your PhoneNo"
              placeholder="phone number"
            />
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
            <CustomButton
              onClick={() => alert("logged in")}
              title="Create Account"
            />
            <Divider className="mt-3" />

            <span style={{ color: "#6b7280" }}>
              Already have account? Go to
              <Link href="/registration/login" passHref>
                <a style={{ color: "#15803d", marginLeft: "0.5rem" }}>
                  Login Page
                </a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

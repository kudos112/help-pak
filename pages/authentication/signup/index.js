import CustomInput from "../../../components/custom-input/custom-input.component";
import CustomButton from "../../../components/custom-button/custom-button.component";
import { Divider, Select } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "@/public/donation.jpg";
import Colors from "@/public/colors";
import styles from "./signup.module.scss";
import { useState } from "react";
import { register } from "@/redux/auth/auth.actions";
import { useDispatch } from "react-redux";
import FileUploader from "~/components/custom-fileuploader/file-upload.component";
import {
  errorNotification,
  infoNotification,
  successNotification,
  warningNotification,
} from "~/components/notification/notification";
import UserSignUp from "~/components/partial-components/user-signup/user-signup.component";
import NgoSignUp from "~/components/partial-components/ngo-signup/ngo-signup.component";

export default function SignUp() {
  const [userType, setUserType] = useState("INDIVIDUAL");

  return (
    <div className={styles.page} style={{ height: "90vh" }}>
      <div className={styles.pageContent}>
        <div className={styles.heading}>
          <span className={styles.gray}>Register</span>
          <span className={styles.green}>Yourself</span>
        </div>
        <div className={styles.inputContent}>
          <div className={styles.fields}>
            <div style={{ width: "100%", marginBottom: 10 }}>
              <p className={styles.title}>Choose your type</p>
              <Select
                className="mt-1"
                focusBorderColor={Colors.darkGreen}
                iconColor={Colors.gray}
                backgroundColor="#E5E7EB"
                value={userType}
                placeholder="Select option"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="NGO">NGO</option>
                <option value="INDIVIDUAL">Individual</option>
              </Select>
            </div>

            {userType === "NGO" ? (
              <NgoSignUp userType={userType} />
            ) : (
              <UserSignUp userType={userType} />
            )}
            <Divider color={"gray"} />

            <div className={styles.footer}>
              <span style={{ color: "#6b7280" }}>
                Already have account? Go to
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

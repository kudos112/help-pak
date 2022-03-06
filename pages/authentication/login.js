import CustomInput from "@/components/custom-input/custom-input.component";
import CustomButton from "@/components/custom-button/custom-button.component";
import {
  Divider,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "@/public/donation.jpg";
import styles from "./styles.module.scss";
import { loginRequest } from "~/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Colors from "~/public/colors";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    userType: "INDIVIDUAL",
    email: "quddoux112@gmail.com",
    password: "helpak@test123",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginRequest(data, handleLoading));
  };

  return (
    <div className={styles.page} style={{ height: "90vh" }}>
      <div className={styles.img}>
        <Image src={donation} width={1100} height={660} alt="donation.jpg" />
      </div>
      <div className={styles.pageContent}>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="lightGreen"
              color="green"
              size="xl"
            />
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              <span className={styles.gray}>Welcome</span>
              <span className={styles.green}>Back</span>
            </div>
            <div className={styles.inputContent}>
              <div className={styles.fields}>
                <form
                  style={{ width: "100%" }}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div style={{ width: "100%", marginBottom: 10 }}>
                    <p className={styles.title}>Choose your type</p>
                    <Select
                      className="mt-1"
                      focusBorderColor={Colors.darkGreen}
                      iconColor={Colors.gray}
                      backgroundColor="#E5E7EB"
                      value={data.userType}
                      placeholder="Select option"
                      onChange={(e) => handleData("userType", e.target.value)}
                    >
                      <option value="NGO">NGO</option>
                      <option value="INDIVIDUAL">Individual</option>
                    </Select>
                  </div>
                  <CustomInput
                    title="Enter Your Email"
                    placeholder="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => handleData("email", e.target.value)}
                    required
                  />
                  <CustomInput
                    title="Enter Your password"
                    placeholder="password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => handleData("password", e.target.value)}
                    required
                  />
                  <CustomButton title="Lets Help Pakistan" type="submit" />
                </form>

                <Divider className="mt-7" />

                <div className={styles.footer}>
                  <Link href="/authentication/forgot-password" passHref>
                    <a className={styles.forgotPassword}>forgot password?</a>
                  </Link>

                  <span>
                    {"don't have account?"}
                    <Link href="/authentication/signup" passHref>
                      <a className={styles.signup}>Create Now</a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import CustomInput from "@/components/custom-input/custom-input.component";
import CustomButton from "@/components/custom-button/custom-button.component";
import { Divider, FormControl, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "@/public/donation.jpg";
import styles from "./styles.module.scss";
import { signInStart } from "~/redux/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInStart(data));
  };

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
            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              <CustomInput
                title="Enter Your Email"
                placeholder="email"
                type="email"
                name="email"
                onChange={(e) => handleData("email", e.target.value)}
                required
              />
              <CustomInput
                title="Enter Your password"
                placeholder="password"
                name="password"
                type="password"
                onChange={(e) => handleData("password", e.target.value)}
                required
              />
              <CustomButton title="Lets Help Pakistan" type="submit" />
            </form>

            <Divider className="mt-7" />

            <div className={styles.footer}>
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
    </div>
  );
}

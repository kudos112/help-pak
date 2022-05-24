import CustomButton from "@/components/fundamentals/custom-button/custom-button.component";
import donation from "@/public/donation.jpg";
import {Divider, Spinner} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {useDispatch} from "react-redux";
import CustomInput from "~/components/fundamentals/custom-input/custom-input.component";
import {loginRequest} from "~/redux/auth/auth.actions";
import styles from "./styles.module.scss";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    // userType: "INDIVIDUAL",
    email: "",
    password: "",
  });

  const handleData = (key, value) => {
    setData({...data, [key]: value});
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
    <div className={styles.page} style={{height: "90vh"}}>
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
                <form style={{width: "100%"}} onSubmit={(e) => handleSubmit(e)}>
                  <CustomInput
                    title="Enter Your Email"
                    placeholder="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => handleData("email", e.target.value)}
                    required
                    id="loginemail"
                  />
                  <CustomInput
                    title="Enter Your password"
                    placeholder="password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => handleData("password", e.target.value)}
                    required
                    id="loginpassword"
                  />
                  <CustomButton title="Lets Help Pakistan" type="submit" />
                </form>

                <Divider />

                <div className={styles.footer}>
                  <Link href="/account/forgot-password" passHref>
                    <a className={styles.forgotPassword}>forgot password?</a>
                  </Link>

                  <span>
                    {"don't have account?"}
                    <Link href="/account/signup" passHref>
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

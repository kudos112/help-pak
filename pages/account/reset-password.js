import CustomInput from "../../components/custom-input/custom-input.component";
import styles from "./styles.module.scss";
import { Divider, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import donation from "../../public/donation.jpg";
import CustomButton from "../../components/custom-button/custom-button.component";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { errorNotification } from "~/components/notification/notification";
import { resetPasswordRequests } from "~/redux/auth/auth.actions";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    if (data.password !== data.confirmPassword) {
      errorNotification("Error", "Your passwords do not match");
      return;
    }
    e.preventDefault();
    setLoading(true);
    const payload = {
      password: data.password,
    };
    dispatch(resetPasswordRequests(payload, handleLoading));
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
              <span className={styles.gray}>Reset</span>
              <span className={styles.green}>Password</span>
            </div>
            <div className={styles.inputContent}>
              <div className={styles.fields}>
                <form
                  style={{ width: "100%" }}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <CustomInput
                    title="Enter New Password"
                    placeholder="password"
                    type="password"
                    name="password"
                    required
                    value={data.password}
                    onChange={(e) => handleData("password", e.target.value)}
                  />
                  <CustomInput
                    title="Confirm Password"
                    placeholder="confirm password"
                    type="password"
                    name="password"
                    required
                    value={data.confirmPassword}
                    onChange={(e) =>
                      handleData("confirmPassword", e.target.value)
                    }
                  />
                  <CustomButton type="submit" title="Reset Your Password" />
                </form>

                <Divider className="mt-7" />

                <div className={styles.footer}>
                  <span style={{ color: "#6b7280" }}>
                    Go to
                    <Link href="/account/login" passHref>
                      <a style={{ color: "#15803d", marginLeft: "0.5rem" }}>
                        Login Page
                      </a>
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

import Login from "@/pages/login";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";
import Heading from "@/pages/component/heading";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AdminLogin(){

    const router = useRouter();

    const [userNameError, setUserNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [data, setData] = useState({
        username: "",
        password: ""
    });


    async function handleLogin(){
        if(data.username.length === 0 || data.password.length === 0) {
            if(data.username.length === 0){
                setUserNameError("Username must not be empty");
            }
            if(data.password.length === 0){
                setPasswordError("Password must not be empty");
            }
            return;
        }
        try{
            const result = await axios.post("http://localhost:8080/admin/login", data)
            localStorage.setItem("token", JSON.stringify(result.data))
            router.push("/admin")
            console.log(result)
        }catch (e){
            confirmAlert({
                title: "Login failed",
                message: e.response.data.message,
                buttons: [
                    {
                        label: 'Try again',
                        onClick: () => {
                            router.reload()}
                    },
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            })
        }
    }

    function handleChangeUserName(e) {
        if (e.target.value.length === 0) {
            setUserNameError("Username must not be empty");
        } else {
            setUserNameError(null);
        }
        setData({ ...data, username: e.target.value });
    }

    function handleChangePassword(e) {
        if (e.target.value.length === 0) {
            setPasswordError("Password must not be empty");
        } else {
            setPasswordError(null);
        }
        setData({ ...data, password: e.target.value });
    }

    return(
        <>
            <Heading isAdmin={true}/>
            <div className={styles.main}>
                <div className={styles.layoutLogin}>
                    <div className={styles.formLogin}>
                        <div className={styles.headLogin}>
                            <h1>Welcome</h1>
                        </div>
                        {/* Input form */}
                        <div className="form-input">
                            <div className={styles.form}>
                                <div className={styles.label} id="username">
                                    Username
                                </div>
                                {userNameError&&<div className={styles.error}>{userNameError}</div>}

                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="username"
                                    onChange={handleChangeUserName}
                                />
                                <br />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.label} id="password">
                                    Password
                                </div>
                                {passwordError&&<div className={styles.error}>{passwordError}</div>}

                                <input
                                    className={styles.input}
                                    type="password"
                                    placeholder="password"
                                    onChange={handleChangePassword}
                                />
                                <br />
                            </div>
                        </div>
                    </div>
                    <button className={styles.button} onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    )
}
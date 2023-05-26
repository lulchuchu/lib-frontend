import { useEffect, useState } from "react";
import Link from "next/link";
import{ useRouter } from "next/router";
import Heading from "../component/heading";
import styles from "@/styles/login.module.css"
import axios from "axios";

export default function login(){

    const router = useRouter();
    const [data, setData] = useState({
        username: "",
        password: ""
    });


    async function handleLogin(){
        const result = await axios.post("http://localhost:8080/login", data)
        localStorage.setItem("token", JSON.stringify(result.data))
        router.push("/")
        console.log(result)
    }
    return (
        <>
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
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="username"
                                    onChange={(e) =>
                                        setData({ ...data, username: e.target.value })
                                    }
                                />
                                <br />
                            </div>
                            <div className={styles.form}>
                                <div className={styles.label} id="password">
                                    Password
                                </div>
                                <input
                                    className={styles.input}
                                    type="password"
                                    placeholder="password"
                                    onChange={(e) =>
                                        setData({ ...data, password: e.target.value })
                                    }
                                />
                                <br />
                            </div>
                        </div>
                    </div>
                    <button className={styles.button} onClick={handleLogin}>Login</button>

                    <div className={styles.or}>or</div>
                    
                    <Link href = "/register">
                        <button className={styles.button}>New? Register now</button>
                    
                    </Link>

                </div>
            </div>
        </>
    )
}
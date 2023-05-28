import Login from "@/pages/login";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";
import Heading from "@/pages/component/heading";

export default function AdminLogin(){
    const router = useRouter();
    const [data, setData] = useState({
        username: "",
        password: ""
    });


    async function handleLogin(){
        const result = await axios.post("http://localhost:8080/login", data)
        localStorage.setItem("token", JSON.stringify(result.data))
        router.push("/admin")
        console.log(result)
    }

    return(
        <>
            <Heading/>
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
                </div>
            </div>
        </>
    )
}
import { useState } from "react";
import styles from "@/styles/register.module.css";import Router, { useRouter } from "next/router";
import axios from "axios";
import Heading from "@/pages/component/heading";


export default function register(){

    const router = useRouter();

    const [data,  setData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: ""
    })

    async function sendInput(){

        const result = await axios.post("http://localhost:8080/register", data)
        console.log(result)
        router.push("/login")
    }

    return (
        <>
            <Heading />
            <h1 style={{ textAlign: "center" }}>
                Register
            </h1>
            <div className={styles.mainRegister}>
                <div className="main-login">
                    <form className="form-input">
                        <div className={styles.label}>
                            <div id="email">Email</div>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            <div id="username">Username</div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            <div id="password">Password</div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            {" "}
                            <div id="name">Name</div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            {" "}
                            <div id="name">Phone number</div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                            />
                            <br />
                        </div>
                    </form>
                    <button onClick={sendInput} className={styles.button}>Register</button>
                </div>
            </div>
        
        </>
    )
}
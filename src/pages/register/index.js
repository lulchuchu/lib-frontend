import { useState } from "react";
import styles from "@/styles/register.module.css";import Router, { useRouter } from "next/router";
import axios from "axios";
import Heading from "@/pages/component/heading";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function register(){

    const [emailError, setEmailError] = useState(null);
    const [userNameError, setUserNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [addressError, setAddressError] = useState(null);

    const router = useRouter();

    const [data,  setData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        address: "",
    })

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
        return /^0\d{9}$/.test(phoneNumber);
    }

    async function sendInput(){
        if(data.name.length === 0 || data.username.length === 0 || data.password.length === 0 || data.email.length === 0 || data.phoneNumber.length === 0 || data.address.length === 0){
            if(data.name.length === 0){

            setNameError("Name must not be empty");
            }

            if(data.username.length === 0){
                setUserNameError("Username must not be empty");
                // return;
            }
            if(data.password.length === 0){
                setPasswordError("Password must not be empty");
                // return;
            }
            if(data.email.length === 0){
                setEmailError("Email must not be empty");
                // return;
            }
            if(data.phoneNumber.length < 10){
                setPhoneNumberError("Phone number must be at least 10 characters");
                // return;
            }
            if(data.address.length < 6){
                setAddressError("Address must be at least 6 characters");
                // return;
            }
            return;
        }

        try{
            const result = await axios.post("http://localhost:8080/register", data)
            console.log(result)
            router.push("/login")
        }catch (e){
            confirmAlert({
                title: "Register failed",
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
            });
        }
    }

    function handleChangeEmail(e) {
        if (!isValidEmail(e.target.value)) {
            setEmailError("Invalid email");
        }
        else {
            setEmailError(null);
        }
        setData({ ...data, email: e.target.value })
    }

    function handleChangeUserName(e) {
        if (e.target.value.length === 0) {
            setUserNameError("Username must not be empty");
        }else{
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

    function handleChangeName(e) {
        if (e.target.value.length ===0) {
            setNameError(" Name must not be empty");
        }else{
            setNameError(null);
        }
        setData({ ...data, name: e.target.value });
    }

    function handleChangePhoneNumber(e) {
        if (!isValidPhoneNumber(e.target.value)) {
            setPhoneNumberError("Phone number must be at least 10 characters, contains only digits and begin with 0");
        }else{
            setPhoneNumberError(null);
        }
        setData({ ...data, phoneNumber: e.target.value });
    }

    function handleChangeAddress(e) {
        if(e.target.value.length ===0){
            setAddressError("Address must not be empty");
        }else{
            setAddressError(null);
        }
        setData({ ...data, address: e.target.value });
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
                            <div id="email" className={styles.title}>Email</div>
                            {emailError && <div className={styles.error}>{emailError}</div>}
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={handleChangeEmail}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            <div id="username">Username</div>
                            {userNameError && <div className={styles.error}>{userNameError}</div>}
                            <input
                                type="text"
                                id="username"
                                name="username"
                                onChange={handleChangeUserName}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            <div id="password">Password</div>
                            {passwordError && <div className={styles.error}>{passwordError}</div>}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChangePassword}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            {" "}
                            <div id="name">Name</div>
                            {nameError && <div className={styles.error}>{nameError}</div>}
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChangeName}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            {" "}
                            <div id="name">Phone number</div>
                            {phoneNumberError && <div className={styles.error}>{phoneNumberError}</div>}
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChangePhoneNumber}
                            />
                            <br />
                        </div>
                        <div className={styles.label}>
                            {" "}
                            <div id="name">Address</div>
                            {addressError && <div className={styles.error}>{addressError}</div>}
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChangeAddress}
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
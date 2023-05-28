import { useState, useEffect } from "react";

import styles from "@/styles/heading.module.css";

import axios from "axios";
import {
    AiOutlineShoppingCart,
    AiOutlineLogin,
    AiOutlineSearch,
} from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Heading({isAdmin}) {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [optionUserShowing, setOptionUserShowing] = useState(false);
    const [cartShowing, setCartShowing] = useState(false);
    const [bookInCart, setBookInCart] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem("token")));
    }, []);


    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
        <>
            <div className={styles.heading}>
                <Link href="/">
                    <img
                        src="House_Targaryen.png"
                        alt=""
                        className={styles.homeIcon}
                    />
                </Link>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        className={styles.input}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className={styles.searchButton}
                        onClick={
                        () => {
                            console.log("searchText: " + searchText)

                            router.push("/search?keyword=" + searchText)
                        }}

                    >
                        {/*<Link href={{pathname: `/search`, query: {keyword: searchText}}}>*/}
                            <AiOutlineSearch
                                size={20}
                                className={styles.searchIcon}
                            />
                        {/*</Link>*/}

                    </button>
                </div>
                <div className={styles.right}>
                    {!isAdmin && token && <div className={styles.icon}>
                        <Link href={"/cart/"} className={styles.icon}>
                            <AiOutlineShoppingCart
                                size={40}
                            />
                        </Link>
                    </div>}
                    {token ? (
                        <div
                            className={styles.name}
                            onMouseEnter={() => setOptionUserShowing(true)}
                            onMouseLeave={() => setOptionUserShowing(false)}
                        >
                            {token.name}
                            {optionUserShowing && (
                                <div className={styles.optionUser}>
                                    <Link
                                        href={"/bought"}
                                        className={styles.option}
                                    >
                                        <div> My Bought</div>
                                    </Link>
                                    <div
                                        className={styles.option}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <div className={styles.icon}>
                                <AiOutlineLogin size={40} />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

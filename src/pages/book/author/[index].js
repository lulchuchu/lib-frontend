import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/book.module.css";
import Home from "@/pages";

export default function AuthorBook() {

    const router = useRouter();
    const { index } = router.query;

    return (
        <>
            {index && <Home categoryId={null} authorId={index} />}
        </>
    )
}
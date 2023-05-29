import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/book.module.css";
import Home from "@/pages";
import Heading from "@/pages/component/heading";

export default function CategoryBook() {

    const router = useRouter();
    const { index } = router.query;

    return (
        <>
            <Home categoryId={index} authorId={null} />
        </>
    )
}
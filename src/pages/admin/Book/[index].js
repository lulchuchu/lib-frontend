import {useEffect, useState} from "react";
import {useRouter} from "next/router";


export default function AdminBook(){

    const router = useRouter();
    const { index } = router.query;


    const [token, setToken] = useState("");
    const [book, setBook] = useState({});

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);
    },[]);

    useEffect(() => {
        if (index !== undefined) {
            const fetchBook = async () => {
                const result = await axios.get(
                    "http://localhost:8080/api/book/details",
                    {
                        params: { bookId: index },
                    }
                );
                console.log(result.data);
                setBook(result.data);
            };
            fetchBook();
        }
    }, [index]);

    return (
        <>

        </>
    )


}
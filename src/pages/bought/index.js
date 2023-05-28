import {useEffect, useState} from "react";
import styles from "@/styles/cart.module.css";
import Item from "@/pages/cart/Item";
import Quantity from "@/pages/component/Quantity";
import axios from "axios";
import {useRouter} from "next/router";
import Heading from "@/pages/component/heading";


export default function MyBought(){

    const [paidBill, setPaidBill] = useState([]);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);

    }, []);

    useEffect(() => {
        if (token) {
            const fetch = async () => {
                const result = await axios.get("http://localhost:8080/api/bill/all", {headers: {Authorization: "Bearer " + token.accessToken}})
                console.log("result", result.data)
                setPaidBill(result.data);
            }
            fetch();
        }
    }, [token])

    async function handleDelete(billId) {
        const result = await axios.post("http://localhost:8080/api/bill/removefromcart",{}, {
            headers: {Authorization: "Bearer " + token.accessToken},
            params: {billId: billId}
        })

        console.log("result", result.data)
        router.reload();

    }

    return (<div className={styles.cartLayout}>
        <Heading />
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
            crossOrigin="anonymous"
        />
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Book Info</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {paidBill.map((bill) =>
                <tr key={bill.bookId} className={styles.item}>
                    <td className={styles.info} onClick={() => router.push("/book/" + bill.bookId)}>
                        <img src={"http://localhost:8080/api/file/getImage?path=" + bill.bookCover}
                             alt=""
                             className={styles.cover}/>
                        <div>
                            <div className={styles.title}>{bill.bookTitle}</div>
                            <div className={styles.author}>{bill.bookAuthor}</div>
                        </div>
                    </td>
                    <td>{bill.bookPrice} $</td>
                    <td>{bill.quantity}</td>
                    <td>{bill.total} $</td>
                    <td>
                        <button className={styles.button} onClick={() => handleDelete(bill.id)}>Cancel</button>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    </div>)
}
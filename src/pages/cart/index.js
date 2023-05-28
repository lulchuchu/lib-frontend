import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/cart.module.css";
import Item from "@/pages/cart/Item";
import Heading from "@/pages/component/heading";

export default function Cart() {

    const [token, setToken] = useState(null)
    const [bookInCart, setBookInCart] = useState([])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);

    }, []);

    useEffect(() => {
        if (token) {
            const fetch = async () => {

                const result = await axios.get("http://localhost:8080/api/bill/cart", {headers: {Authorization: "Bearer " + token.accessToken}})
                console.log("result", result.data)
                setBookInCart(result.data);
            }
            fetch();
        }
    }, [token])

    return (<div className={styles.cartLayout}>
        <Heading/>
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
            {bookInCart.map((book) =>
                <Item token = {token} bill= {book} />
            )}
            </tbody>
        </table>
    </div>)
}
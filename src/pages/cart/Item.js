import {useState} from "react";
import styles from "@/styles/cart.module.css";
import Quantity from "@/pages/component/Quantity";
import {useRouter} from "next/router";

export default function Item({book}) {
    const [quantity, setQuantity] = useState(book.quantity);
    const router = useRouter();

    function handleCheckout() {

    }

    function handleDelete() {

    }

    return (

        <tr key={book.bookId} className={styles.item}>
            <td className={styles.info} onClick={() => router.push("/book/" + book.bookId)}>
                <img src={"http://localhost:8080/api/file/getImage?path=" + book.bookCover}
                     alt=""
                     className={styles.cover}/>
                <div>
                    <div className={styles.title}>{book.bookTitle}</div>
                    <div className={styles.author}>{book.bookAuthor}</div>
                </div>
            </td>
            <td>{book.bookPrice} $</td>
            <td><Quantity quan={quantity} change={setQuantity} style={{textAlign: "left"}}/></td>
            <td>{(book.bookPrice * quantity).toFixed(2)} $</td>
            <td>
                <button className={styles.button} onClick={handleCheckout}>Checkout</button>
                <button className={styles.button} onClick={handleDelete}>Delete</button>
            </td>
        </tr>)
}
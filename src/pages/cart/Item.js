import {useState} from "react";
import styles from "@/styles/cart.module.css";
import Quantity from "@/pages/component/Quantity";
import {useRouter} from "next/router";
import axios from "axios";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Item({token, bill}) {

    const [quantity, setQuantity] = useState(bill.quantity);
    const router = useRouter();

    async function handleQuantityChange() {
        const result = await axios.post("http://localhost:8080/api/bill/changeQuantity", {}, {
            headers: {Authorization: "Bearer " + token.accessToken},
            params: {billId: bill.id, quantity: quantity}
        })
        console.log("result", result.data)
    }

    async function handleCheckout() {
        try{
            const changeQuantity = await handleQuantityChange();
            const result = await axios.post("http://localhost:8080/api/bill/pay?billId=" + bill.id,{}, {headers: {Authorization: "Bearer " + token.accessToken}})
            console.log("result", result.data)
            router.reload();
        }catch (e){
            confirmAlert({
                title: "Checkout failed",
                message: e.response.data.message,
                buttons: [
                    {
                        label: 'Ok',
                        onClick: async () => {}
                    },
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            })
        }
    }

    async function handleDelete() {
        const result = await axios.post("http://localhost:8080/api/bill/removefromcart",{}, {
            headers: {Authorization: "Bearer " + token.accessToken},
            params: {billId: bill.id}
        })

        console.log("result", result.data)
        router.reload();

    }



    console.log("quantity", quantity)

    return (

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
            <td><Quantity quan={quantity} change={setQuantity} style={{textAlign: "left"}}/></td>
            <td>{(bill.bookPrice * quantity).toFixed(2)} $</td>
            <td>
                <button className={styles.button} onClick={handleCheckout}>Checkout</button>
                <button className={styles.button} onClick={handleDelete}>Delete</button>
            </td>
        </tr>)
}
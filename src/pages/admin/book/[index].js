import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Heading from "@/pages/component/heading";
import styles from '@/styles/admin.module.css'
import axios from "axios";


export default function AdminBook() {
    const img_url = "http://localhost:8080/api/file/getImage?path=";
    const router = useRouter();
    const {index} = router.query;


    const [token, setToken] = useState("");
    const [book, setBook] = useState({});
    const [isView, setIsView] = useState(true)
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);
    }, []);

    useEffect(() => {
        if (index !== undefined) {
            const fetchBook = async () => {
                const result = await axios.get(
                    "http://localhost:8080/api/book/details",
                    {
                        params: {bookId: index},
                    }
                );
                console.log("result", result.data);
                setBook(result.data);
            };
            fetchBook();
        }
    }, [index]);

    function handleUpload() {

    }

    function handleAdd() {

    }

    function handleEdit() {
        setIsEdit(true);
        setIsView(false);
    }

    function handleSave() {
        setIsView(true);
        setIsEdit(false);
        router.reload()
    }

    return (
        <>
            <Heading/>
            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.info}>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Title</div>
                                <input type="text" className={styles.input} value={book.title} disabled={isView}/>
                            </div>
                            <div className={styles.bookInfo}>
                                <div>Author</div>
                                <input type="text" className={styles.input} value={book.author?.name} disabled={isView}/>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <div>Description</div>
                            <textarea className={styles.inputDescription} value={book.description} disabled={isView}/>
                        </div>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Release date</div>
                                <input type="date" className={styles.input} value={book.releaseDate} disabled={isView}/>
                            </div>
                            <div className={styles.bookInfo}>
                                <div>Pages</div>
                                <input type="text" className={styles.input} value={book.pages} disabled={isView}/>
                            </div>
                        </div>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>

                                {/*<input type="text" className={styles.input} value={book.category}/>*/}
                            </div>
                            <div className={styles.bookInfo}>
                                <div>Price</div>
                                <input type="text" className={styles.input} value={book.price} disabled={isView}/>
                            </div>
                        </div>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Quantity</div>
                                <input type="text" className={styles.input} value={book.quantity} disabled={isView}/>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div>
                            <button className={styles.button} onClick={handleUpload}>Upload</button>

                        </div>
                        <img src={img_url + book.cover} className={styles.bookCover} alt="book cover"/>
                    </div>
                </div>
            </div>
            <div className={styles.buttonLst}>
                {isAdd && <button className={styles.button} onClick={handleAdd}>Add</button>}
                {isView && <button className={styles.button} onClick={handleEdit}>Edit</button>}
                {isEdit && <button className={styles.button} onClick={handleSave}>Save</button>}
            </div>
        </>
    )


}
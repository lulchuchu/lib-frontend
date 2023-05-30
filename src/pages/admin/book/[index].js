import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Heading from "@/pages/component/heading";
import styles from '@/styles/admin.module.css'
import axios from "axios";
import Select from "react-select";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function AdminBook() {
    const img_url = "http://localhost:8080/api/file/getImage?path=";
    const router = useRouter();
    const {index} = router.query;

    const [token, setToken] = useState("");
    const [book, setBook] = useState({});
    const [isView, setIsView] = useState(true)
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [categories, setCategories] = useState([])
    const [myBookCategories, setMyBookCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [files, setFiles] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);

    const [data, setData] = useState({
        title: "",
        cover: "",
        description: "",
        releaseDate: "",
        pages: "",
        price: "",
        authorName: "",
        categories: []

    });


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        setToken(token);
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios.get("http://localhost:8080/api/category/all");
            setCategories(result.data)
        }
        fetch();
    }, [])

    useEffect(() => {
        if (index !== undefined && index != 0) {
            const fetchBook = async () => {
                const result = await axios.get(
                    "http://localhost:8080/api/book/details",
                    {
                        params: {bookId: index},
                    }
                );
                console.log("result", result.data);
                setImgSrc(img_url + result.data.cover)
                setData({...result.data, authorName: result.data.author.name})
                setBook(result.data);
                let lst = ''
                result.data.categories.map((cate) => {
                    lst = [...lst, cate.name]
                })
                console.log("lst" + lst)
                setMyBookCategories(lst);

            };
            fetchBook();
        }
        if (index == 0) {
            setIsAdd(true);
            setIsView(false);
        }
    }, [index]);

    function handleUpload(e) {
        const file = e.target.files[0];
        let formData = new FormData();
        const reader = new FileReader();
        reader.onload = (event) => {
            console.log("imgsrc", event.target.result)
            setImgSrc(event.target.result);
        };
        reader.readAsDataURL(file)
        formData.append("files", file);
        setFiles(formData);

        setData({...data, cover: file.name})
        console.log(file.name);
    }

    console.log("files", files);

    async function handleAdd() {
        const uploadImg = await axios.post("http://localhost:8080/api/file/upload", files,
            {headers: {Authorization: `Bearer ${token.accessToken}`}})

        const result = await axios.post("http://localhost:8080/api/book/add", data, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            }
        });
        console.log("result", result.data);
        router.push("/admin");
    }

    function handleEdit() {
        setIsEdit(true);
        setIsView(false);
    }

    async function handleSave() {
        setIsView(true);
        setIsEdit(false);

        try{
            const uploadImg = await axios.post("http://localhost:8080/api/file/upload", files,
                {headers: {Authorization: `Bearer ${token.accessToken}`}})
        }catch (e){
            console.log("no img")
        }

        const result = await axios.post("http://localhost:8080/api/book/update", data, {
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            }
        });
        console.log("result", result.data);
        router.reload()
    }

    function handleChangeCategory(e) {
        let arr = Array.isArray(e) ? e.map(x => x.value) : []
        setData({...data, categories: arr})
        setSelectedCategories(arr);

    }

    // console.log("selectedCategories", selectedCategories)
    console.log("book", data)
    return (
        <>
            <Heading isAdmin={true}/>
            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.info}>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Title</div>
                                <input type="text" className={styles.input} value={data.title} disabled={isView}
                                       onChange={(e) => setData({...data, title: e.target.value})}/>
                            </div>
                            <div className={styles.bookInfo}>
                                <div>Author</div>
                                <input type="text" className={styles.input} value={data.authorName} disabled={isView}
                                       onChange={(e) => setData({...data, authorName: e.target.value})}/>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <div>Description</div>
                            <textarea className={styles.inputDescription} value={data.description} disabled={isView}
                                      onChange={(e) => setData({...data, description: e.target.value})}/>
                        </div>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Release date</div>
                                <input type="date" className={styles.input} value={data.releaseDate} disabled={isView}
                                       onChange={(e) => setData({...data, releaseDate: e.target.value})}/>
                            </div>
                            <div className={styles.bookInfo}>
                                <div>Pages</div>
                                <input type="text" className={styles.input} value={data.pages} disabled={isView}
                                       onChange={(e) => setData({...data, pages: e.target.value})}/>
                            </div>
                        </div>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Category</div>
                                {categories && <Select placeholder={myBookCategories.toString()}
                                                       options={categories.map((cate) => ({
                                                           value: cate,
                                                           label: cate.name
                                                       }))}
                                                       onChange={handleChangeCategory}
                                                       className={styles.input}
                                                       isDisabled={isView}
                                                       isClearable={true}
                                                       isSearchable={true}
                                                       isMulti={true}/>}

                            </div>
                            <div className={styles.bookInfo}>
                                <div>Price</div>
                                <input type="text" className={styles.input} value={data.price} disabled={isView}
                                       onChange={(e) => setData({...data, price: e.target.value})}/>
                            </div>
                        </div>
                        <div className={styles.sub}>
                            <div className={styles.bookInfo}>
                                <div>Quantity</div>
                                <input type="text" className={styles.input} value={data.quantity} disabled={isView}
                                       onChange={(e) => setData({...data, quantity: e.target.value})}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bookCover}>
                        <div>
                            <input
                                type="file"
                                onChange={handleUpload}
                                id="actual-btn"
                                disabled={isView}
                                hidden></input>
                            <button className={styles.button} disabled={isView}>
                                <label htmlFor="actual-btn" >Upload</label>
                                {/*<button className={styles.button} onClick={handleUpload}>Upload</button>*/}
                            </button>
                        </div>
                        <img src={imgSrc} className={styles.bookCover} alt="book cover"/>
                    </div>
                </div>
            </div>
            <div className={styles.buttonLst}>
                {isAdd && <button className={styles.button} onClick={() =>
                    confirmAlert({
                        title: "Add new book",
                        message: "Are you sure to add new book?",
                        buttons: [
                            {
                                label: 'Confirm',
                                onClick: handleAdd
                            },
                            {
                                label: 'Cancel'
                            }
                        ],
                        closeOnEscape: true,
                        closeOnClickOutside: true,
                    })
                }>Add</button>}
                {isView && <button className={styles.button} onClick={handleEdit}>Edit</button>}
                {isEdit && <button className={styles.button} onClick={() =>
                    confirmAlert({
                        title: "Update book",
                        message: "Are you sure to update this book?",
                        buttons: [
                            {
                                label: 'Confirm',
                                onClick: handleSave
                            },
                            {
                                label: 'Cancel'
                            }
                        ],
                        closeOnEscape: true,
                        closeOnClickOutside: true,
                    })
                }>Save</button>}
            </div>
        </>
    )


}
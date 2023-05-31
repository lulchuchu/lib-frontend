import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Heading from "@/pages/component/heading";
import styles from '@/styles/admin.module.css'
import axios from "axios";
import Select from "react-select";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Input from "@/pages/component/input";

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

    // const [titleError, setTitleError] = useState("Title is required");
    // const [authorError, setAuthorError] = useState("Author is required");
    // const [priceError, setPriceError] = useState("Price is required");
    // const [quantityError, setQuantityError] = useState("Quantity is required");
    // const [pagesError, setPagesError] = useState("Pages is required");

    const [titleError, setTitleError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [pagesError, setPagesError] = useState("");

    const [data, setData] = useState({
        title: "",
        cover: "",
        description: "",
        releaseDate: "",
        pages: "",
        price: "",
        authorName: "",
        quantity: "",
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
        // if(titleError || authorError || priceError || quantityError || pagesError) {
        //     return;
        // }
        if(data.title.length === 0|| data.authorName.length === 0 || data.price.length === 0 || data.quantity.length === 0 || data.pages.length === 0) {
            if(data.title.length === 0) {
                setTitleError("Title is required");
            }
            if(data.authorName.length === 0) {
                setAuthorError("Author is required");
            }
            if(data.price.length === 0) {
                setPriceError("Price is required");
            }
            if(data.quantity.length === 0) {
                setQuantityError("Quantity is required");
            }
            if(data.pages.length === 0) {
                setPagesError("Pages is required");
            }

            return;
        }

        const uploadImg = await axios.post("http://localhost:8080/api/file/upload", files,
            {headers: {Authorization: `Bearer ${token.accessToken}`}})

        try {

            const result = await axios.post("http://localhost:8080/api/book/add", data, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                }
            });
            console.log("result", result.data);
            router.push("/admin");
        } catch (e){
            confirmAlert({
                title: "Add book failed",
                message: e.response.data.message,
                buttons: [
                    {
                        label: 'Try again',
                        onClick: () => {}
                    },
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
        }
    }

    function handleEdit() {
        setIsEdit(true);
        setIsView(false);
    }

    async function handleSave() {
        setIsView(true);
        setIsEdit(false);

        try {
            const uploadImg = await axios.post("http://localhost:8080/api/file/upload", files,
                {headers: {Authorization: `Bearer ${token.accessToken}`}})
        } catch (e) {
            console.log("no img")
        }
        try {
            const result = await axios.post("http://localhost:8080/api/book/update", data, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                }
            });
            console.log("result", result.data);
            router.reload();
        } catch (e){
            confirmAlert({
                title: "Update book failed",
                message: e.response.data.message,
                buttons: [
                    {
                        label: 'Try again',
                        onClick: () => {
                        }
                    }
                ],
                closeOnEscape: true,
                closeOnClickOutside: true,
            });
        }
    }

    function handleChangeCategory(e) {
        let arr = Array.isArray(e) ? e.map(x => x.value) : []
        setData({...data, categories: arr})
        setSelectedCategories(arr);

    }


    function handleChangeTitle(e) {
        if (e.target.value.length === 0) {
            setTitleError("Title is required");
        } else {
            setTitleError(null)
        }
        setData({...data, title: e.target.value})
    }

    function handleAuthorChange(e) {
        if (e.target.value.length === 0) {
            setAuthorError("Author is required");
        } else {
            setAuthorError(null)
        }
        setData({...data, authorName: e.target.value})
    }

    function handlePriceChange(e) {
        if (e.target.value.length === 0) {
            setPriceError("Price is required");
        } else if(/^(\d{1, 3}(\, \d{3})*|(\d+))(\.\d{2})?$/.test(e.target.value) === false) {
            setPriceError("Price must be a US pattern");
        }
        else {
            setPriceError(null)
        }
        setData({...data, price: e.target.value})
    }

    function handleQuantityChange(e) {
        if (e.target.value.length === 0) {
            setQuantityError("Quantity is required");
        }else if(/^\d+$/.test(e.target.value) === false) {
            setQuantityError("Quantity must be a number");
        }
        else {
            setQuantityError(null)
        }
        setData({...data, quantity: e.target.value})
    }

    function handlePagesChange(e) {
        if(e.target.value.length === 0) {
            setPagesError("Pages is required");
        }else if (/^\d+$/.test(e.target.value) === false) {
            setPagesError("Pages must be a number");
        } else {
            setPagesError(null);
        }
        setData({...data, pages: e.target.value});
    }

    function handleReleaseDateChange(e) {
        setData({...data, releaseDate: e.target.value})
    }


    // console.log("selectedCategories", selectedCategories)
    console.log("book", data)
    console.log("data", data)
    return (
        <>
            <Heading isAdmin={true}/>
            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.info}>
                        <div className={styles.sub}>
                            <Input label={"Title"} value={data.title} error={titleError} disabled={isView}
                                   onChange={handleChangeTitle}/>
                            <Input label={"Author"} value={data.authorName} error={authorError} disabled={isView}
                                   onChange={handleAuthorChange}/>
                        </div>
                        <div className={styles.description}>
                            <div>Description</div>
                            <textarea className={styles.inputDescription} value={data.description} disabled={isView}
                                      onChange={(e) => setData({...data, description: e.target.value})}/>
                        </div>
                        <div className={styles.sub}>
                            <Input label={"Release date"} type={"date"} value={data.releaseDate} disabled={isView}
                                   onChange={handleReleaseDateChange}/>
                            <Input label={"Pages"} value={data.pages} error={pagesError} disabled={isView} onChange={handlePagesChange}/>
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
                            <Input label={"Price"} value={data.price} error={priceError} disabled={isView} onChange={handlePriceChange}/>
                        </div>
                        <div className={styles.sub}>
                            <Input label={"Quantity"} value={data.quantity} error={quantityError} disabled={isView} onChange={handleQuantityChange}/>
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
                                <label htmlFor="actual-btn">Upload</label>
                                {/*<button className={styles.button} onClick={handleUpload}>Upload</button>*/}
                            </button>
                        </div>
                        {imgSrc && <img src={imgSrc} className={styles.bookCover} alt="book cover"/>}
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
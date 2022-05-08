import { createContext, useContext } from "react";
// special object which has Provider property
const MainContext = createContext();
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../config/fire-config";
import { doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot, query, where, collection, documentId, addDoc, deleteDoc } from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const defaultSettings = {
    themeSun: true,
    displayCards: true,
}
const getSettingsFromStorage = () => {
    if (typeof window === "undefined") {
        return defaultSettings
    }
    const data = localStorage.getItem("banana_settings")
    return data ? JSON.parse(data) : defaultSettings
}

const setSettingsToStorage = (data) => {
    localStorage.setItem("banana_settings", JSON.stringify(data))
}

export const MainProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [filter, setFilter] = useState("all");
    const [displayCards, setDisplayCards] = useState(defaultSettings.displayCards);
    const [themeSun, setThemeSun] = useState(defaultSettings.themeSun);
    

    function sendNotification(itemName) {
        fetch("/api/notification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ itemName: itemName })
        }).then(res => res.text())
            .then(data => {
                console.log({ data })
            })
    }


    // this function adds new product to Firebase and closes Popup after that
    async function createProduct(item) {
        console.log(item);

        // addDoc() + collection() auto generate ID in Firebase
        const docRef = await addDoc(collection(db, "items"), {
            itemName: item.itemName,
            itemQ: item.itemQ,
            itemUrl: item.itemUrl,
            imgPath: item.imgPath,
        })
        setPopupOpen(false);
    }
    //this function updates quantaty of products
    async function updateQuantaty(id, itemQ, itemName) {
        if (itemQ === 0) {
            sendNotification(itemName);
        }

        const docRef = await updateDoc(doc(db, "items", id), {
            itemQ: itemQ,
        })
        setPopupOpen(false);
        setIdToEdit(null);
    }


    //this function deletes product

    async function deleteProduct(product) {
        if (product.imgPath) {
            const deleteImgRef = ref(storage, product.imgPath);
            await deleteObject(deleteImgRef)
        }

        await deleteDoc(doc(db, "items", product.id));

        setIdToDelete(null);
        setPopupOpen(false);

    }


    const imageUpload = (image) => {
        // const imageRef = ref(storage, `itemsPhotos/${image.name}`);
        let name = Date.now() + "-" + image.name
        const imageRef = ref(storage, `itemsPhotos/${name}`);
        const uploadImages = uploadBytesResumable(imageRef, image);
        return new Promise((resolve, reject) => {
            uploadImages.on(
                "state_changed",
                (snapshot) => {
                    //   const process =
                    //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //   console.log("uploading", process);
                    //   setProgress("uploading");
                },
                (error) => {
                    console.log("Encounter ", error);
                    reject(error)
                },
                () => {
                    getDownloadURL(ref(storage, `itemsPhotos/${name}`)).then(
                        (url) => {
                            resolve({ url, imgPath: `itemsPhotos/${name}` });
                            //     setImageUrl(url);
                            //   setProgress("uploaded");
                            //   setAddingItem({...addingItem, itemUrl: url })
                        }
                    );
                }
            );
        })
    }

    useEffect(() => {
        const collectionRef = collection(db, "items");
        onSnapshot(collectionRef, (snap) => {
            const newProducts = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(newProducts);
        });
        const {themeSun, displayCards} = getSettingsFromStorage();
        setDisplayCards(displayCards);
        setThemeSun(themeSun);

    }, [])
    console.log(products);

    const value = {
        products: products,
        popupOpen,
        setPopupOpen,
        idToEdit,
        setIdToEdit,
        filter,
        setFilter,
        displayCards,
        setDisplayCards: (value) => {
            setDisplayCards(value);
            setSettingsToStorage({
                themeSun: themeSun,
                displayCards: value, 
            })
        },
        themeSun,
        setThemeSun: (value) => {
            setThemeSun(value);
            setSettingsToStorage({
                themeSun: value,
                displayCards, 
            })
        },
        createProduct,
        imageUpload,
        updateQuantaty,
        deleteProduct,
        idToDelete,
        setIdToDelete
    };
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
};
export const useMainContext = () => useContext(MainContext);
import { createContext, useContext } from "react";
// special object which has Provider property
const MainContext = createContext();
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../config/fire-config";
import { doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot, query, where, collection, documentId, addDoc, deleteDoc} from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";


export const MainProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [filter, setFilter] = useState("all");
    const [displayCards, setDisplayCards] = useState(true);
    const [themeSun, setThemeSun] = useState(true);

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

    async function deleteProduct(id) {
        await deleteDoc(doc(db, "items", id));
    
        // // Create a reference to the file to delete
        // const desertRef = ref(storage, 'images/desert.jpg');        
        // // Delete the file
        // deleteObject(desertRef)


        setIdToDelete(null);
        setPopupOpen(false);

    }


    const imageUpload = (image) => {
        const imageRef = ref(storage, `itemsPhotos/${image.name}`);
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
                    getDownloadURL(ref(storage, `itemsPhotos/${image.name}`)).then(
                        (url) => {
                            resolve(url);
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
        setDisplayCards,
        themeSun,
        setThemeSun,
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
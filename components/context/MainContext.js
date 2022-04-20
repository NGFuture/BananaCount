import { createContext, useContext } from "react";
// special object which has Provider property
const MainContext = createContext();
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../config/fire-config";
import { doc, getDoc, getDocs, setDoc, updateDoc, onSnapshot, query, where, collection, documentId, addDoc } from "firebase/firestore";
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
    const [filter, setFilter] = useState("no");
    const [displayCards, setDisplayCards] = useState(true);
    const [themeSun, setThemeSun] = useState(true);

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
    async function updateQuantaty(id, itemQ) {
        // if = 0 then send email

        const docRef = await updateDoc(doc(db, "items", id), {
            itemQ: itemQ,
        })
        setPopupOpen(false);
        setIdToEdit(null);
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



    // const toggleFavorite = (post) => {
    //     const updateSavedPosts = (savedPosts) => {
    //         updateDoc(doc(db, "users", currentUser.uid), {
    //             savedPosts,
    //         });
    //         setCurrentUser({ ...currentUser, savedPosts });
    //     };
    //     const liked = currentUser.savedPosts.includes(post.id);
    //     if (liked) {
    //         //delete post form savedPost collection for current user
    //         const newSavedPosts = [...(currentUser.savedPosts || [])];
    //         const postIndex = newSavedPosts.findIndex((nextPost) => {
    //             return nextPost === post.id;
    //         });
    //         newSavedPosts.splice(postIndex, 1);
    //         updateSavedPosts(newSavedPosts);
    //     } else {
    //         const newSavedPosts = [...(currentUser.savedPosts || [])];
    //         newSavedPosts.push(post.id);
    //         updateSavedPosts(newSavedPosts);
    //     }
    // };

    // const favoritesList = (userFavList) => {
    //     const postsRef = collection(db, "posts");
    //     const q = query(
    //         postsRef,
    //         where(documentId(), "in", userFavList.savedPosts)
    //     );
    //     onSnapshot(q, (snap) => {
    //         const queryList = snap.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setFavList(queryList);
    //     });

    // };


    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);

    //         } else {
    //             setUser(null);
    //         }
    //     });
    // }, [])

    // useEffect(() => {
    //     if (!user) return
    //     async function authChange() {
    //         const docRef = doc(db, "users", user.uid);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             // if (docSnap.data().photo) {
    //             //     setPhoto(docSnap.data().photo);
    //             // } 
    //             setCurrentUser(docSnap.data())
    //         } else {
    //             const currentUser = {
    //                 accountCreatedDate: new Date(),
    //                 email: user.email,
    //                 name: user.displayName,
    //                 phoneNumber: user.phoneNumber,
    //                 photo: user.photoURL,
    //                 provider: `Login-${user.providerData[0].providerId}`,
    //                 savedPosts: [],
    //                 uid: user.uid,
    //                 zipCode: 0,
    //             }
    //             setCurrentUser(currentUser);
    //             await setDoc(doc(db, "users", user.uid), currentUser);
    //         }


    //     }
    //     authChange();

    // }, [user])

    // useEffect(() => {
    //     if (currentUser) {
    //         setLoginAlert(false) 
    //     }
    // }, [currentUser]);


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
    };
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
};
export const useMainContext = () => useContext(MainContext);
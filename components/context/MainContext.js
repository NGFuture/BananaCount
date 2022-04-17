import { createContext, useContext } from "react";
// special object which has Provider property
const MainContext = createContext();
import { useState, useEffect } from "react";
import { auth, db } from "../../config/fire-config";
import { doc, getDoc, setDoc, updateDoc, onSnapshot, query, where, collection, documentId } from "firebase/firestore";



export const MainProvider = ({ children }) => {
    const [items, setItems] = useState(null);

    useEffect(() => {

        async function getItems() {
            const docRef = collection(db, "items");
            const docSnap = await getDocs(docRef);
            docSnap.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }
    }, [])


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
        items: items,
    };
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
};
export const useMainContext = () => useContext(MainContext);
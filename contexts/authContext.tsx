// handle Auth backend
import {createContext, useContext, useEffect, useState} from "react";
import {AuthContextType, UserType} from "@/types";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import {auth, firestore} from "@/config/firebase";
import {doc, getDoc, setDoc} from "@firebase/firestore";
import {router} from "expo-router";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    // redirect after login/register
    let [user, setUser] = useState<UserType>(null);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            // give access if authenticated
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser?.displayName,
                });
                updateUserData(firebaseUser.uid);
                router.replace("/(tabs)");
                //console.log('authenticated')
            }
            // no access when no authenticate
            else {
                setUser(null);
                //console.log('not authenticate');
                router.replace("/(auth)/welcome");
            }
        });

        return () => unsub;
    }, []);

    // login function
    const login = async (email:string, password: string) => {
        try {
            // from firebase
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };

        } catch (error) {
            let msg = error.message;
            console.error(error);
            return { success: false, msg };
        }
    }

    // register function
    const register = async (email: string, password: string, name: string) => {
        try {
            // from firebase - will generate UID from user
            let response = await createUserWithEmailAndPassword(auth, email, password);

            // setDoc adds/overwrites data to Cloud FireStore
            await setDoc(doc(firestore, "users", response?.user?.uid), {
                name,
                email,
                uid: response?.user?.uid,
            });

            return { success: true };
        } catch (error) {
            let msg = error.message;
            if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
            return { success: false, msg };
        }
    }

    // function to update user's data to our app
    const updateUserData = async (uid: string) => {
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data?.uid,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,
                };
                setUser({...userData});
            }
        } catch (error) {
            let msg = error.message;
            console.error(error);
        }
    }

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("useAuth must be wrapped inside AuthProvider")
    }
    return context;
}
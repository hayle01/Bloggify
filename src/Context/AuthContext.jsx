import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, SignOut } from "../lib/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    
    useEffect(() => {

        const cleanUp = onAuthChange( async (user) => {

            setUser(user);

            if(user) {
                try {

                    const userProfile = await getUserProfile(user.id);
                    setProfile(userProfile)
                    
                } catch (error) {
                    console.error('Error Fetchin Profile'. error)
                }
            }else{
                setProfile(null)
            }

            setisLoading(false)
        })

        return cleanUp;
    }, [])

    const Logout = async () => {
        try {
            await SignOut();
        } catch (error) {
            console.error('Error signing Out', error)
        }
    }

  const value = {
    user,
    profile,
    isLoggedIn: !!user,
    isLoading,
    Logout,
  };

    return(
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(context === null) {
        throw new Error('useAuth must be used with in and AuthProvider');
    }

    return context;
}
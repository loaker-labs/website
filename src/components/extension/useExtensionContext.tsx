import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';


export const ExtensionContext = createContext<{
    isLocked: boolean,
    setIsLocked: Dispatch<SetStateAction<boolean>>,
    showAddCredentialsModal: boolean,
    setShowAddCredentialsModal: Dispatch<SetStateAction<boolean>>,
    passwords: {
        website: string;
        username: string;
        password: string;
    }[],
    setPasswords: Dispatch<SetStateAction<{
        website: string;
        username: string;
        password: string;
    }[]>>,
}>({
    isLocked: false,
    setIsLocked: () => {},
    showAddCredentialsModal: false,
    setShowAddCredentialsModal: () => {},
    passwords: [],
    setPasswords: () => {},
});

export function ExtensionContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [isLocked, setIsLocked] = useState(true);
    const [showAddCredentialsModal, setShowAddCredentialsModal] = useState(false);
    const [passwords, setPasswords] = useState<{ website: string; username: string; password: string; }[]>([]);

    useEffect(() => {
        if (passwords.length === 0) {
            const storedPasswords = localStorage.getItem('passwords');
            if (storedPasswords) {
                setPasswords(JSON.parse(storedPasswords));
            }
        }
    }, []);

    return (
        <ExtensionContext.Provider value={{ isLocked, setIsLocked, showAddCredentialsModal, setShowAddCredentialsModal, passwords, setPasswords }}>
            {children}
        </ExtensionContext.Provider>
    );
};

export const useExtensionContext = () => useContext(ExtensionContext);
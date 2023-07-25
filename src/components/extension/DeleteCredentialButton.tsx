import { useState } from "react";
import { useExtensionContext } from "@components/extension/useExtensionContext";


interface DeleteCredentialButtonProps {
    item: number;
}

export const DeleteCredentialButton = ({
    item
}: DeleteCredentialButtonProps) => {
    const { passwords, setPasswords } = useExtensionContext();

    const [loading, setLoading] = useState(false);

    const deleteCredential = () => {
        setLoading(true);
        setTimeout(() => {
            const newPasswords = passwords.filter((password, index) => index !== item);
            setPasswords(newPasswords);
            localStorage.setItem('passwords', JSON.stringify(newPasswords));
            setLoading(false);
        }, 200+(Math.random()-0.5)*50);
    }

    return (
        <button onClick={deleteCredential} className="inline-flex items-center border border-solid border-neutral-400 rounded text-sm px-1">
            {loading &&
                <svg className="animate-spin ml-1 mr-3 h-3 w-3 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            }
            Delete
        </button>
    )
}
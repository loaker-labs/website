import { useState } from "react";
import { useExtensionContext } from "@components/extension/useExtensionContext";

export const AddCredentialsForm = () => {
    const { showAddCredentialsModal, setShowAddCredentialsModal, passwords, setPasswords } = useExtensionContext();
    if (!showAddCredentialsModal) return null;

    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWebsite(event.target.value);
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setPasswords([...passwords, { website, username, password }]);
            localStorage.setItem('passwords', JSON.stringify([...passwords, { website, username, password }]));
            setWebsite('');
            setUsername('');
            setPassword('');
            setShowAddCredentialsModal(false);
            setLoading(false);
        }, 200+(Math.random()-0.5)*50);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center m-4 p-2 bg-neutral-100 border border-solid border-neutral-200 rounded">
                <h1 className="text-2xl font-bold">Add Credentials</h1>
                <div className="flex flex-col gap-1 items-center w-full">
                    <input value={website} onChange={handleWebsiteChange} className="w-full border border-solid border-neutral-400 rounded px-1" type="text" placeholder="Website" required/>
                    <input value={username} onChange={handleUsernameChange} className="w-full border border-solid border-neutral-400 rounded px-1" type="text" placeholder="Username" required/>
                    <input value={password} onChange={handlePasswordChange} className="w-full border border-solid border-neutral-400 rounded px-1" type="password" placeholder="Password" required/>
                </div>
                <button className="inline-flex items-center border border-solid border-neutral-400 rounded px-2 py-1" type="submit" disabled={loading}>
                    {loading && 
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    Add
                </button>
        </form>
    );
}
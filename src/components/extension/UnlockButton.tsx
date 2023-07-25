import { useState, useEffect } from "react";
import { useExtensionContext } from "@components/extension/useExtensionContext";

export const UnlockButton = () => {
    const { isLocked, setIsLocked } = useExtensionContext();
    if (!isLocked) return null;

    const [isUnlocking, setIsUnlocking] = useState(false);

    const handleUnlock = () => {
        setIsUnlocking(true);
        setTimeout(() => {
            setIsUnlocking(false);
            setIsLocked(false);
        }, 100+(Math.random()-0.5)*50);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <button
                className="inline-flex items-center bg-emerald-400 rounded px-6 py-4 text-xl font-bold"
                aria-label="Unlock"
                onClick={handleUnlock}
            >
                {isUnlocking &&
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                }
                Unlock
            </button>
        </div>
    );
}
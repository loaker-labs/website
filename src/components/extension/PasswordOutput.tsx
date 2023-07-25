import { useState } from "react";

interface PasswordOutputProps {
    password: string;
}

export const PasswordOutput = ({
    password
}: PasswordOutputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const hiddenPassword = password.split("").map(() => "*").join("");

    return (
        <div className="flex flex-row items-center gap-2">
            <p className="text-sm italic underline underline-offset-4">Password:</p>
            <p className="text-sm">{showPassword ? password : hiddenPassword}</p>
            <button className="inline-flex ml-auto border border-solid border-neutral-400 hover:bg-neutral-200 text-sm font-semibold rounded px-1" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    )
}
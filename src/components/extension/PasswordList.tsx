import { useExtensionContext } from "@components/extension/useExtensionContext";
import { PasswordItem } from "@components/extension/PasswordItem";


export const PasswordList = () => {
    const { isLocked, passwords } = useExtensionContext();
    if (isLocked) return null;

    return (
        <div className="flex flex-col gap-4 p-4">
            {passwords.map((password, index) => (
                <PasswordItem key={index} item={index} {...password} />
            ))}
            {passwords.length === 0 && (
                <p className="text-center text-xl italic">No passwords saved</p>
            )}
        </div>
    )
}
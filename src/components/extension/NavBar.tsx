import { useExtensionContext } from "./useExtensionContext";
import { LockButton } from "@components/extension/LockButton";
import { SearchBar } from "@components/extension/SearchBar";
import { AddCredentialsButton } from "@components/extension/AddCredentialsButton";


export const Navbar = () => {
    const { isLocked } = useExtensionContext();
    if (isLocked) return null;

    return (
        <nav className="flex items-center gap-4 p-1 border-b borde-solid border-neutral-200 bg-neutral-100">
            <LockButton />
            <SearchBar />
            <div className="ml-auto">
                <AddCredentialsButton />
            </div>
        </nav>
    );
}
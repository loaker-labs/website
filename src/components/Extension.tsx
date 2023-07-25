import { ExtensionContextProvider } from '@components/extension/useExtensionContext';
import { AddCredentialsForm } from '@components/extension/AddCredentialsForm';
import { PasswordList } from '@components/extension/PasswordList';
import { Navbar } from '@components/extension/NavBar';
import { UnlockButton } from '@components/extension/UnlockButton';


export const Extension = () => {
    return (
        <div className="overflow-y-auto w-[400px] h-[600px] border border-solid border-black rounded-lg">
            <ExtensionContextProvider>
                <UnlockButton />
                <Navbar />
                <AddCredentialsForm />
                <PasswordList />
            </ExtensionContextProvider>
        </div>
    );
};
import { DeleteCredentialButton } from "@components/extension/DeleteCredentialButton";
import { PasswordOutput } from "@components/extension/PasswordOutput";

interface PasswordItemProps {
    item: number;
    website: string;
    username: string;
    password: string;
}

export const PasswordItem = ({
    item,
    website,
    username,
    password
}: PasswordItemProps) => {
    return (
        <div className="flex flex-col gap-6 rounded-md p-2 bg-neutral-100">
            <div className="flex flex-row items-center">
                <h1 className="text-2xl font-bold">{website}</h1>
                <div className="ml-auto">
                    <DeleteCredentialButton item={item} />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm italic underline underline-offset-4">Username:</p>
                    <p className="text-base">{username}</p>
                </div>
                <PasswordOutput password={password} />
            </div>
        </div>
    )
};
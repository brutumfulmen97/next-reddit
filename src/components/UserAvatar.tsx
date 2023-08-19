import { Avatar, AvatarProps, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";
import { Icons } from "./Icons";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "name" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        width={20}
                        height={20}
                        src={user.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                        className="rounded-full object-cover w-12"
                    />
                </div>
            ) : (
                <AvatarFallback className="sr-only">
                    {user?.name}
                    <Icons.user className="h-4 w-4" />
                </AvatarFallback>
            )}
        </Avatar>
    );
};

export default UserAvatar;

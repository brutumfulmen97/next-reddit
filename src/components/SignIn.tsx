import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto w-6 h-6" />
                <h1 className="text-2xl font-seimbold tracking-tight">
                    Welcome back
                </h1>
                <p className="text-sm max-x-xs max-auto">
                    By continuing, you are setting up a Breadit account and
                    agree to our User Agreement Privacy Policy.
                </p>
                {/* sign in form */}
                <UserAuthForm />

                <p className="px-8 text-center text-sm text-zinc-700">
                    New to Breadit?{" "}
                    <Link
                        href="sing-up"
                        className="hover:text-zinc-800 text-sm underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;

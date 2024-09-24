'use client'
import Image from "next/image";
import { FaGoogle, FaGithub, FaFacebook, FaAppStore, FaApple } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const toggleSignUp = (): void => setIsSignUp(prev => !prev);
    const router = useRouter();

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSignUp) {
            if (password !== confirmPassword) {
               
                return;
            }

            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                }),
            });

            if (res.ok) {
               
                await signIn("credentials", { email, password, redirect: false });
                router.push("/");
            } else {
                const errorData = await res.json();
                //alert(errorData.error || "Échec de création de compte");
            }
        } else {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            console.log(res)
            if (res?.error) {
                //alert(res.error);
            } else {
                router.push("/");
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#b92b27] via-[#1565C0] to-[#f12711] p-4">
            <div className="flex w-full max-w-6xl rounded-3xl bg-white bg-opacity-10 shadow-lg backdrop-blur-md lg:h-[75vh] lg:flex-row md:flex-col items-center">
                {/* Left Section */}
                <div className="w-full p-8 lg:w-1/2">
                    <div className="mb-8 text-white space-y-6">
                        <h2 className="mb-2 text-3xl font-bold">{isSignUp ? "Créer un compte 🙌" : "Welcome Back 🎉"}</h2>
                        <p className="text-sm">{isSignUp ? "Inscrivez-vous pour commencer" : ""}</p>
                    </div>
                    <form className="space-y-8 flex flex-col justify-center p-8" onSubmit={handleSubmit}>

                    {isSignUp && (
                            <div>
                                <label htmlFor="name" className="block text-sm text-white">Votre nom</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                                    placeholder="Sedjro"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm text-white">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                                placeholder="sedjro@gmail.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm text-white">Mot de Passe</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                                placeholder="********"
                            />
                        </div>
                        {isSignUp && (
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm text-white">Confirmer mot de passe</label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-lg border-none bg-black bg-opacity-40 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                                    placeholder="********"
                                />
                            </div>
                        )}

                        {!isSignUp && (
                            <div className="flex items-center justify-between text-sm text-white gap-2 md:gap-0">
                                <div>
                                    <input type="checkbox" id="keep-logged-in" />
                                    <label htmlFor="keep-logged-in" className="ml-2">
                                        Gardez moi connecté(e)
                                    </label>
                                </div>
                                <a href="#" className="text-white hover:underline">
                                    Mot de passe oublié
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-gradient-to-r from-[#f12711] to-[#f5af19] py-3 text-white hover:from-[#f5af19] hover:to-[#f12711]"
                        >
                            {isSignUp ? "Inscrivez-vous" : "Se connecter"}
                        </button>
                    </form>
                    <div className="mt-8 flex justify-center space-x-6">
                        <button className="text-3xl text-white hover:text-gray-300">
                            <FaGoogle size={32} />
                        </button>
                        <button className="text-3xl text-white hover:text-gray-300">
                            <FaApple size={32} />
                        </button>
                        <button className="text-3xl text-white hover:text-gray-300">
                            <FaFacebook size={32} />
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-white">
                            {isSignUp ? "Déjà un compte ?" : "Pas de compte?"}{" "}
                            <button onClick={toggleSignUp} className="text-blue-500 hover:underline">
                                {isSignUp ? "Inscrivez vous " : "Se connecter"}
                            </button>
                        </p>
                    </div>
                </div>
                {/* Right Section */}
                <div className="relative hidden w-1/2 h-full p-8 lg:block opacity-80 shadow-lg rounded-3xl">
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-3xl"></div>
    <Image
        src="/imagekdo.jpg"
        layout="fill" 
        objectFit="cover" 
        alt="Background Image"
        className="rounded-3xl"
    />
</div>
            </div>
        </div>
    );
};

export default Auth;

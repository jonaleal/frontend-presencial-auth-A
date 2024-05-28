import Link from "next/link"

export default function Web() {
    return (
        <div className="flex flex-col gap-6 justify-center items-center h-screen w-full">
            Hola Mundo, desde autenticación y autorización A... <button className="bg-slate-400 p-5"><Link
            href={"auth-a/Login"}>Ir a Auth-a Login</Link>
        </button>
        </div>
    )
}
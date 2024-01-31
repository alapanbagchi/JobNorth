import { Logo } from "@/components/Logo"
import { Navbar } from "@/components/Navbar/Navbar"
import { LoginForm } from "@/components/UserAuth/LoginForm"

const LoginPage = () => {
    return (
        <div className="h-screen items-center bg-secondary">
            <div className="bg-white h-16">
                <Navbar />
            </div>
            <div className="bg-background max-w-[600px] mx-auto mt-24 h-fit p-6 rounded-lg space-y-1 border">
                <Logo expanded={false} />
                <h1 className="text-2xl font-medium">Look who's back!</h1>
                <p className="text-muted-foreground text-sm font-medium">
                    Your one stop solution for managing all your hospital and doctor management needs
                </p>
                <div className="pt-4">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage
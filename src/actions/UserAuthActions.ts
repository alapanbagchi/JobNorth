"use server"
import { signIn, signOut } from "@/auth";
import prisma from "@/prisma";
import bcrypt from "bcryptjs";

export const EmailExists: (email: string) => Promise<boolean> = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) return true
        return false
    } catch (err) {
        return false
    }
}

export const SignUpAction: (name: string, email: string, password: string) => Promise<ServerActionResponse> = async (name, email, password) => {
    try {
        const emailExists = await EmailExists(email)
        if(emailExists) throw new Error("Email already exists")
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
        return {
            success: true,
            message: "User signed up successfully",
            data: user
        }
    } catch (err: any) {
        return {
            success: false,
            message: "An error occurred while signing up",
            data: err.message
        }
    }
}

export const SignInAction: (email: string, password: string) => Promise<ServerActionResponse> = async (email, password) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        return {
            success: true,
            message: "User signed in successfully",
            data: null
        }
    } catch (err: any) {
        console.log(err.type)
        return {
            success: false,
            message: err.type === "CredentialsSignin" ? "Invalid email or password" : "An error occurred while signing in",
            data: null
        }
    }
}

export const SignOutAction: () => Promise<ServerActionResponse> = async () => {
    try {
        await signOut()
        return {
            success: true,
            message: "User signed out successfully",
            data: null
        }
    } catch (err: any) {
        return {
            success: false,
            message: "An error occurred while signing out",
            data: null
        }
    }
}
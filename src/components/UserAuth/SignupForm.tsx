"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { UserOptionalDefaultsSchema } from "@/prisma/generated/zod"
import { SignUpAction } from "@/actions/UserAuthActions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const SignupForm = () => {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(UserOptionalDefaultsSchema.merge(
            z.object({
                confirmPassword: z.string()
            }))
            .omit({ avatar: true, id: true, role: true, permissions: true, designation: true })
            .superRefine((data, ctx) => {
                console.log(data)
                if (data.password != data.confirmPassword) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Passwords don't match",
                        path: ["confirmPassword"],
                    });
                }
                return {}
            })
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = async () => {
        const data = form.getValues()
        const res = await SignUpAction(data.name, data.email, data.password)
        res.success ? (
            router.push("/login"),
            toast("Account created successfully. Please login to continue.")
        ) : (
            console.log(res),
            toast("Oops! Something went wrong. Please try again later")
        )
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Full Name" placeholder="Ex. John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Password" placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Confirm Password" placeholder="********" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-3 -mt-3">
                    <p className="text-muted-foreground text-sm font-medium">By signing up to Moonhealth CRM, you agree to our Terms and Conditions and Privacy Policy</p>
                    <Button isSubmitting={form.formState.isSubmitting} disabled={form.formState.isSubmitting} onClick={() => {
                        console.log(form.formState.errors)
                    }} type="submit" className="w-full">Sign up</Button>
                </div>
            </form>
        </Form>
    )
}
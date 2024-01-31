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
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { signIn } from "@/auth"
import { SignInAction } from "@/actions/UserAuthActions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const router = useRouter()
    const onSubmit = async () => {
        const data = form.getValues()
        const res = await SignInAction(data.email, data.password)
        if (res.success) {
            router.push('/')
        } else {
            toast(res.message)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Email" placeholder="Ex. johndoe@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Hack to prevent chrome from autocompleting the input fields. If chrome autocompletes the fields, the props.value is empty until you click on the page once which makes the label not float initially. To check this just comment out the 2 input below and refresh the page and then click anywhere on the page and you will understand why you did this. */}
                <Input label="Email" className="hidden" />
                <Input label="Password" type="password" className="hidden" />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Password" type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button isSubmitting={form.formState.isSubmitting} disabled={form.formState.isSubmitting} type="submit" className="w-full">Log in</Button>
            </form>
        </Form>
    )
}
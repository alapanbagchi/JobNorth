"use client"
import { useFormContext } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { X } from "lucide-react"

export const JobHiringProcessForm = () => {
    const methods = useFormContext()
    return (
        <div>
            <h2 className="text-xl font-medium">Hiring Process</h2>
            <p className="text-sm font-medium leading-6 text-muted-foreground py-3 mb-6 border-b-2">We understand that you might need to go through multiple steps of interviews to find your perfect candidate like Screening Round, Technical Round, etc. You can include all those steps here. This part is optional and can be skipped as well</p>
            <div className="grid gap-8">
                {
                    methods.getValues("hiringProcess").map((item: any, index: number) => (
                        <div className="flex gap-4 w-full flex-col p-4 border rounded-lg">
                            <FormField
                                control={methods.control}
                                name={`hiringProcess.${index}.title`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input label="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name={`hiringProcess.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Textarea label="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))
                }
                <Button type="button" variant="secondary" onClick={() => {
                    methods.setValue("hiringProcess", [...methods.getValues().hiringProcess, { title: "", description: "" }])
                }} className="w-fit">Add new hiring process</Button>
            </div >
        </div>
    )
}
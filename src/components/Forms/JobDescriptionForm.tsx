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

export const JobDescriptionForm = () => {
    const methods = useFormContext()
    return (
        <div>
            <h2 className="text-xl font-medium">Job Description</h2>
            <p className="text-sm font-medium leading-6 text-muted-foreground py-3 mb-6 border-b-2">Tell us in great details what your job is about. Give us a brief rundown of the project, the responsibilities the candidates are going to handle and the skills you want in your candidates</p>
            <div className="grid gap-8">
                <FormField
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea label="Job Description" placeholder="Ex. I am looking for a  development expert to assist me with an e-commerce project. The main purpose of the website is to serve as an online store, allowing customers to browse and purchase products. I already have existing branding that needs to be incorporated into the website design. Ideal skills and experience for this job include proficiency in website development, particularly in e-commerce platforms, as well as the ability to integrate existing branding elements seamlessly into the design. The freelancer should also have a strong understanding of user experience and be able to create a visually appealing and easy-to-navigate website. Overall, I am seeking a professional who can bring my e-commerce vision to life while ensuring a seamless online shopping experience for my customers." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="responsibilities"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea label="Job Responsibilities" placeholder="Ex. I am looking for a  development expert to assist me with an e-commerce project. The main purpose of the website is to serve as an online store, allowing customers to browse and purchase products. I already have existing branding that needs to be incorporated into the website design. Ideal skills and experience for this job include proficiency in website development, particularly in e-commerce platforms, as well as the ability to integrate existing branding elements seamlessly into the design. The freelancer should also have a strong understanding of user experience and be able to create a visually appealing and easy-to-navigate website. Overall, I am seeking a professional who can bring my e-commerce vision to life while ensuring a seamless online shopping experience for my customers." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="requirements"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea label="Job Requirements" placeholder="Ex. I am looking for a  development expert to assist me with an e-commerce project. The main purpose of the website is to serve as an online store, allowing customers to browse and purchase products. I already have existing branding that needs to be incorporated into the website design. Ideal skills and experience for this job include proficiency in website development, particularly in e-commerce platforms, as well as the ability to integrate existing branding elements seamlessly into the design. The freelancer should also have a strong understanding of user experience and be able to create a visually appealing and easy-to-navigate website. Overall, I am seeking a professional who can bring my e-commerce vision to life while ensuring a seamless online shopping experience for my customers." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <p className="text-lg font-semibold">Frequently Asked Questions</p>
                {
                    methods.getValues().faqs.map((faq: any, index: number) => (
                        <div key={index} className="grid gap-4 p-4 bg-accent rounded-lg">
                            <div className="flex justify-between items-center">
                                <p className="px-2 text-base font-semibold">FAQ {index + 1}</p>
                                <Button onClick={() => methods.setValue(
                                    "faqs",
                                    methods.getValues().faqs.filter((faq: any, i: number) => i !== index)
                                )} type="button" variant="ghost" size="icon" className="justify-self-end w-6 h-6 text-muted-foreground hover:text-foreground transition-all"><X size="16" /></Button>
                            </div>
                            <FormField
                                control={methods.control}
                                name={`faqs.${index}.question`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="bg-white" label="Question" placeholder="Ex. What is the job about?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={methods.control}
                                name={`faqs.${index}.answer`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="bg-white" label="Answer" placeholder="Ex. The job is about..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))
                }
                <Button type="button" onClick={() => {
                    methods.setValue("faqs", [...methods.getValues().faqs, { question: "", answer: "" }])
                }} className="w-fit">Add FAQ</Button>
            </div >
        </div>
    )
}
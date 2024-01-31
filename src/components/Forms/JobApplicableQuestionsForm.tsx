"use client"
import { useFormContext } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { questionTypeList } from "@/lib/industriesList"
import { useEffect } from "react"

export const JobApplicableQuestionsForm = () => {
    const methods = useFormContext()
    return (
        <div>
            <h2 className="text-xl font-medium">Applicable Questions</h2>
            <p className="text-sm font-medium leading-6 text-muted-foreground py-3 mb-6 border-b-2">Do you want your candidates to answer certain questions before applying? If so, you can list them here. You can filter your candidates using the questions as well</p>
            <div>
                {
                    methods.getValues("questions").map((item: any, index: number) => (
                        <div className="w-full border rounded-lg px-4 pb-6 pt-2 mb-4" key={index}>

                            <div className="flex justify-between px-1 items-center mb-2">
                                <p className="text-base font-medium">Question {index + 1}</p>
                                <Button size="icon" variant="ghost" onClick={() => methods.setValue("questions", methods.getValues("questions").filter((_: any, i: number) => i !== index))}>
                                    <X size={16} />
                                </Button>
                            </div>
                            <div className="flex gap-4 w-full ">
                                <FormField
                                    control={methods.control}
                                    name={`questions.${index}.question`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input label="Question" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={methods.control}
                                    name={`questions.${index}.questionType`}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger label="Question Type">
                                                        <SelectValue placeholder="Select the question type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        questionTypeList.map((item, index) => (
                                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {(item.questionType === "Multiple Choice" || item.questionType === "Single Choice") && (
                                <div>
                                    {
                                        item.options.map((option: any, optionIndex: number) => (
                                            <div className="flex gap-4 w-full mt-4" key={optionIndex}>
                                                <FormField
                                                    control={methods.control}
                                                    name={`questions.${index}.options.${optionIndex}`}
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormControl>
                                                                <Input label="Option" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))
                }
                <Button variant="secondary" onClick={() => methods.setValue("questions", [...methods.getValues("questions"), { questionType: "Text Answer", question: "", options: [""] }])}>Add Question</Button>
            </div>
        </div >
    )
}
"use client"
import { JobBasicDetailsForm } from "@/components/Forms/JobBasicDetailsForm"
import { PostJobFormSteps } from "@/components/PostJobFormSteps"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { JobDescriptionForm } from "@/components/Forms/JobDescriptionForm"
import { JobApplicableQuestionsForm } from "@/components/Forms/JobApplicableQuestionsForm"
import { JobSchema } from "@/prisma/generated/zod"


const formSteps = [
    "Basic Details",
    "Job Description",
    "Application Process",
    "Hiring Process",
    "Review & Post"
]

const JobPostPage = () => {
    const [step, setStep] = useState(0)
    const methods = useForm({
        resolver: zodResolver(JobSchema),
        defaultValues: {
            title: "",
            industry: "",
            location: "",
            locationPreference: "",
            employmentType: "",
            experienceLevel: "",
            minimumQualification: "",
            visaSponsorship: "false",
            salaryType: "",
            salaryMin: "",
            questions: [{
                questionType: "",
                question: "",
                options: [""],
            }],
            salaryMax: "",
            salaryCurrency: "",
            salaryInterval: "",
            facilities: [],
            description: "",
            responsibilities: "",
            requirements: "",
            skills: "",
            tags: "",
            faqs: [{
                question: "",
                answer: "",
            }],
            hiringProcess: [],
        },
        mode: "onChange",
    })
    useEffect(() => {
        console.log(methods.getValues())
        if (methods.formState.errors) {
            console.log(methods.formState.errors)
        }
        methods.getValues("questions").forEach((item: any, index: number) => {
            if (item.options[item.options.length - 1] !== "") {
                methods.setValue(`questions.${index}.options`, [...item.options, ""])
            } else if (item.options.length > 1 && item.options[item.options.length - 2] === "") {
                methods.setValue(`questions.${index}.options`, item.options.slice(0, item.options.length - 1))
            }
        })
        return () => { }
    }, [methods.watch(), methods.formState.isDirty])

    const onSubmit = async () => {
        switch (step) {
            case 0: {
                const valid = await methods.trigger(["title", "industry", "location", "locationPreference", "employmentType", "experienceLevel", "minimumQualification", "visaSponsorship", "salaryType", "salaryCurrency", "salaryMin", "salaryMax", "salaryInterval", "facilities"], { shouldFocus: true })
                if (!valid) break
                setStep(step + 1)
                break
            }
            case 1:
                const valid = await methods.trigger(["description", "responsibilities", "requirements", "faqs"], { shouldFocus: true })
                if (!valid) break
                setStep(step + 1)
                break
            case 2:
                const valid2 = await methods.trigger(["questions"], { shouldFocus: true })
                if (!valid2) break
                setStep(step + 1)
                break
            case 3:
                setStep(step + 1)
                break
            case 4:
                setStep(step + 1)
                break
            default:
                break
        }
    }
    return (
        <div className="bg-secondary flex flex-col justify-between items-between h-full min-h-[calc(100vw-900px)]">
            <div className="container py-4 flex gap-10 h-full min-w-[1000px] justify-between max-w-[1400px]">
                <div className="w-[300px] shrink-0 sticky top-2 h-fit">
                    <PostJobFormSteps steps={formSteps} />
                </div>
                <div className="bg-background p-6 h-fit rounded-lg w-full min-w-[700px]">
                    <FormProvider {...methods}>
                        {
                            step === 0 && <JobBasicDetailsForm />
                        }
                        {
                            step === 1 && <JobDescriptionForm />
                        }
                        {
                            step === 2 && <JobApplicableQuestionsForm />
                        }
                        {
                            step === 3 && <div>Hiring Process</div>
                        }
                        {
                            step === 4 && <div>Review & Post</div>
                        }
                    </FormProvider>
                </div>
            </div>
            <div className="w-full h-16 p-4 sticky bottom-0 bg-white left-0 flex justify-end gap-4 items-center">
                <Button onClick={()=>{
                    setStep(step - 1)
                }} variant="secondary">Previous Step</Button>
                <Button onClick={onSubmit}>Next Step</Button>
            </div>
        </div>
    )
}

export default JobPostPage
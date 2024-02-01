"use client";
import { JobBasicDetailsForm } from "@/components/Forms/JobBasicDetailsForm";
import { PostJobFormSteps } from "@/components/PostJobFormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { JobDescriptionForm } from "@/components/Forms/JobDescriptionForm";
import { JobApplicableQuestionsForm } from "@/components/Forms/JobApplicableQuestionsForm";
import { JobOptionalDefaultsSchema, JobApplicantQuestionsOptionalDefaultsSchema, JobFAQOptionalDefaultsSchema, JobHiringProcessOptionalDefaultsSchema } from "@/prisma/generated/zod";
import { z } from "zod";
import { JobHiringProcessForm } from "@/components/Forms/JobHiringProcessForm";

const formSteps = ["Basic Details", "Job Description", "Applicable Questions", "Hiring Process"];

const JobPostPage = () => {
    const [step, setStep] = useState(0);

    const mergedSchema = JobOptionalDefaultsSchema
        .merge(
            z.object({
                salaryMax: z.coerce.number().nullable(),
                questions: JobApplicantQuestionsOptionalDefaultsSchema.array().superRefine((questions, ctx) => {
                    questions.forEach((question, questionIndex) => {
                        if (question.questionType != "TEXT" && question.options.filter((option) => option !== "").length < 2) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: "Question must have at least 2 options",
                                path: [questionIndex, "options"]
                            })
                        }
                    });
                }),
                faqs: JobFAQOptionalDefaultsSchema.array().optional(),
                hiringProcess: JobHiringProcessOptionalDefaultsSchema.array().optional(),
            })
        )
    const jobPostFormMethods = useForm<z.infer<typeof mergedSchema>>({
        resolver: zodResolver(mergedSchema),
        defaultValues: {
            title: "",
            industry: "Animation_and_Graphic_Design",
            location: "",
            locationPreference: "BOTH",
            employmentType: "CONTRACT",
            experienceLevel: "BEGINNER",
            minimumQualification: "ASSOCIATE",
            visaSponsorship: false,
            salaryType: "FIXED",
            salaryMin: undefined,
            questions: [
                {
                    question: "",
                    questionType: "TEXT",
                    options: [],
                },
            ],
            hiringProcess: [

            ],
            salaryMax: undefined,
            salaryCurrency: "AUD",
            salaryInterval: "HOURLY",
            facilities: [],
            description: "",
            responsibilities: "",
            requirements: "",
            faqs: [
                {
                    question: "",
                    answer: "",
                },
            ],

        },
        mode: "onChange",
    });
    useEffect(() => {
        if (jobPostFormMethods.formState.errors) {
            console.log(jobPostFormMethods.formState.errors);
        }
        jobPostFormMethods.getValues("questions")?.forEach((item: any, index: number) => {
            if (item.options[item.options.length - 1] !== "") {
                jobPostFormMethods.setValue(`questions.${index}.options`, [...item.options, ""]);
            } else if (item.options.length > 1 && item.options[item.options.length - 2] === "") {
                jobPostFormMethods.setValue(`questions.${index}.options`, item.options.slice(0, item.options.length - 1));
            }
        });
        return () => { };
    }, [jobPostFormMethods.watch()]);

    const onSubmit = async () => {
        switch (step) {
            case 0: {
                let fieldsToBeValidated = [
                    "title",
                    "industry",
                    "location",
                    "locationPreference",
                    "employmentType",
                    "experienceLevel",
                    "minimumQualification",
                    "visaSponsorship",
                    "salaryType",
                    "salaryCurrency",
                    "salaryMin",
                    "salaryInterval",
                    "facilities",
                ]
                jobPostFormMethods.getValues("salaryType") === "RANGE" ? (
                    fieldsToBeValidated = [...fieldsToBeValidated, "salaryMax"]
                ) : (
                    fieldsToBeValidated.includes("salaryMax") && (fieldsToBeValidated = fieldsToBeValidated.filter((item) => item !== "salaryMax")),
                    jobPostFormMethods.clearErrors("salaryMax")
                )
                const valid = await jobPostFormMethods.trigger(
                    fieldsToBeValidated as any,
                    { shouldFocus: true }
                );
                if (jobPostFormMethods.getValues("salaryType") === "RANGE" && !jobPostFormMethods.getValues("salaryMax")) {
                    jobPostFormMethods.setError("salaryMax", {
                        message: "Maximum salary is required",
                        type: "manual",
                    });
                }
                if (jobPostFormMethods.getValues("salaryType") === "RANGE" && jobPostFormMethods.getValues("salaryMax") && parseInt(jobPostFormMethods.getValues("salaryMin") + '') > parseInt((jobPostFormMethods.getValues("salaryMax") as number || -1) + '')) {
                    jobPostFormMethods.setError("salaryMax", {
                        message: "Maximum salary must be greater than minimum salary",
                        type: "manual",
                    });
                }
                if (!valid) break;
                setStep(step + 1);
                break;
            }
            case 1:
                const valid = await jobPostFormMethods.trigger(["description", "responsibilities", "requirements", "faqs"], { shouldFocus: true });
                if (!valid) break;
                setStep(step + 1);
                break;
            case 2:
                const valid2 = await jobPostFormMethods.trigger(["questions"], { shouldFocus: true });
                if (!valid2) break;
                setStep(step + 1);
                break;
            case 3:
                const valid3 = await jobPostFormMethods.trigger(["hiringProcess"], { shouldFocus: true });
                if (!valid3) break;
                setStep(step + 1);
                break;
            default:
                break;
        }
    };

    return (
        <div className="bg-secondary flex flex-col justify-between items-between h-full min-h-[calc(100vw-900px)]">
            <div className="container py-4 flex gap-10 h-full min-w-[1000px] justify-between max-w-[1400px]">
                <div className="w-[300px] shrink-0 sticky top-2 h-fit">
                    <PostJobFormSteps steps={formSteps} />
                </div>
                <div className="bg-background p-6 h-fit rounded-lg w-full min-w-[700px]">
                    <FormProvider {...jobPostFormMethods}>
                        {step === 0 && <JobBasicDetailsForm />}
                        {step === 1 && <JobDescriptionForm />}
                        {step === 2 && <JobApplicableQuestionsForm />}
                        {step === 3 && <JobHiringProcessForm />}
                    </FormProvider>
                </div>
            </div>
            <div className="w-full h-16 p-4 sticky bottom-0 bg-white left-0 flex justify-end gap-4 items-center">
                <Button
                    onClick={() => {
                        setStep(step - 1);
                    }}
                    variant="secondary"
                >
                    Previous Step
                </Button>
                <Button onClick={onSubmit}>
                    {
                        step === formSteps.length - 1 ? "Post Job" : "Next Step"
                    }
                </Button>
            </div>
        </div>
    );
};

export default JobPostPage;

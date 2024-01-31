"use client"
import { useFormContext } from "react-hook-form"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { jobFacilitiesList } from "@/lib/jobFacilitiesList"
import { Checkbox } from "../ui/checkbox"
import { CurrencySchema, EmploymentTypeENUMSchema, ExperienceLevelSchema, IndustryENUMSchema, LocationPreferenceENUMSchema, MinimumQualificationSchema, SalaryIntervalSchema, SalaryTypeSchema } from "@/prisma/generated/zod"

export const JobBasicDetailsForm = () => {
    const methods = useFormContext()
    return (
        <div>
            <h2 className="text-xl font-medium">Basic Details</h2>
            <p className="text-sm text-muted-foreground py-3 mb-6 border-b-2">Please provide us with the basic details of your job. These details will be used to weed out candidates, so make sure that you provide accurate details. You can always edit it later</p>
            <div className="grid grid-cols-2 gap-8">
                <FormField
                    control={methods.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Job title" placeholder="Ex. Full stack web developer" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger label="Industry Type">
                                        <SelectValue placeholder="Select the industry type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(IndustryENUMSchema?.Values)?.map((industry, index) => (
                                            <SelectItem key={index} value={industry}>
                                                {industry.replaceAll("_", " ")}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input label="Location" placeholder="Ex. Galway, Ireland" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="locationPreference"
                    render={({ field }) => (
                        <FormItem >
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger label="Location Preference">
                                        <SelectValue placeholder="Select the location preferences" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(LocationPreferenceENUMSchema.Values).map((locationPreference, index) => (
                                            <SelectItem key={index} value={locationPreference}>
                                                {locationPreference.charAt(0).toUpperCase() + locationPreference.slice(1).toLowerCase().replace("_", "-")}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="employmentType"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger label="Employment Type">
                                        <SelectValue placeholder="Select the employment type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(EmploymentTypeENUMSchema.Values).map((employmentType, index) => (
                                            <SelectItem key={index} value={employmentType}>
                                                {employmentType.charAt(0).toUpperCase() + employmentType.slice(1).toLowerCase().replace("_", "-")}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="experienceLevel"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger label="Experience Level">
                                        <SelectValue placeholder="How experienced do you want your candidates to be?" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(ExperienceLevelSchema.Values).map((experienceLevel, index) => (
                                            <SelectItem key={index} value={experienceLevel}>
                                                {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1).toLowerCase().replace("_", " ")}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="minimumQualification"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger label="Minimum Qualification">
                                        <SelectValue placeholder="Minimum qualification of the applicants" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.values(MinimumQualificationSchema.Values).map((qualification, index) => (
                                            <SelectItem key={index} value={qualification}>
                                                {qualification.charAt(0).toUpperCase() + qualification.slice(1).toLowerCase().replace("_", " ")}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="visaSponsorship"
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger label="Visa Sponsorship">
                                        <SelectValue placeholder="Will you offer visa sponsorship" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="col-span-2">
                    <h2 className="text-xl font-medium">Salary & Facilities</h2>
                    <p className="text-sm text-muted-foreground py-3 mb-4 border-b-2">Please provide us information about the salary and the kinds of facilities you are going to pay to your employees</p>
                    <div>
                        <p className="font-medium text-lg mb-4">Salary</p>
                        <div className="flex flex-col w-full gap-6 mb-6">
                            <div className="grid gap-8 grid-cols-2">
                                <FormField
                                    control={methods.control}
                                    name="salaryType"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger label="Salary Type">
                                                        <SelectValue placeholder="Range" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent defaultValue="range">
                                                    {
                                                        Object.values(SalaryTypeSchema.Values).map((salaryType, index) => (
                                                            <SelectItem key={index} value={salaryType}>
                                                                {salaryType.charAt(0).toUpperCase() + salaryType.slice(1).toLowerCase().replace("_", " ")}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={methods.control}
                                    name="salaryCurrency"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger label="Currency">
                                                        <SelectValue placeholder="What currency are you gonna pay your employees in?" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent defaultValue="eur">
                                                    {
                                                        Object.values(CurrencySchema.Values).map((currency, index) => (
                                                            <SelectItem key={index} value={currency}>
                                                                {currency}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-8 grid-cols-3">
                                <FormField
                                    control={methods.control}
                                    name="salaryMin"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input type="number" label="Minimum Salary" placeholder="2000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={methods.control}
                                    name="salaryMax"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input type="number" label="Maximum Salary" placeholder="Ex. Galway, Ireland" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={methods.control}
                                    name="salaryInterval"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger label="Salary Interval">
                                                        <SelectValue placeholder="How often is the salary given" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        Object.values(SalaryIntervalSchema.Values).map((salaryInterval, index) => (
                                                            <SelectItem key={index} value={salaryInterval}>
                                                                {salaryInterval.charAt(0).toUpperCase() + salaryInterval.slice(1).toLowerCase().replace("_", " ")}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-lg mb-3">Facilities</p>
                            <FormField
                                control={methods.control}
                                name="facilities"
                                render={() => (
                                    <FormItem className="grid grid-cols-4 w-full gap-y-4 justify-between items-center">
                                        {jobFacilitiesList.map((item, index) => (
                                            <FormField
                                                key={item}
                                                control={methods.control}
                                                name={`facilities`}
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={index}
                                                            className="flex flex-row items-center gap-2 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item)}
                                                                    onCheckedChange={(checked) => {
                                                                        console.log(field.value)
                                                                        return checked
                                                                            ? field.onChange([...field.value, item])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value: string) => value !== item
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="text-sm font-normal mt-0">
                                                                {item}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
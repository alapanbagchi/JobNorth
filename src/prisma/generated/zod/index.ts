import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import {EmailExists} from '@/actions/UserAuthActions'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','password','avatar','designation','role','permissions']);

export const JobScalarFieldEnumSchema = z.enum(['id','industry','title','location','locationPreference','type','employmentType','experienceLevel','minimumQualification','visaSponsorship','salaryType','salaryMin','salaryMax','salaryCurrency','salaryInterval','facilities','description','responsibilities','requirements','tags','createdAt','updatedAt','image']);

export const JobHiringProcessScalarFieldEnumSchema = z.enum(['id','jobId','title','description']);

export const JobApplicantQuestionsScalarFieldEnumSchema = z.enum(['id','jobId','question','questionType','options']);

export const JobFAQScalarFieldEnumSchema = z.enum(['id','jobId','question','answer']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ADMIN','USER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const LocationPreferenceENUMSchema = z.enum(['REMOTE','ONSITE','BOTH']);

export type LocationPreferenceENUMType = `${z.infer<typeof LocationPreferenceENUMSchema>}`

export const EmploymentTypeENUMSchema = z.enum(['FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP','TEMPORARY']);

export type EmploymentTypeENUMType = `${z.infer<typeof EmploymentTypeENUMSchema>}`

export const ExperienceLevelSchema = z.enum(['BEGINNER','INTERMEDIATE','EXPERT']);

export type ExperienceLevelType = `${z.infer<typeof ExperienceLevelSchema>}`

export const MinimumQualificationSchema = z.enum(['HIGH_SCHOOL','ASSOCIATE','BACHELOR','MASTER','DOCTORATE','NONE']);

export type MinimumQualificationType = `${z.infer<typeof MinimumQualificationSchema>}`

export const QuestionTypeSchema = z.enum(['TEXT','MULTIPLE_CHOICE','SINGLE_CHOICE']);

export type QuestionTypeType = `${z.infer<typeof QuestionTypeSchema>}`

export const SalaryTypeSchema = z.enum(['FIXED','RANGE']);

export type SalaryTypeType = `${z.infer<typeof SalaryTypeSchema>}`

export const SalaryIntervalSchema = z.enum(['HOURLY','DAILY','WEEKLY','MONTHLY','YEARLY']);

export type SalaryIntervalType = `${z.infer<typeof SalaryIntervalSchema>}`

export const CurrencySchema = z.enum(['EUR','USD','GBP','INR','AUD','CAD','SGD','JPY']);

export type CurrencyType = `${z.infer<typeof CurrencySchema>}`

export const IndustryENUMSchema = z.enum(['Software_Development','Medical_and_Healthcare','Financial_Services','Retail_and_Ecommerce','Manufacturing','Education_and_Training','Information_Technology','Real_Estate','Animation_and_Graphic_Design','Event_Planning_and_Services','Insurance','Architecture_and_Planning','Renewable_Energy','Biotechnology','Art_and_Crafts']);

export type IndustryENUMType = `${z.infer<typeof IndustryENUMSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().max(255).min(1, {message: "Name is required"}),
  email: z.string().email().refine(async (val) => !(await EmailExists(val)), { message: 'Email already exists' }),
  emailVerified: z.boolean(),
  password: z.string().min(8, {message: "Password must be at least 8 characters long"}).max(255, {message: "Password must be less than 255 characters long"}),
  avatar: z.string(),
  designation: z.string().nullish(),
  role: z.string(),
  permissions: z.string().array(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const UserCustomValidatorsSchema = UserSchema

export type UserCustomValidators = z.infer<typeof UserCustomValidatorsSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().optional(),
  emailVerified: z.boolean().optional(),
  avatar: z.string().optional(),
  role: z.string().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// JOB SCHEMA
/////////////////////////////////////////

export const JobSchema = z.object({
  industry: IndustryENUMSchema,
  locationPreference: LocationPreferenceENUMSchema,
  employmentType: EmploymentTypeENUMSchema,
  experienceLevel: ExperienceLevelSchema,
  minimumQualification: MinimumQualificationSchema,
  salaryType: SalaryTypeSchema,
  salaryCurrency: CurrencySchema,
  salaryInterval: SalaryIntervalSchema,
  id: z.string(),
  title: z.string().min(1, { message: "Job title is required" }),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Job type is required"),
  visaSponsorship: z.coerce.boolean(),
  salaryMin: z.coerce.number().gte(1, "Salary is required"),
  salaryMax: z.coerce.number().nullish(),
  facilities: z.string().array(),
  description: z.string().min(1, "Job description is required"),
  responsibilities: z.string().min(1, {message: "Job requirements are required"}),
  requirements: z.string().min(1, {message: "Job requirements are required"}),
  /**
   * .array
   */
  tags: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string().nullish(),
})

export type Job = z.infer<typeof JobSchema>

// JOB OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobOptionalDefaultsSchema = JobSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}))

export type JobOptionalDefaults = z.infer<typeof JobOptionalDefaultsSchema>

/////////////////////////////////////////
// JOB HIRING PROCESS SCHEMA
/////////////////////////////////////////

export const JobHiringProcessSchema = z.object({
  id: z.string(),
  // omitted: jobId: z.string(),
  title: z.string().min(1, {message: "Title is required"}),
  description: z.string().nullish(),
})

export type JobHiringProcess = z.infer<typeof JobHiringProcessSchema>

// JOB HIRING PROCESS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobHiringProcessOptionalDefaultsSchema = JobHiringProcessSchema.merge(z.object({
  id: z.string().optional(),
}))

export type JobHiringProcessOptionalDefaults = z.infer<typeof JobHiringProcessOptionalDefaultsSchema>

/////////////////////////////////////////
// JOB APPLICANT QUESTIONS SCHEMA
/////////////////////////////////////////

export const JobApplicantQuestionsSchema = z.object({
  questionType: QuestionTypeSchema,
  id: z.string(),
  // omitted: jobId: z.string(),
  question: z.string().min(1, "Question is required"),
  /**
   * .array
   */
  options: z.string().array(),
})

export type JobApplicantQuestions = z.infer<typeof JobApplicantQuestionsSchema>

// JOB APPLICANT QUESTIONS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobApplicantQuestionsOptionalDefaultsSchema = JobApplicantQuestionsSchema.merge(z.object({
  id: z.string().optional(),
}))

export type JobApplicantQuestionsOptionalDefaults = z.infer<typeof JobApplicantQuestionsOptionalDefaultsSchema>

/////////////////////////////////////////
// JOB FAQ SCHEMA
/////////////////////////////////////////

export const JobFAQSchema = z.object({
  id: z.string(),
  // omitted: jobId: z.string(),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
})

export type JobFAQ = z.infer<typeof JobFAQSchema>

// JOB FAQ OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const JobFAQOptionalDefaultsSchema = JobFAQSchema.merge(z.object({
  id: z.string().optional(),
}))

export type JobFAQOptionalDefaults = z.infer<typeof JobFAQOptionalDefaultsSchema>

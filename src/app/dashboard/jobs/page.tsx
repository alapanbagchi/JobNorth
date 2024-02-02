"use client";
import JobCard from "@/components/Job/JobCard";
import Sidebar from "@/components/Sidebar/shards/Sidebar";
import { Job } from "@/prisma/generated/zod";
import { getTest } from "@/utils";
import { useEffect, useState } from "react";

const JobPostPage = () => {
    const testArray: Job[] = getTest("testJobs");
    const [step, setStep] = useState(0);

    useEffect(() => {}, []);

    // TODO: add differing grid cols based on screen size
    // TODO: add 'showing jobs' and sort function (inspo: https://dribbble.com/shots/14145979-Job-Search-Platform/attachments/5770876?mode=media)

    return (
        <div className="bg-muted">
            <div className="flex w-full container">
                <Sidebar className="w-[300px] border border-r-2" />
                <div className="flex-1 grid grid-cols-3 gap-4">
                    {testArray.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobPostPage;

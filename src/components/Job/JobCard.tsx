import { Job } from "@/prisma/generated/zod";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface JobCardProps {
    job: Job;
}

// TODO: change navAvatar in job title to actual image
const JobCard = ({ job }: JobCardProps) => {
    return (
        <div className="flex flex-col p-2 bg-white w-full gap-4">
            <div className="flex justify-between">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>...</div>
            </div>
            <div className="font-bold">{job.title}</div>
            <span className="text-muted-foreground">{job.description}</span>
            <div className="flex gap-2">
                {job.tags.map((tag) => (
                    <Badge variant="success">{tag}</Badge>
                ))}
            </div>
            <div className="flex gap-2 ">
                <Button className="whitespace-nowrap">Apply now</Button>
                <Button variant="secondary" className="flex-1">
                    Messages
                </Button>
            </div>
        </div>
    );
};

export default JobCard;

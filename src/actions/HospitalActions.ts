"use server"

import { auth, authGuard } from "@/auth"
import prisma from "@/prisma"
import { Hospital, Staff, StaffInvitation } from "@prisma/client";
// Make a function with a guard

export const getMyHospitals = (): Promise<ServerActionResponse<Hospital[] | undefined>> => authGuard(async () => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        // Find all the hospitals user is an admin of, a doctor of is invited to
        const hospitals = await prisma.hospital.findMany({
            where: {
                OR: [
                    { admin: { id: userId } },
                    { Staff: { some: { id: userId } } },
                    { StaffInvitation: { some: { id: userId } } }
                ]
            }
        });
        console.log(hospitals);
        return {
            success: true,
            message: "Hospital found",
            data: hospitals
        };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message,
            data: undefined
        };
    }
});

export const createHospital = (name: string): Promise<ServerActionResponse<Hospital | undefined>> => authGuard(async () => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        const hospital = await prisma.hospital.create({
            data: {
                name,
                admin: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return {
            success: true,
            message: "Hospital created",
            data: hospital
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            data: undefined
        };
    }
})

export const sendInvitation = (hospitalId: string, name: string, email: string, designation: string): Promise<ServerActionResponse<Hospital | undefined>> => authGuard(async (userid) => {
    try {
        const invitation = await prisma.staffInvitation.create({
            data: {
                name,
                email,
                Hospital: {
                    connect: {
                        id: hospitalId
                    }
                },
                designation
            }
        });
        return {
            success: true,
            message: "Invitation sent",
            data: undefined
        };
    }
    catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message,
            data: undefined
        };
    }
})

export const getInvitations = async () => {
    try {
        const session = await auth();
        const userEmail = session?.user.email;
        const invitations = await prisma.staffInvitation.findMany({
            where: {
                email: userEmail
            },
            include: {
                Hospital: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return {
            success: true,
            message: "Invitations found",
            data: invitations
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            data: undefined
        };
    }
}

export const acceptInvitation = (inviteId: string): Promise<ServerActionResponse<Hospital | undefined>> => authGuard(async (userid) => {
    try {
        const invitation = await prisma.staffInvitation.findUnique({
            where: {
                id: inviteId
            }
        })
        if (!invitation) {
            return {
                success: false,
                message: "Invitation not found",
                data: undefined
            };
        }
        // Delete the invitation
        await prisma.staffInvitation.delete({
            where: {
                id: inviteId
            }
        });
        // Add the user to the hospital
        const hospital = await prisma.staff.create({
            data: {
                name: invitation.name,
                designation: invitation.designation,
                Hospital: {
                    connect: {
                        id: invitation.hospitalId
                    }
                },
                id: userid,
                avatar: ""
            }
        });
        return {
            success: true,
            message: "Invitation accepted",
            data: hospital
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            data: undefined
        };
    }
})

export const getStaff = (hospitalid: string): Promise<ServerActionResponse<Staff[] | undefined>> => authGuard(async (userid) => {
    try {
        const staff = await prisma.staff.findMany({
            where: {
                Hospital: {
                    id: hospitalid
                }
            }
        });
        return {
            success: true,
            message: "Staff found",
            data: staff
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            data: undefined
        };
    }
})
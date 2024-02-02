import { User } from "@prisma/client";
import { extendTailwindMerge } from "tailwind-merge";

declare namespace Lucia {
    type Auth = import("./lucia.js").Auth;
    type DatabaseUserAttributes = User;
    type DatabaseSessionAttributes = {};
}

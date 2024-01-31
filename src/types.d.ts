import { User } from "@prisma/client";

declare namespace Lucia {
	type Auth = import("./lucia.js").Auth;
	type DatabaseUserAttributes = User
	type DatabaseSessionAttributes = {};
}
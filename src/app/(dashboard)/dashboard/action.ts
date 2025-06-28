"use server";

import { deleteSession } from "@/services/session.service";

export const logOutUser = async () => deleteSession();

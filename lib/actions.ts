"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";


export const createPitch = async (
    state: any, 
    form: FormData, 
    pitch: string
) => {
    const session = await auth();
    console.log("Session:", session);

    if (!session) 
        return parseServerActionResponse({ 
            error: "Unauthorized access", 
            status: "ERROR" 
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    );
    console.log("Form Data:", { title, description, category, link });

    if (!title || !description || !category || !link) {
        return parseServerActionResponse({
            error: "Missing required fields",
            status: "ERROR",
        });
    }

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title, 
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: session?.id
                ? {
                      _type: "reference",
                      _ref: session.id,
                  }
                : null,
            pitch,
        };

        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({
            ...result,
            error: '',
            status: "SUCCESS",
        });
    } catch (error) {
        console.log("Error creating pitch:", error);

        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }
};
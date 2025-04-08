"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter(); 

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            // Validate the form values
            await formSchema.parseAsync(formValues);

            console.log(formValues);

            // Reset errors if validation passes
            setErrors({});

            // Submit the form (e.g., call an API)
            // const result = await createIdea(prevState, formData, pitch);
            // console.log(result);

            // if (result.status === "SUCCESS") {
            //     toast({
            //         title: "Success",
            //         description: "Your startup idea has been submitted successfully.",
            //         variant: "default",
            //     });

            //     router.push(`/startup/${result.id}`); // Redirect to the home page after successful submission
            // }

            // return result;
            
        } catch (error: any) {
            // Catch validation errors and update the errors state
            if (error.name === "ZodError") {
                const validationErrors: Record<string, string> = {};
                error.errors.forEach((err: any) => {
                    validationErrors[err.path[0]] = err.message;
                });
                setErrors(validationErrors);
                toast({
                    title: "Validation Error",
                    description: "Please check the form fields.",
                    variant: "destructive",
                });
            }

            toast({
                title: "Error",
                description: "An error occurred while submitting the form",
                variant: "destructive",
            });

            return {
                ...prevState,
                error: "An error occurred while submitting the form.",
                status: "ERROR",
            }
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className="startup-form max-w-md mx-auto space-y-6">
            <div className="form-group">
                <label
                    htmlFor="title"
                    className="startup-form_label block text-sm font-medium text-gray-700"
                >
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    className="startup-form_input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                    placeholder="Startup Title"
                />
                {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="description"
                    className="startup-form_label block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                    placeholder="Startup Description"
                />
                {errors.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="category"
                    className="startup-form_label block text-sm font-medium text-gray-700"
                >
                    Category
                </label>
                <input
                    id="category"
                    name="category"
                    className="startup-form_input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                    placeholder="Startup Category (Cars, Agriculture, Health)"
                />
                {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="link"
                    className="startup-form_label block text-sm font-medium text-gray-700"
                >
                    Image URL
                </label>
                <input
                    id="link"
                    name="link"
                    className="startup-form_input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                    placeholder="Startup Image URL"
                />
                {errors.link && (
                    <p className="text-red-500 text-xs mt-1">{errors.link}</p>
                )}
            </div>

            <div className="form-group" data-color-mode="light">
                <label
                    htmlFor="pitch"
                    className="startup-form_label block text-sm font-medium text-gray-700"
                >
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    className="startup-form_textarea mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Tell us about your idea and what it will solve",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && (
                    <p className="text-red-500 text-xs mt-1">{errors.pitch}</p>
                )}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit"}
                <Send className="size-6 ml-2" />
            </Button>
        </form>
    );
};

export default StartupForm;
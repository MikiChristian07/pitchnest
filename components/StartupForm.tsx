"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    return (
        <form action={() => {}} className="startup-form max-w-md mx-auto space-y-6">
            <div className="form-group">
                <label
                    htmlFor="title"
                    className=" startup-form_label block text-sm font-medium text-gray-700"
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
                    <p className="text-green-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="description"
                    className=" startup-form_label block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <Textarea
                    id="title"
                    name="title"
                    className="startup-form_input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                    placeholder="Startup Title"
                />
                {errors.title && (
                    <p className="text-green-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="title"
                    className=" startup-form_label block text-sm font-medium text-gray-700"
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
                    <p className="text-green-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>

            <div className="form-group">
                <label
                    htmlFor="title"
                    className=" startup-form_label block text-sm font-medium text-gray-700"
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
                    <p className="text-green-500 text-xs mt-1">{errors.title}</p>
                )}
            </div>
        </form>
    );
};

export default StartupForm;
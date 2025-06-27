"use client";
import React from "react";

export default function RegistrationForm() {
    return (
        <div className="registration-form">
            <h2 className="text-2xl font-bold mb-6">Create Account</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

import ButtonLink from "@/components/custom/button-link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-8xl font-thin mb-4">404</h1>
      <p className="text-lg text-gray-600 font-light mb-6">
        Property does not exist
      </p>
      <ButtonLink href="/">Back to Home Page</ButtonLink>
    </div>
  );
}

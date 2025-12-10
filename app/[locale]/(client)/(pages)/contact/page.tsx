import Title from "@/components/custom/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="min-h-full">
      <Title
        type="with_icon"
        title="We're Here to Help"
        description="Our team is here to help you every step of the way"
        Icon={MessageSquare}
      />
      <div
        data-component="contact-form"
        className="mt-10 max-w-[600px] mx-auto bg-white shadow rounded-xl p-8"
      >
        <form className="w-full flex flex-col gap-5">
          <label htmlFor="name" className="block font-medium">
            Name
            <Input
              type="name"
              id="name"
              name="client name"
              placeholder="Safwan Mohamed"
              title="Name"
              className="mt-2"
            />
          </label>
          <label htmlFor="email" className="block font-medium">
            Email
            <Input
              type="email"
              id="email"
              name="client email"
              placeholder="safwanmabdo@gmail.com"
              title="Email"
              className="mt-2"
            />
          </label>
          <label htmlFor="message" className="block font-medium">
            Message
            <Textarea
              id="message"
              name="client message"
              placeholder="Write your message"
              title="Message"
              className="min-h-40 mt-2"
            />
          </label>
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

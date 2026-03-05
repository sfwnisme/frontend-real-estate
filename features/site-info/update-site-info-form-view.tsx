import InputWrapper from "@/components/custom/input-wrapper";
import { Typography } from "@/components/custom/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/dashboard/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Info, Languages } from "lucide-react";

export default function UpdateSiteInfoFormView() {
  return (
    <div>
      <form>
        <Accordion
          type="multiple"
          // collapsible
          defaultValue={["shipping", "returns", "support"]}
          // className="max-w-lg"
        >
          <AccordionItem value="shipping">
            <AccordionTrigger icon={Info}>
              <Typography as="p" variant="p">
                General Information{" "}
              </Typography>
              <Typography as="p" variant="muted">
                Basic site identification and content
              </Typography>
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <Badge variant="secondary"><Languages /> English</Badge>
                <InputWrapper title="Site Name" >
                  <Input type="text" placeholder="Site Name" />
                </InputWrapper>
                <InputWrapper title="Physical Address">
                  <Input type="text" placeholder="Physical Address" />
                </InputWrapper>
                <InputWrapper title="Site Description">
                  <Input type="text" placeholder="Site Description" />
                </InputWrapper>
              </div>
              <div className="flex flex-col gap-4">
                <Badge variant="secondary"><Languages /> Arabic</Badge>
                <InputWrapper title="Site Name">
                  <Input type="text" placeholder="Site Name" />
                </InputWrapper>
                <InputWrapper title="Physical Address">
                  <Input type="text" placeholder="Physical Address" />
                </InputWrapper>
                <InputWrapper title="Site Description">
                  <Input type="text" placeholder="Site Description" />
                </InputWrapper>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              Returns accepted within 30 days. Items must be unused and in
              original packaging. Refunds processed within 5-7 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="support">
            <AccordionTrigger>
              How can I contact customer support?
            </AccordionTrigger>
            <AccordionContent>
              Reach us via email, live chat, or phone. We respond within 24
              hours during business days.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </div>
  );
}

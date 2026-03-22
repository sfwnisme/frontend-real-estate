"use client";

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
import { cn, formatDate } from "@/lib/utils";
import { SiteInfo } from "@/types/types";
import {
  BadgeCheck,
  Blocks,
  Globe,
  Info,
  Languages,
  Loader2,
  Settings2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import useUpdateSiteInfoFormValidation from "../../hooks/use-update-site-info-form-validation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  data: SiteInfo;
};

export default function UpdateSiteInfoFormView({ data }: Props) {
  const { form, onSubmit, isPending } = useUpdateSiteInfoFormValidation(data);
  const tTitles = useTranslations("SiteInfo.titles");
  const tDescriptions = useTranslations("SiteInfo.descriptions");
  const tLabels = useTranslations("SiteInfo.labels");
  const tCommonLabels = useTranslations("common.labels");
  const tCommonActions = useTranslations("common.actions");
  const locale = useLocale();

  console.log(
    "form.watch('settings.maintenanceMode')",
    form.watch("settings.maintenanceMode"),
  );

  const { ar, en, contact, marketing, settings, updatedAt } = data;

  const onMaintenanceModeChange = (value: boolean) => {
    console.log("triggered onMaintenanceModeChange");
    form.setValue("settings.maintenanceMode", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  // Enable form edit by default
  const [enableFormEdit, setEnableFormEdit] = useState(false);

  const toggleFormEdit = () => {
    setEnableFormEdit(enableFormEdit);
  };

  return (
    <div>
      <Typography as="small" size="xs" variant="muted">
        {tCommonLabels("lastUpdated")}
        {formatDate(updatedAt, undefined, locale, true)}
      </Typography>
      <form onSubmit={onSubmit}>
        <Accordion
          type="multiple"
          defaultValue={["site-info"]}
        >
          <AccordionItem
            value="site-info"
            data-component="site-info-general-information"
          >
            <AccordionTrigger icon={Info}>
              <Typography as="p" size="sm">
                {tTitles("generalInformation")}
              </Typography>
              <Typography as="p" size="sm" variant="muted">
                {tDescriptions("generalInformation")}
              </Typography>
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-8 grid-flow-col-dense">
              <div
                className={cn(
                  "flex flex-col gap-4",
                  locale === "ar" ? "-order-1" : "order-1",
                )}
                dir="rtl"
              >
                <Badge variant="secondary">
                  <Languages /> {tCommonLabels("arabic")}
                </Badge>
                <InputWrapper title={tLabels("siteName")}>
                  <Input
                    type="text"
                    {...form.register("ar.info.name")}
                    placeholder={tLabels("siteName")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("physicalAddress")}>
                  <Input
                    type="text"
                    {...form.register("ar.info.address")}
                    placeholder={tLabels("physicalAddress")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("siteDescription")}>
                  <Input
                    type="text"
                    {...form.register("ar.info.description")}
                    placeholder={tLabels("siteDescription")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
              </div>
              <div className="flex flex-col gap-4" dir="ltr">
                <Badge variant="secondary">
                  <Languages /> {tCommonLabels("enEnglish")}
                </Badge>
                <InputWrapper title={tLabels("siteName")}>
                  <Input
                    type="text"
                    {...form.register("en.info.name")}
                    placeholder={tLabels("siteName")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("physicalAddress")}>
                  <Input
                    type="text"
                    {...form.register("en.info.address")}
                    placeholder={tLabels("physicalAddress")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("siteDescription")}>
                  <Input
                    type="text"
                    {...form.register("en.info.description")}
                    placeholder={tLabels("siteDescription")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="site-seo" data-component="site-seo-settings">
            <AccordionTrigger icon={Globe}>
              <Typography as="p" size="sm">
                {tTitles("seo")}
              </Typography>
              <Typography as="p" size="sm" variant="muted">
                {tDescriptions("seo")}
              </Typography>
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-8 grid-flow-col-dense">
              <div
                className={cn(
                  "flex flex-col gap-4",
                  locale === "ar" ? "-order-1" : "order-1",
                )}
                dir="rtl"
              >
                <Badge variant="secondary">
                  <Languages /> {tCommonLabels("arabic")}
                </Badge>
                <InputWrapper title={tLabels("metaTitle")}>
                  <Input
                    type="text"
                    {...form.register("ar.seo.title")}
                    placeholder={tLabels("metaTitle")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("metaDescription")}>
                  <Input
                    type="text"
                    {...form.register("ar.seo.description")}
                    placeholder={tLabels("metaDescription")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("keywords")}>
                  <Input
                    type="text"
                    {...form.register("ar.seo.keywords")}
                    placeholder={tLabels("keywords")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
              </div>
              <div className="flex flex-col gap-4" dir="ltr">
                <Badge variant="secondary">
                  <Languages /> {tCommonLabels("enEnglish")}
                </Badge>
                <InputWrapper title={tLabels("metaTitle")}>
                  <Input
                    type="text"
                    {...form.register("en.seo.title")}
                    placeholder={tLabels("metaTitle")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("metaDescription")}>
                  <Input
                    type="text"
                    {...form.register("en.seo.description")}
                    placeholder={tLabels("metaDescription")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
                <InputWrapper title={tLabels("keywords")}>
                  <Input
                    type="text"
                    {...form.register("en.seo.keywords")}
                    placeholder={tLabels("keywords")}
                    disabled={enableFormEdit}
                  />
                </InputWrapper>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="site-contact"
            data-component="site-contact-information"
          >
            <AccordionTrigger icon={BadgeCheck}>
              <Typography as="p" size="sm">
                {tTitles("socialMedia")}
              </Typography>
              <Typography as="p" size="sm" variant="muted">
                {tDescriptions("socialMedia")}
              </Typography>
            </AccordionTrigger>
            <AccordionContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputWrapper title={tLabels("email")}>
                <Input
                  type="text"
                  {...form.register("contact.email")}
                  placeholder={tLabels("email")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("facebook")}>
                <Input
                  type="text"
                  {...form.register("contact.facebook")}
                  placeholder={tLabels("facebook")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("instagram")}>
                <Input
                  type="text"
                  {...form.register("contact.instagram")}
                  placeholder={tLabels("instagram")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("linkedin")}>
                <Input
                  type="text"
                  {...form.register("contact.linkedin")}
                  placeholder={tLabels("linkedin")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("phone")}>
                <Input
                  type="text"
                  {...form.register("contact.phone")}
                  placeholder={tLabels("phone")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("snapchat")}>
                <Input
                  type="text"
                  {...form.register("contact.snapchat")}
                  placeholder={tLabels("snapchat")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("tiktok")}>
                <Input
                  type="text"
                  {...form.register("contact.tiktok")}
                  placeholder={tLabels("tiktok")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="site-marketing"
            data-component="site-marketing-settings"
          >
            <AccordionTrigger icon={Blocks}>
              <Typography as="p" size="sm">
                {tTitles("marketingAndIntegrations")}
              </Typography>
              <Typography as="p" size="sm" variant="muted">
                {tDescriptions("marketingAndIntegrations")}
              </Typography>
            </AccordionTrigger>
            <AccordionContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputWrapper title={tLabels("googleMerchant")}>
                <Input
                  type="text"
                  {...form.register("marketing.googleMerchant")}
                  placeholder={tLabels("googleMerchant")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("googleSearchConsole")}>
                <Input
                  type="text"
                  {...form.register("marketing.googleSearchConsole")}
                  placeholder={tLabels("googleSearchConsole")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
              <InputWrapper title={tLabels("googleTagManager")}>
                <Input
                  type="text"
                  {...form.register("marketing.googleTagManager")}
                  placeholder={tLabels("googleTagManager")}
                  disabled={enableFormEdit}
                />
              </InputWrapper>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="site-settings" data-component="site-settings">
            <AccordionTrigger icon={Settings2}>
              <Typography as="p" size="sm">
                {tTitles("advancedSettings")}
              </Typography>
              <Typography as="p" size="sm" variant="muted">
                {tDescriptions("advancedSettings")}
              </Typography>
            </AccordionTrigger>
            <AccordionContent className="grid gap-4">
              <div className="bg-warning-foreground p-4 rounded-sm">
                <Label className="flex items-start gap-3 rounded-lg cursor-pointer">
                  <Checkbox
                    name="settings.maintenanceMode"
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
                    checked={form.getValues("settings.maintenanceMode")}
                    onCheckedChange={(value: boolean) =>
                      onMaintenanceModeChange(value)
                    }
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      {tLabels("maintenanceMode")}
                    </p>
                    <small className="text-muted-foreground">
                      {tDescriptions("maintenanceMode")}
                    </small>
                  </div>
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-4" />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            tCommonActions("save")
          )}
        </Button>
      </form>
    </div>
  );
}

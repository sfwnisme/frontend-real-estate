import UpdateSiteInfoFormView from "@/features/site-info/update-site-info-form-view";
import { getSiteInfo } from "@/lib/requests";
import { notFound } from "next/navigation";

export default async function page() {
  const siteInfo = await getSiteInfo();
  console.log(siteInfo);
  if (!siteInfo.data || siteInfo.status !== 200) {
    return notFound();
  }
  return (
    <>
      <UpdateSiteInfoFormView data={siteInfo.data} />
    </>
  );
}

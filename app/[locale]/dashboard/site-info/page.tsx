import { getSiteInfoImage } from "@/features/site-info/lib/requests";
import CreateSiteInfoIconDarkFormView from "@/features/site-info/views/mutation-views/create-site-info-icon-dark-form-view";
import CreateSiteInfoIconFormView from "@/features/site-info/views/mutation-views/create-site-info-icon-form-view";
import CreateSiteInfoLogoDarkFormView from "@/features/site-info/views/mutation-views/create-site-info-logo-dark-form-view";
import CreateSiteInfoLogoFormView from "@/features/site-info/views/mutation-views/create-site-info-logo-form-view";
import CreateSiteInfoOgImageFormView from "@/features/site-info/views/mutation-views/create-site-info-og-image-form-view";
import UpdateSiteInfoFormView from "@/features/site-info/views/mutation-views/update-site-info-form-view";
import { getSiteInfo } from "@/lib/requests";
import { notFound } from "next/navigation";

export default async function page() {
  const siteInfo = await getSiteInfo();
  if (!siteInfo.data || siteInfo.status !== 200) {
    return notFound();
  }
  console.log("page triggered");
  const [getIcon, getIconDark, getLogo, getLogoDark, getOgImage] =
    await Promise.all([
      getSiteInfoImage("icon", "theme_default"),
      getSiteInfoImage("icon", "theme_dark"),
      getSiteInfoImage("logo", "theme_default"),
      getSiteInfoImage("logo", "theme_dark"),
      getSiteInfoImage("og-image", null),
    ]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CreateSiteInfoIconFormView data={getIcon} />
        <CreateSiteInfoIconDarkFormView data={getIconDark} />
        <CreateSiteInfoLogoFormView data={getLogo} />
        <CreateSiteInfoLogoDarkFormView data={getLogoDark} />
        <div className="col-span-full">
          <CreateSiteInfoOgImageFormView data={getOgImage} />
        </div>
      </div>
      <UpdateSiteInfoFormView data={siteInfo.data} />
    </>
  );
}

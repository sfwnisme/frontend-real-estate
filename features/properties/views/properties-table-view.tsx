import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperties } from "@/lib/requests";
import { ButtonGroup } from "@/components/ui/button-group";
import { PAGINATION_CONFIG } from "@/constants/enums";
import { modalQuery } from "@/lib/utils";
import { PAGES_ROUTES } from "@/constants/config";
import can from "@/features/dashboard/auth/can";
import { Visible } from "@sfwnisme/visi";
import { getLocale, getTranslations } from "next-intl/server";
type Props = {
  currentPage: number;
  searchParams: { [key: string]: string | undefined };
};

export default async function PropertiesTableView({
  currentPage,
  searchParams,
}: Props) {
  const locale = await getLocale();
  const tTable = await getTranslations("common.table.headers");
  const tActions = await getTranslations("common.actions");
  const tUnits = await getTranslations("common.units");
  console.log(tTable("title"));
  const properties = await getProperties(
    PAGINATION_CONFIG.PROPERTIES.DASHBOARD,
    currentPage,
  );
  const propertiesData = properties.data?.data;
  if (!propertiesData || propertiesData?.length === 0) {
    return notFound();
  }
  const canDeleteProperty = await can("property.delete");
  const canEditProperty = await can("property.update");

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{tTable("name")}</TableHead>
            <TableHead className="text-start">{tTable("price")}</TableHead>
            <TableHead className="text-start">{tTable("size")}</TableHead>
            <TableHead className="text-start">{tTable("yearBuilt")}</TableHead>
            <TableHead className="text-start">{tTable("type")}</TableHead>
            <TableHead className="text-start w-20">
              {tTable("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propertiesData.map((property) => (
            <TableRow key={property._id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>
                {property.price.toLocaleString("ar", {
                  style: "currency",
                  currency: "SAR",
                })}
              </TableCell>
              <TableCell className="flex">
                {property.propertySize}
                <span>{tUnits("squareMeter")}</span>
              </TableCell>
              <TableCell className="text-start">{property.yearBuilt}</TableCell>
              <TableCell className="text-start">
                {property.propertyType}
              </TableCell>
              <TableCell className="text-end w-fit">
                <div className="inline-flex items-center gap-2">
                  <ButtonGroup
                    orientation={
                      locale === "en" ? "horizontal" : "horizontalAr"
                    }
                  >
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`${PAGES_ROUTES.PROPERTIES.PREVIEW}/${property.slug}`}
                      >
                        {tActions("open")}
                      </Link>
                    </Button>
                    <Visible when={canEditProperty}>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`${PAGES_ROUTES.PROPERTIES.UPDATE}/${property.slug}`}
                        >
                          <Pencil />
                        </Link>
                      </Button>
                    </Visible>
                  </ButtonGroup>
                  <Visible when={canDeleteProperty}>
                    <Link
                      href={modalQuery(
                        "delete",
                        "property",
                        property._id,
                        searchParams,
                      )}
                      prefetch={true}
                    >
                      <Button variant="secondary" size="sm">
                        <Trash />
                      </Button>
                    </Link>
                  </Visible>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

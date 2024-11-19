import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DynamicBreadcrumb() {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean) // Remove empty segments caused by leading/trailing slashes
    .map((segment, index, arr) => {
      const path = `/${arr.slice(0, index + 1).join("/")}`;
      return { name: decodeURIComponent(segment), path };
    });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, idx) => (
          <BreadcrumbItem key={segment.path}>
            {idx !== pathSegments.length - 1 ? (
              <>
                <BreadcrumbLink href={segment.path}>
                  {segment.name}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              // Current page is not a link
              <BreadcrumbPage>{segment.name}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

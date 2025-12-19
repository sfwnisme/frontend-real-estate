import { NextRequest, NextResponse } from "next/server";
import { Permission, rolePermissions } from "@/constants/permissions";
import { UserRoles } from "@/types/types";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const protectedRoutes = "/dashboard";

type RoutePermission = {
  path: string;
  permission: Permission;
  exact: boolean;
};

const routePermissions: RoutePermission[] = [
  {
    path: "/dashboard/users/create",
    permission: "user.write",
    exact: true,
  },
  {
    path: "/dashboard/users/update",
    permission: "user.update",
    exact: false,
  },
  {
    path: "/dashboard/users",
    permission: "user.read",
    exact: false,
  },
  {
    path: "/dashboard/properties/create",
    permission: "property.write",
    exact: true,
  },
  {
    path: "/dashboard/properties/update",
    permission: "property.update",
    exact: false,
  },
  {
    path: "/dashboard/properties",
    permission: "property.read",
    exact: false,
  },
  {
    path: "/dashboard/blog-posts/create",
    permission: "blogpost.write",
    exact: true,
  },
  {
    path: "/dashboard/blog-posts/update",
    permission: "blogpost.update",
    exact: false,
  },
  { path: "/dashboard/blog-posts", permission: "blogpost.read", exact: false },
];

function hasPermission(role: UserRoles, permission: Permission): boolean {
  const permissions = rolePermissions[role];
  return permissions?.includes(permission) ?? false;
}

function getRequiredPermission(path: string): Permission | null {
  for (const route of routePermissions) {
    const isMatch: boolean =
      route.exact === false ? path.startsWith(route.path) : path === route.path;

    if (isMatch) {
      return route.permission;
    }
  }
  return null;
}

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Run next-intl middleware first to handle locale detection/routing
  const intlResponse = intlMiddleware(req);

  // Check if it's a protected route
  const isProtectedRoute = path.startsWith(protectedRoutes);
  const token = req.cookies.get("TOKEN")?.value;
  const userRole = req.cookies.get("USER_ROLE")?.value as UserRoles | undefined;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const requiredPermission = getRequiredPermission(path);

  if (requiredPermission) {
    if (!userRole || !hasPermission(userRole, requiredPermission)) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  // Return the intl response (which includes locale headers/cookies)
  return intlResponse;
}

export const config = {
  // Match all pathnames except for:
  // - API routes, trpc, _next, _vercel
  // - Files with extensions (e.g., favicon.ico)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};

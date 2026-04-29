import { PAGES_ROUTES } from "@/constants/config";
import { test, expect } from "@playwright/test";
/** Chunk 1.1 — Login page renders (Day 1, ~1h)
 * Navigate to /login and verify the form is visible: email field, password field, submit button.
 * Verify page title / main heading is correct.
 */

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("login");
  });
  test("scan login page", async ({ page }) => {
    await expect(page).toHaveTitle("Login | Real Estate");
  });

  test("scan login form", async ({ page }) => {
    await expect(
      page.getByTestId("login-form"), 
      "form element"
    ).toBeVisible()
    
    await expect(
      page.locator("[type=email][name=email]"),
      "email input",
    ).toBeVisible();
    await expect(
      page.locator("[type=password]"),
      "password input",
    ).toBeVisible();
    await expect(
      page.getByRole("button", {name: /login/i}), "login input"
    ).toBeVisible()
  });

  test("act login", async({page}) => {
    await page.locator("[type=email][name=email]").fill("admin@admin.admin")
    await page.locator("[type=password][name=password]").fill("admin")
    await Promise.all([
      page.getByRole("button", { name: /login/i }).click(),
      page.waitForURL(`**/${PAGES_ROUTES.DASHBOARD}`),
    ]);
    await expect(page, "redirect to dashboard").toHaveURL("dashboard");
  })
});

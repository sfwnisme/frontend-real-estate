import { PAGES_ROUTES } from "@/constants/config";
import { test, expect } from "@playwright/test";
import { locale } from "./helpers";
/** Chunk 1.1 — Login page renders (Day 1, ~1h)
 * Navigate to /login and verify the form is visible: email field, password field, submit button.
 * Verify page title / main heading is correct.
 */

const { E2E_EMAIL, E2E_PASS } = process.env;

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(locale("/login"));
  });
  test("scan login page", async ({ page }) => {
    await expect(page).toHaveTitle("Login | Real Estate");
  });

  test("scan login form", async ({ page }) => {
    await expect(page.getByTestId("login-form"), "form element").toBeVisible();

    await expect(
      page.locator("[type=email][name=email]"),
      "email input",
    ).toBeVisible();
    await expect(
      page.locator("[type=password]"),
      "password input",
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /login/i }),
      "login input",
    ).toBeVisible();
  });

  test("act login and redirect to dashboard", async ({ page }) => {
    await page.locator("[type=email][name=email]").fill(E2E_EMAIL!);
    await page.locator("[type=password][name=password]").fill(E2E_PASS!);
    await page.getByRole("button", { name: /login/i }).click();
    await expect(page, "redirect to dashboard").toHaveURL(locale(PAGES_ROUTES.DASHBOARD));
  });
});

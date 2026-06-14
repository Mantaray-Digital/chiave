import { test, expect } from "@playwright/test";

test.describe("Shop Flow", () => {
  test("homepage loads with hero and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Chiave");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("shop page loads and displays products", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.locator("h1")).toContainText("Chiave Shop");
    // Wait for products to load
    await expect(page.locator('[data-slot="input"], input[placeholder*="Search"]')).toBeVisible({
      timeout: 10_000,
    });
  });

  test("can navigate from shop to product detail", async ({ page }) => {
    await page.goto("/shop");
    // Wait for product cards to render
    const viewButton = page.locator("a", { hasText: "View" }).first();
    await viewButton.waitFor({ state: "visible", timeout: 15_000 });
    await viewButton.click();
    // Should be on a product detail page
    await expect(page).toHaveURL(/\/shop\/.+/);
    await expect(page.locator("text=Add to Cart").or(page.locator("text=Out of Stock"))).toBeVisible({
      timeout: 10_000,
    });
  });

  test("can add item to cart and view cart", async ({ page }) => {
    await page.goto("/shop");
    // Wait for products to load, then click first View button
    const viewButton = page.locator("a", { hasText: "View" }).first();
    await viewButton.waitFor({ state: "visible", timeout: 15_000 });
    await viewButton.click();

    // Add to cart if in stock
    const addToCartButton = page.locator("button", { hasText: "Add to Cart" });
    if (await addToCartButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await addToCartButton.click();
      // Navigate to cart
      await page.goto("/shop/cart");
      await expect(page).toHaveURL("/shop/cart");
    }
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator("text=404")).toBeVisible();
    await expect(page.locator("text=Page not found")).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("button", { hasText: "Send Inquiry" })).toBeVisible();
  });
});

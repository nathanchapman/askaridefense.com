import { expect, test } from "@playwright/test"

test("homepage matches the measured desktop section layout", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/")
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ASKARI")
  const sections = {
    home: 900,
    mission: 620,
    arsenal: 1815.25,
    winter: 900,
    advantage: 1643.25,
    careers: 811,
    press: 857,
  }
  for (const [id, height] of Object.entries(sections)) {
    const actual = await page
      .locator(`#${id}`)
      .evaluate((element) => element.getBoundingClientRect().height)
    expect(Math.abs(actual - height), id).toBeLessThan(1)
  }
  await expect(page.locator("#press article")).toHaveCount(5)
  expect(errors).toEqual([])
})

test("product controls and local inquiry form work with keyboard dismissal", async ({
  page,
}) => {
  await page.goto("/")
  const product = page.getByRole("article", { name: "RIFT ALPHA", exact: true })
  await product.getByRole("button", { name: "MODEL", exact: true }).click()
  await expect(
    product.getByRole("button", { name: "MODEL", exact: true }),
  ).toHaveAttribute("aria-pressed", "true")
  await expect(
    product.locator('video[src="/videos/fin_alpha.mp4"]'),
  ).toBeVisible()
  const launch = product.getByRole("button", {
    name: "LAUNCH RIFT ALPHA",
    exact: true,
  })
  await launch.click()
  const dialog = page.getByRole("dialog", { name: "LAUNCH RIFT ALPHA" })
  await expect(dialog.getByLabel("MESSAGE")).toHaveValue(
    "I'm interested in RIFT ALPHA. ",
  )
  await dialog.getByLabel("NAME", { exact: true }).fill("Demo Visitor")
  await dialog.getByLabel("EMAIL", { exact: true }).fill("demo@example.com")
  await dialog.getByRole("button", { name: "REQUEST LAUNCH" }).click()
  await expect(dialog.getByRole("status")).toContainText(
    "Your message has not been sent",
  )
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
  await expect(launch).toBeFocused()
  await product.getByRole("button", { name: "VIDEO", exact: true }).click()
  await expect(
    product.getByRole("button", { name: "VIDEO", exact: true }),
  ).toHaveAttribute("aria-pressed", "true")
})

test("mobile layout and menu navigate without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.evaluate(() => document.fonts.ready)
  await page.locator("#mission").scrollIntoViewIfNeeded()
  await page.getByRole("button", { name: "Toggle menu" }).click()
  const menu = page.getByRole("dialog", { name: "Navigation menu" })
  await expect(menu).toBeVisible()
  await menu.getByRole("link", { name: "ARMORY", exact: true }).click()
  await expect(menu).not.toBeVisible()
  await expect(page).toHaveURL(/#arsenal$/)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  const sections = {
    home: 844,
    mission: 431.765625,
    arsenal: 2153.109375,
    winter: 844,
    advantage: 1733.578125,
    careers: 694.328125,
    press: 485,
  }
  for (const [id, height] of Object.entries(sections)) {
    const actual = await page
      .locator(`#${id}`)
      .evaluate((element) => element.getBoundingClientRect().height)
    expect(Math.abs(actual - height), id).toBeLessThan(1)
  }
  await page.getByRole("button", { name: "CONTACT", exact: true }).click()
  await expect(
    page.getByRole("dialog", { name: "CONTACT", exact: true }),
  ).toBeVisible()
  await page.getByRole("button", { name: "Close contact" }).click()
  await expect(page.getByRole("dialog")).not.toBeVisible()
})

for (const [path, heading] of [
  ["/join", "JOIN THE MISSION"],
  ["/values", "OUR VALUES"],
  ["/press", "IN THE PRESS"],
  ["/press/lore", "CompAny Lore"],
  ["/privacy", "Website User Agreement & Disclaimers"],
  ["/tou", "Terms of Use"],
]) {
  test(`${path} renders locally`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    if (path === "/values") {
      await expect(
        page.getByText("We are three engineers from Georgia Tech.", {
          exact: false,
        }),
      ).toBeAttached()
    }
  })
}

test("the press link opens the local company story", async ({ page }) => {
  await page.goto("/press")
  await page
    .getByRole("link")
    .filter({ has: page.getByRole("heading", { name: "CompAny Lore" }) })
    .click()
  await expect(page).toHaveURL(/\/press\/lore$/)
})

test("mobile dialogs restore focus and keep contact scroll locked", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/join")
  const trigger = page.getByRole("button", { name: "Toggle menu" })
  const menu = page.getByRole("dialog", { name: "Navigation menu" })
  await trigger.click()
  await expect(menu.getByRole("button", { name: "Close menu" })).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(
    menu.getByRole("button", { name: "CONTACT", exact: true }),
  ).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(menu).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await menu.getByRole("button", { name: "Close menu" }).click()
  await expect(trigger).toBeFocused()

  await trigger.click()
  await menu.getByRole("button", { name: "CONTACT", exact: true }).click()
  const contact = page.getByRole("dialog", { name: "CONTACT", exact: true })
  await expect(menu).not.toBeVisible()
  await expect(contact.getByLabel("NAME", { exact: true })).toBeFocused()
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden")
  await page.keyboard.press("Shift+Tab")
  await expect(
    contact.getByRole("button", { name: "Close contact" }),
  ).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(
    contact.getByRole("button", { name: "SEND MESSAGE" }),
  ).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(contact).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
})

test("reduced motion keeps media still and the page readable", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect
    .poll(() =>
      page
        .locator("#home video")
        .evaluate((video: HTMLVideoElement) => video.paused),
    )
    .toBe(true)
  await page.locator("#mission").scrollIntoViewIfNeeded()
  await expect(
    page.getByRole("heading", { name: "ONE MISSION. DENY EVERY ROBOT." }),
  ).toBeVisible()
  for (const path of ["/", "/join", "/privacy"]) {
    if (path !== "/") await page.goto(path)
    const reveals = page.locator(".reveal")
    expect(await reveals.count()).toBeGreaterThan(0)
    expect(
      await reveals.evaluateAll((elements) =>
        elements.every((element) => {
          const style = getComputedStyle(element)
          return style.opacity === "1" && style.transform === "none"
        }),
      ),
    ).toBe(true)
  }
  expect(errors).toEqual([])
})

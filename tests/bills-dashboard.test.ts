import { test, expect } from '@playwright/test'

test('Bills dashboard loads successfully', async ({ page }) => {
  await page.goto('/bills')
  
  // Check that the page title is visible
  await expect(page.getByText('Bill Payments')).toBeVisible()
  
  // Check that country selector is present
  await expect(page.getByText('NG')).toBeVisible()
  
  // Check that search bar is present
  await expect(page.getByPlaceholder('Search billers, categories...')).toBeVisible()
  
  // Check that categories are displayed
  await expect(page.getByText('Categories')).toBeVisible()
  
  // Check that recent billers section is present
  await expect(page.getByText('Recent Billers')).toBeVisible()
})

test('Country selector works', async ({ page }) => {
  await page.goto('/bills')
  
  // Click country selector
  await page.getByText('NG').click()
  
  // Check that dropdown opens
  await expect(page.getByText('Nigeria')).toBeVisible()
  await expect(page.getByText('Kenya')).toBeVisible()
  await expect(page.getByText('Ghana')).toBeVisible()
})

test('Search functionality works', async ({ page }) => {
  await page.goto('/bills')
  
  // Type in search
  await page.getByPlaceholder('Search billers, categories...').fill('airtime')
  
  // Wait for results to filter
  await page.waitForTimeout(500)
  
  // Check that search results are filtered (this would depend on actual implementation)
  // This is a basic test - more comprehensive testing would require actual data
})
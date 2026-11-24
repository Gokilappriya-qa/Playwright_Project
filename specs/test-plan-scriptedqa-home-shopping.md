# ScriptedQA Home Page Shopping Navigation Test Case

## Application Overview

A focused test case verifying that the authenticated home page displays a Shopping category link and that selecting it navigates to the Shopping page.

## Test Scenarios

### 1. Home Page Navigation

**Seed:** `Fresh browser session navigated to https://www.scriptedqa.com/home; authenticated using the demo credentials displayed on the login page.`

#### 1.1. HP-SHOP-01 - Verify Shopping tab visibility and navigation

**File:** `tests/home/hp-shop-01-shopping-navigation.spec.ts`

**Steps:**
  1. Open https://www.scriptedqa.com/home in a fresh browser session. If the application redirects to login, enter the displayed demo credentials (Username: admin; Password: Pass@9211) and select Sign In.
    - expect: The authenticated home page loads at https://www.scriptedqa.com/home.
    - expect: The home page displays the Categories navigation.
  2. Inspect the Categories navigation for a link named "Shopping".
    - expect: A visible, enabled link labeled "Shopping" is present.
    - expect: The link destination is /shopping.
  3. Click the "Shopping" link.
    - expect: The browser navigates to https://www.scriptedqa.com/shopping.
    - expect: The Shopping page loads successfully and is not left on the home page.

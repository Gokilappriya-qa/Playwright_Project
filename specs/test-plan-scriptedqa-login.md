# ScriptedQA Login Page Test Plan

## Application Overview

A browser-based test plan for the five core login-page functions on https://www.scriptedqa.com/: initial page presentation, required-field and invalid-credential handling, successful authentication, keyboard submission, and sign-out/session termination.

## Test Scenarios

### 1. Login Page Core Functionality

**Seed:** `Fresh browser session using https://www.scriptedqa.com/`

#### 1.1. LP-01 - Display login page and credential guidance

**File:** `tests/login/lp-01-login-page.spec.ts`

**Steps:**
  1. Start with a fresh browser session and navigate to https://www.scriptedqa.com/.
    - expect: The page title is "Scripted QA".
    - expect: The sign-in panel contains the heading "Sign In".
    - expect: Both username and password fields are visible and empty.
    - expect: A "Credentials" panel shows demo User "admin" and Pass "Pass@9211".
    - expect: A "Sign In" button is visible.
  2. Inspect the Password field and enter a temporary value.
    - expect: The password value is masked while it is typed.
    - expect: The password is not visibly displayed in the UI.

#### 1.2. LP-02 - Reject empty credentials

**File:** `tests/login/lp-02-empty-fields.spec.ts`

**Steps:**
  1. Ensure both username and password fields are empty.
    - expect: Both fields remain on the login page without pre-filled values.
  2. Select the "Sign In" button.
    - expect: The user remains on https://www.scriptedqa.com/.
    - expect: An error message appears: "Oops! The credentials are incorrect."
    - expect: No authenticated/home page is opened.

#### 1.3. LP-03 - Reject invalid username and password combinations

**File:** `tests/login/lp-03-invalid-credentials.spec.ts`

**Steps:**
  1. Enter "invalid_user" in Username and "WrongPassword" in Password.
    - expect: The values are accepted in their respective fields; the password is masked.
  2. Select "Sign In".
    - expect: The user remains on the login page.
    - expect: The message "Oops! The credentials are incorrect." is displayed.
    - expect: The username and password values remain visible or retained for correction as observed.
    - expect: No unauthenticated user gains access to /home.
  3. Repeat with valid username "admin" and invalid password "WrongPassword".
    - expect: The same credential error is shown and /home is not opened.
  4. Repeat with invalid username "invalid_user" and valid password "Pass@9211".
    - expect: The same credential error is shown and /home is not opened.

#### 1.4. LP-04 - Sign in successfully with valid credentials

**File:** `tests/login/lp-04-valid-login.spec.ts`

**Steps:**
  1. Navigate to the login page with a fresh session.
    - expect: The login page and demo credential information are displayed.
  2. Enter Username "admin" and Password "Pass@9211".
    - expect: Both fields contain the entered values and the password remains masked.
  3. Select "Sign In".
    - expect: The browser navigates to https://www.scriptedqa.com/home.
    - expect: The heading "Welcome back, Automation Engineer!" is displayed.
    - expect: The header contains a "Sign Out" button.
    - expect: The category navigation is displayed.
    - expect: No login error message remains.

#### 1.5. LP-05 - Sign out and prevent authenticated content access

**File:** `tests/login/lp-05-sign-out.spec.ts`

**Steps:**
  1. Sign in successfully with admin / Pass@9211.
    - expect: The /home page is accessible and the Sign Out button is visible.
  2. Select "Sign Out".
    - expect: The browser returns to https://www.scriptedqa.com/.
    - expect: The "Sign In" heading and both login fields are displayed.
    - expect: The Sign Out button is no longer visible.
  3. Attempt to navigate directly to https://www.scriptedqa.com/home.
    - expect: Authenticated content is not accessible after sign-out.
    - expect: The application redirects to the login page or otherwise blocks access to /home.
  4. Use browser back after signing out.
    - expect: The login page remains displayed and stale authenticated content is not exposed.

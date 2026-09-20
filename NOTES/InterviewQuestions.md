# AI WriteAssist — Interview Questions & Answers

> Interview preparation guide for the AI WriteAssist full-stack project.

---

## 📑 Table of Contents

- [Core Project & Architecture Questions (Q1–Q21)](#-example-of-the-level-of-questions-i-want-to-prepare-you-for)
  - [Q1. Explain your project in 60 seconds](#q1-explain-your-project-in-60-seconds)
  - [Q2. Why did you build this project?](#q2-why-did-you-build-this-project)
  - [Q3. Why did you choose Supabase?](#q3-why-did-you-choose-supabase)
  - [Q4. Why did you implement authentication?](#q4-why-did-you-implement-authentication)
  - [Q5. Why didn't you put the Gemini API key in the React frontend?](#q5-why-didnt-you-put-the-gemini-api-key-in-the-react-frontend)
  - [Q6. Why did you use an Edge Function?](#q6-why-did-you-use-an-edge-function)
  - [Q7. Explain your complete AI request flow](#q7-explain-your-complete-ai-request-flow)
  - [Q8. Why are content and generated_document separate?](#q8-why-are-content-and-generated_document-separate)
  - [Q9. What is RLS and why did you use it?](#q9-what-is-rls-and-why-did-you-use-it)
  - [Q10. What happens if someone manually changes an application ID in the URL?](#q10-what-happens-if-someone-manually-changes-an-application-id-in-the-url)
  - [Q11. Why did you use React Hook Form?](#q11-why-did-you-use-react-hook-form)
  - [Q12. Why Zod?](#q12-why-zod)
  - [Q13. Why do you save the application before generating the AI document?](#q13-why-do-you-save-the-application-before-generating-the-ai-document)
  - [Q14. What happened when you encountered Gemini API limitations?](#q14-what-happened-when-you-encountered-gemini-api-limitations)
  - [Q15. What happens if Gemini fails?](#q15-what-happens-if-gemini-fails)
  - [Q16. Why React instead of another frontend framework?](#q16-why-react-instead-of-another-frontend-framework)
  - [Q17. Why JavaScript instead of TypeScript?](#q17-why-javascript-instead-of-typescript)
  - [Q18. What was the most difficult part of the project?](#q18-what-was-the-most-difficult-part-of-the-project)
  - [Q19. What was one bug you encountered?](#q19-what-was-one-bug-you-encountered)
  - [Q20. How would you improve this project in the future?](#q20-how-would-you-improve-this-project-in-the-future)
  - [Q21. What happens if Gemini returns an error?](#q21-what-happens-if-gemini-returns-an-error)
- [React Questions (Q22–Q27)](#-react-questions)
  - [Q22. How is your React application structured?](#q22-how-is-your-react-application-structured)
  - [Q23. What is the difference between a component and a page in your project?](#q23-what-is-the-difference-between-a-component-and-a-page-in-your-project)
  - [Q24. Why did you use React Router?](#q24-why-did-you-use-react-router)
  - [Q25. How does your Edit Application route work?](#q25-how-does-your-edit-application-route-work)
  - [Q26. How do you protect your routes?](#q26-how-do-you-protect-your-routes)
  - [Q27. Why isn't frontend route protection enough?](#q27-why-isnt-frontend-route-protection-enough)
- [JavaScript Questions (Q28–Q31)](#-javascript-questions)
  - [Q28. Why is JavaScript important in this project?](#q28-why-is-javascript-important-in-this-project)
  - [Q29. Where do you use asynchronous JavaScript?](#q29-where-do-you-use-asynchronous-javascript)
  - [Q30. Why do you use async/await?](#q30-why-do-you-use-asyncawait)
  - [Q31. What is the difference between authentication and authorization?](#q31-what-is-the-difference-between-authentication-and-authorization)
- [Supabase Questions (Q32–Q36)](#-supabase-questions)
  - [Q32. What is Supabase?](#q32-what-is-supabase)
  - [Q33. Why PostgreSQL?](#q33-why-postgresql)
  - [Q34. What is CRUD and where do you use it?](#q34-what-is-crud-and-where-do-you-use-it)
  - [Q35. How do you associate an application with a user?](#q35-how-do-you-associate-an-application-with-a-user)
  - [Q36. Why use RLS instead of filtering data in React?](#q36-why-use-rls-instead-of-filtering-data-in-react)
- [Database Design Questions (Q37–Q40)](#-database-design-questions)
  - [Q37. Why is content stored as structured data?](#q37-why-is-content-stored-as-structured-data)
  - [Q38. Why is generated_document plain text?](#q38-why-is-generated_document-plain-text)
  - [Q39. What happens when a user edits an application?](#q39-what-happens-when-a-user-edits-an-application)
  - [Q40. What happens when the user deletes an application?](#q40-what-happens-when-the-user-deletes-an-application)
- [Gemini / AI Questions (Q41–Q45)](#-gemini--ai-questions)
  - [Q41. Why Gemini?](#q41-why-gemini)
  - [Q42. What information do you send to Gemini?](#q42-what-information-do-you-send-to-gemini)
  - [Q43. Why shouldn't you trust AI-generated content blindly?](#q43-why-shouldnt-you-trust-ai-generated-content-blindly)
  - [Q44. What happens if the user provides incorrect information?](#q44-what-happens-if-the-user-provides-incorrect-information)
  - [Q45. How would you control AI costs if the application became popular?](#q45-how-would-you-control-ai-costs-if-the-application-became-popular)
- [Edge Function Questions (Q46–Q49)](#-edge-function-questions)
  - [Q46. What is a Supabase Edge Function?](#q46-what-is-a-supabase-edge-function)
  - [Q47. Why does your Edge Function validate the JWT?](#q47-why-does-your-edge-function-validate-the-jwt)
  - [Q48. What happens if the Authorization header is missing?](#q48-what-happens-if-the-authorization-header-is-missing)
  - [Q49. Why can't the Supabase publishable key authenticate the user?](#q49-why-cant-the-supabase-publishable-key-authenticate-the-user)
- [Security Questions (Q50–Q52)](#-security-questions)
  - [Q50. Is your Supabase publishable key a secret?](#q50-is-your-supabase-publishable-key-a-secret)
  - [Q51. What is the biggest security mistake you wanted to avoid?](#q51-what-is-the-biggest-security-mistake-you-wanted-to-avoid)
  - [Q52. Is your application completely secure?](#q52-is-your-application-completely-secure)
- [Error Handling Questions (Q53–Q55)](#-error-handling-questions)
  - [Q53. How do you handle errors in the application?](#q53-how-do-you-handle-errors-in-the-application)
  - [Q54. What if the database succeeds but Gemini fails?](#q54-what-if-the-database-succeeds-but-gemini-fails)
  - [Q55. What if Gemini succeeds but saving the generated document fails?](#q55-what-if-gemini-succeeds-but-saving-the-generated-document-fails)
- [Deployment Questions (Q56–Q59)](#-deployment-questions)
  - [Q56. How did you deploy the project?](#q56-how-did-you-deploy-the-project)
  - [Q57. What environment variables does the frontend need?](#q57-what-environment-variables-does-the-frontend-need)
  - [Q58. Why does the frontend use VITE_ variables?](#q58-why-does-the-frontend-use-vite_-variables)
  - [Q59. What is the difference between development and production?](#q59-what-is-the-difference-between-development-and-production)
- [Testing Questions (Q60–Q61)](#-testing-questions)
  - [Q60. How did you test the project?](#q60-how-did-you-test-the-project)
  - [Q61. Why did you test with another account?](#q61-why-did-you-test-with-another-account)
- [Project Decision Questions (Q62–Q64)](#-project-decision-questions)
  - [Q62. Why didn't you build a traditional Express backend?](#q62-why-didnt-you-build-a-traditional-express-backend)
  - [Q63. Why didn't you use Firebase?](#q63-why-didnt-you-use-firebase)
  - [Q64. Why didn't you use a custom Node.js backend?](#q64-why-didnt-you-use-a-custom-nodejs-backend)
- [Scenario-Based Questions (Q65–Q70)](#-scenario-based-questions)
  - [Q65. What if a user tries to access another user's application?](#q65-what-if-a-user-tries-to-access-another-users-application)
  - [Q66. What if the user's JWT expires while generating a document?](#q66-what-if-the-users-jwt-expires-while-generating-a-document)
  - [Q67. What if Gemini is temporarily unavailable?](#q67-what-if-gemini-is-temporarily-unavailable)
  - [Q68. What if thousands of users start generating documents simultaneously?](#q68-what-if-thousands-of-users-start-generating-documents-simultaneously)
  - [Q69. What if someone discovers your Edge Function URL?](#q69-what-if-someone-discovers-your-edge-function-url)
  - [Q70. What if someone discovers your Gemini API key?](#q70-what-if-someone-discovers-your-gemini-api-key)
- [Performance Questions (Q71–Q72)](#-performance-questions)
  - [Q71. Your Vite build showed a large JavaScript bundle. How would you improve it?](#q71-your-vite-build-showed-a-large-javascript-bundle-how-would-you-improve-it)
  - [Q72. How would you improve the application if it became slow?](#q72-how-would-you-improve-the-application-if-it-became-slow)
- [Project Ownership Questions (Q73–Q76)](#-project-ownership-questions)
  - [Q73. Which parts of this project did you personally build?](#q73-which-parts-of-this-project-did-you-personally-build)
  - [Q74. Did you use AI to build this project?](#q74-did-you-use-ai-to-build-this-project)
  - [Q75. What did you personally learn from this project?](#q75-what-did-you-personally-learn-from-this-project)
  - [Q76. If you had to rebuild this project, what would you do differently?](#q76-if-you-had-to-rebuild-this-project-what-would-you-do-differently)
- [Final 10 Deep Understanding Questions (Q77–Q86)](#-final-10-deep-understanding-questions)
  - [Q77. Draw the complete architecture of AI WriteAssist](#q77-draw-the-complete-architecture-of-ai-writeassist)
  - [Q78. Explain exactly what happens from clicking "Generate Document" until the generated document appears on screen](#q78-explain-exactly-what-happens-from-clicking-generate-document-until-the-generated-document-appears-on-screen)
  - [Q79. Where is the Gemini API key stored and why can't it be stored in the React frontend?](#q79-where-is-the-gemini-api-key-stored-and-why-cant-it-be-stored-in-the-react-frontend)
  - [Q80. How does the Edge Function know which user is making the request?](#q80-how-does-the-edge-function-know-which-user-is-making-the-request)
  - [Q81. How does RLS prevent User A from accessing User B's applications?](#q81-how-does-rls-prevent-user-a-from-accessing-user-bs-applications)
  - [Q82. Why are content and generated_document separate?](#q82-why-are-content-and-generated_document-separate)
  - [Q83. What happens if the AI request fails after the application has been saved?](#q83what-happens-if-the-ai-request-fails-after-the-application-has-been-saved)
  - [Q84. What happens if the database update fails after Gemini returns successfully?](#q84what-happens-if-the-database-update-fails-after-gemini-returns-successfully)
  - [Q85. What would you change if 10,000 users started using the application?](#q85what-would-you-change-if-10000-users-started-using-the-application)
  - [Q86. What is one architectural decision you made in this project and why?](#q86what-is-one-architectural-decision-you-made-in-this-project-and-why)
- [Rapid-Fire Questions](#-rapid-fire-questions)
- [Core Chains & Security Principles](#10-core-chains)

---

## 🔥 Example of the level of questions I want to prepare you for

### Q1. Explain your project in 60 seconds

- Strong answer :

- AI WriteAssist is a full-stack AI-powered application and formal letter assistant.

The frontend is built with React, Vite and JavaScript. Users authenticate through Supabase, choose a document category and type, select language and tone, and fill out a guided form.

The form data is validated using React Hook Form and Zod and then stored in Supabase PostgreSQL.

When the user requests AI generation, the authenticated request goes through a Supabase Edge Function rather than calling Gemini directly from the browser. The Edge Function validates the user's authentication token, accesses the server-side Gemini API key, sends the request to Gemini, and returns the generated document.

The generated document is stored separately from the original form data, allowing the user to edit either the application or generated document independently.

The application also provides dashboard CRUD operations and a browser-based Print/Save as PDF workflow.

### Q2. Why did you build this project?

- This is where your personal story becomes important.

- I wanted to move beyond tutorial-based projects and start building something from my own ideas.

Tutorials helped me build my React foundation, but I wanted to experience the complete process of making architectural decisions, handling authentication, managing data, integrating an AI service, dealing with errors and deploying a real application.

AI WriteAssist gave me an opportunity to combine frontend development with backend services, database security and generative AI in one project.

### Q3. Why did you choose Supabase?

- I chose Supabase because I wanted to learn backend concepts while still being able to develop efficiently.

It gave me several important pieces together: authentication, PostgreSQL, Row Level Security and Edge Functions.

For this project, that allowed me to learn how authentication and database authorization work together instead of only building a frontend application.

It also gave me a suitable server-side environment for securely communicating with Gemini.

### Q4. Why did you implement authentication?

- Authentication was intentional rather than simply being a feature added for appearance.

One of my learning goals was to understand Supabase Authentication and how authenticated users interact with protected data.

Since each user can create and save their own applications, authentication provides an identity that can be associated with those records.

I then used Row Level Security so database access is restricted according to the authenticated user.

So the authentication system is connected to the application's authorization and data model.

### Q5. Why didn't you put the Gemini API key in the React frontend?

- A frontend environment variable is not a secure place for a private API key.

Even if I use something like VITE_GEMINI_API_KEY, the value becomes part of the client-side application and can potentially be discovered by someone inspecting the deployed application.

Therefore, I moved the Gemini API request to a Supabase Edge Function.

The browser sends an authenticated request to the Edge Function. The function validates the user and accesses the Gemini API using the server-side secret.

This keeps the Gemini credential outside the client bundle.

### Q6. Why did you use an Edge Function?

- I needed a server-side layer between the React application and Gemini.

Supabase Edge Functions were a natural choice because I was already using Supabase for authentication and PostgreSQL.

The Edge Function allows me to validate the user's authentication token, access the Gemini secret securely, make the external AI request, and return the generated document to the frontend.

### Q7. Explain your complete AI request flow.

```text
React
  │
  │ Authorization: Bearer <JWT>
  ▼
Supabase Edge Function
  │
  ├── Validate JWT
  │
  ├── Get Gemini secret
  │
  ▼
Gemini API
  │
  ▼
Generated Document
  │
  ▼
React
  │
  ▼
Supabase
generated_document
```

### Q8. Why are content and generated_document separate?


- Initially, the application had structured form data stored in the content field.

The generated document is a different type of information because it represents the AI-generated or manually edited output.

Therefore, I separated them.

content stores the original structured application data, while generated_document stores the generated document.

This prevents the generated text from overwriting the original form data and allows the user to edit the application independently from the generated document.

### Q9. What is RLS and why did you use it?

- RLS stands for Row Level Security.

It allows PostgreSQL to enforce access rules at the database level.

In my application, users should only be able to access their own application records.

Instead of relying only on frontend checks, I use RLS so the database itself enforces the ownership rules.

This is important because frontend authorization alone should not be treated as a security boundary.

### Q10. What happens if someone manually changes an application ID in the URL?

- For example:

`/edit/some-other-user-application-id`

- The application does not rely only on the URL or frontend route for authorization.

The database access is protected by Row Level Security, so even if someone knows another application's ID, the database policy should prevent unauthorized access to that record.

This is why authentication and RLS work together in my application.

### Q11. Why did you use React Hook Form?

- I used React Hook Form to manage the form state and submission workflow without manually managing every input with separate React state.

It also integrates well with Zod, which allowed me to keep validation rules structured and easier to maintain.

### Q12. Why Zod?

- I wanted schema-based validation rather than scattering validation logic across individual inputs.

Zod allows me to define the expected structure and validation rules and use that schema during form validation.

### Q13. Why do you save the application before generating the AI document?

- I deliberately save the application before making the AI generation request.

AI generation depends on an external service, so it can fail because of network problems, service errors or quota limitations.

By saving the user's submitted data first, I reduce the risk of losing their completed application if generation fails.

### Q14. What happened when you encountered Gemini API limitations?

- During development I encountered limitations with the available Gemini API usage and quota.

Instead of treating this only as an obstacle, I used the situation to improve the architecture.

It encouraged me to move the Gemini request behind a server-side Edge Function, where I could centralize the AI integration and keep the API credential secure.

It also made me think more carefully about error handling and external-service dependencies.

### Q15. What happens if Gemini fails?

- Request failure
- authentication failure
- API errors
- transient errors
- frontend error handling
- preserving saved form data

### Q16. Why React instead of another frontend framework?

- React was a deliberate choice because I wanted to strengthen my understanding of component-based frontend architecture and build a practical application using the React ecosystem.

The project also gave me an opportunity to work with routing, state management, forms, validation and asynchronous API interactions within React.

### Q17. Why JavaScript instead of TypeScript?

- I chose JavaScript because it is the language I have been focusing on while strengthening my React and full-stack fundamentals.

For this project, my priority was to understand the application architecture, data flow, authentication, security and AI integration deeply rather than introduce TypeScript before I was comfortable with the underlying concepts.

TypeScript is something I can add to my skill set later.

### Q18. What was the most difficult part of the project?

- One of the more challenging parts was integrating Gemini securely.

Initially, it is tempting to call an AI API directly from the frontend, but that creates a problem when the API requires a secret key.

I had to understand authentication, bearer tokens, Supabase Edge Functions, environment secrets and the separation between client-side and server-side code.

That part helped me understand full-stack architecture much better.

### Q19. What was one bug you encountered?

- During development, I initially had a data-separation problem where generated document text could interfere with the application's original structured content.

The Edit Application page expected content to contain JSON-formatted form data, so overwriting it with generated plain text caused parsing problems.

I resolved this by adding a separate generated_document field and updating the application logic so the original form data and generated document are persisted independently.

### Q20. How would you improve this project in the future?

- I would consider adding dedicated PDF generation, AI rewrite/improve functionality, AI translation, more document categories and templates, usage/quota tracking, rate limiting, accessibility improvements and performance optimization.

### Q21. What happens if Gemini returns an error?

- The application treats Gemini as an external dependency, so the AI request can fail independently of the rest of the application.

Possible failures include:

- Invalid or expired authentication
- Missing Gemini credentials on the server
- Network/request failure
- Gemini API errors
- Rate-limit or quota-related errors
- Temporary service errors

- The important design decision is that the application saves the user's application data before requesting AI generation.

- Therefore, even if the AI request fails, the user's completed form data is already persisted.

- The frontend can then show an appropriate error instead of losing the user's work.

## 🔵 React Questions

### Q22. How is your React application structured?

- I separated the application into reusable components, pages, routing, state management, hooks, and service-related logic.

- The general idea is:

```text
React Application
│
├── Components
├── Pages
├── Routes
├── Hooks
├── Services
├── Store
└── Application Logic
```

- The exact structure may evolve as the project grows, but the goal is to keep UI components, routing, state, and external-service logic reasonably separated.

### Q23. What is the difference between a component and a page in your project?

- A component is generally a reusable UI building block, while a page represents a larger route-level view.

- For example, the application has pages such as the landing page, dashboard and edit application page, while reusable UI elements such as navigation and form-related elements can be represented as components

### Q24. Why did you use React Router?

- I needed multiple application views and URL-based navigation.

- React Router allows the application to map URLs to different React pages and supports navigation without requiring a complete browser page reload.

- It also allowed me to create routes such as the Edit Application route:

```js
/edit/:applicationId
```

- The application ID can then be used to retrieve the corresponding application.

### Q25. How does your Edit Application route work?

- The route contains the application's ID:

```js
/edit/:applicationId
```

- The page reads that ID from the route parameters, retrieves the corresponding application from Supabase, parses the stored form content, and uses that information to populate the form.

- After the user modifies and saves the application, the updated data is persisted back to Supabase.

### Q26. How do you protect your routes?

- The application uses authentication state to determine whether a user is authenticated before allowing access to protected application areas.

- However, route protection is not treated as the only security mechanism.

- The database still uses Row Level Security, because frontend route protection alone cannot prevent someone from directly attempting unauthorized database access.

### Q27. Why isn't frontend route protection enough?

- Frontend code runs in the user's browser and therefore cannot be considered a trusted security boundary.

- A user can potentially manipulate URLs or make requests outside the normal UI.

- That's why authorization needs to be enforced on the backend/database as well.

- In my project, Supabase RLS provides that database-level protection.

## 🔵 JavaScript Questions

### Q28. Why is JavaScript important in this project?

- JavaScript is used throughout the React frontend and allows me to work with:

- Components
- Functions
- Objects and arrays
- Promises
- Async/await
- API requests
- Event handling
- State updates
- Data transformation

- The project gave me practical experience applying JavaScript concepts rather than learning them only through isolated exercises.

### Q29. Where do you use asynchronous JavaScript?

- There are several places where asynchronous operations are required.

- For example:

```text
React
 ↓
Supabase authentication
 ↓
Database request
 ↓
Edge Function
 ↓
Gemini API
```

- These operations can take time, so the application uses asynchronous JavaScript to wait for responses and handle success or failure.

### Q30. Why do you use async/await?

- async/await makes asynchronous code easier to read and reason about compared with deeply nested promise chains.

- For example, when saving an application or calling the AI generation service, I can write the flow sequentially and handle errors using try/catch.

### Q31. What is the difference between authentication and authorization?

- Authentication answers:

`Who are you?`

- Authorization answers:

`What are you allowed to access or do?`

- In my project, Supabase Authentication establishes the user's identity.

- RLS then helps enforce authorization at the database level so a user can access only the records they are permitted to access.

- This distinction is very important in my application's security model.

## 🔵 Supabase Questions

### Q32. What is Supabase?

- Supabase is a backend platform built around PostgreSQL that provides services such as database access, authentication, storage and server-side functions.

- In my project I mainly use:

- Supabase Auth
- PostgreSQL
- Row Level Security
- Edge Functions

### Q33. Why PostgreSQL?

- Supabase uses PostgreSQL, and I wanted to gain experience with a relational database rather than keeping all application data only in frontend state.

- The application has identifiable users and application records, making a relational database a suitable choice.

### Q34. What is CRUD and where do you use it?

- CRUD means:

```text
Create
Read
Update
Delete
```

- AI WriteAssist uses CRUD operations for saved applications.

- For example:

- Create → save an application
- Read → retrieve applications for the dashboard
- Update → edit or rename an application
- Delete → remove an application

### Q35. How do you associate an application with a user?

- The application record contains the authenticated user's identity, such as user_id.

- This allows the database policies to determine which user owns a particular application.

- The ownership relationship is then enforced through RLS.

### Q36. Why use RLS instead of filtering data in React?

- Filtering in React is useful for the user interface, but it is not sufficient for security.

- If I retrieved unauthorized records and simply hid them in React, the data would already have reached the client.

- RLS prevents unauthorized rows from being returned at the database level.

## 🔵 Database Design Questions

### Q37. Why is content stored as structured data?

- The form contains multiple fields whose structure can vary depending on the selected document type.

- The content field stores the submitted form information so the application can later retrieve it and reconstruct the Edit Application form.

### Q38. Why is generated_document plain text?

- The generated document represents the final textual output that the user reads and edits.

- Storing it separately as text makes it straightforward to display, edit, save and print.

### Q39. What happens when a user edits an application?

- The existing structured content is retrieved, converted back into the form's expected structure, and used to populate the form.

- After editing, the updated form data is saved back to the application's content.

- The generated document remains a separate field.

### Q40. What happens when the user deletes an application?

- The application sends a delete request for the selected application record.

- The database authorization rules still apply, so the user should only be able to delete records they are authorized to access.

- The dashboard then reflects the updated database state.

## 🔵 Gemini / AI Questions

### Q41. Why Gemini?

- Gemini provides the generative AI capability required to transform structured application information into a professional document.

- I integrated it as the AI generation layer while keeping the application workflow and persistence logic under my control.

### Q42. What information do you send to Gemini?

- The AI request is constructed from the user's submitted application information and the selected document requirements such as document type, language and tone.

- The Edge Function constructs the AI request and sends it to Gemini.

- I also designed the prompt to focus on generating the requested professional document from the supplied information.

### Q43. Why shouldn't you trust AI-generated content blindly?

- Generative AI can produce incorrect, incomplete or inappropriate information.

- That's why the application allows the user to review and manually edit the generated document before using it.

- The application is an assistance tool, not a replacement for user verification.

### Q44. What happens if the user provides incorrect information?

- AI generation does not automatically make incorrect user input correct.

- The generated document is based on the information supplied to the system.

- Therefore, validation and user review remain important parts of the workflow.

### Q45. How would you control AI costs if the application became popular?

- I would introduce server-side usage controls such as:

- Per-user generation limits
- Rate limiting
- Usage tracking
- Quota management
- Request logging
- Potentially different model tiers depending on the operation

- This would be especially important because AI API usage can create variable costs.

## 🔵 Edge Function Questions

### Q46. What is a Supabase Edge Function?

- It is a server-side function that can execute backend logic without requiring me to maintain a traditional server infrastructure.

- In this project, I use the generate-document Edge Function as the server-side layer between the frontend and Gemini.

### Q47. Why does your Edge Function validate the JWT?

- Because the AI generation endpoint should be available only to authenticated users.

- The function receives the user's bearer token and validates the authenticated user before allowing the Gemini request.

- This means the AI endpoint isn't simply an open endpoint that anyone can call anonymously.

### Q48. What happens if the Authorization header is missing?

- The Edge Function rejects the request rather than continuing to Gemini.

- The function expects an authenticated bearer token before processing the AI generation request.

- This is an important part of the security boundary.

### Q49. Why can't the Supabase publishable key authenticate the user?

- The publishable key identifies the Supabase project/client environment, but it is not the user's authentication credential.

- The Edge Function needs the user's authentication token, normally supplied as:

```js
Authorization: Bearer <JWT>
```

- The function validates that token to identify the authenticated user.

## 🔵 Security Questions

### Q50. Is your Supabase publishable key a secret?

- It should not be treated like the Gemini API secret.

- The publishable key is intended for client-side Supabase usage, while private credentials such as the Gemini API key must remain server-side.

- The important distinction is between client-safe configuration and private secrets.

### Q51. What is the biggest security mistake you wanted to avoid?

- Exposing the Gemini API key in the frontend.

- Putting a private key into a frontend VITE_ environment variable does not make it secret after the application is built.

- That's why the Gemini credential is stored in Supabase Edge Function secrets.

### Q52. Is your application completely secure?

- I would not claim that any application is completely secure.

- I implemented important security measures such as authentication, RLS and server-side secret management, but a production system would still need continued security review, rate limiting, monitoring, validation and other controls as the application scales.

- This is a very good answer in an interview. Never say "my application is 100% secure."

## 🔵 Error Handling Questions

### Q53. How do you handle errors in the application?

- Errors can occur at different layers:

```text
Form validation
      ↓
Authentication
      ↓
Database
      ↓
Edge Function
      ↓
Gemini API
```

- I handle these operations separately so that a failure at one layer can be communicated to the user without treating every failure as the same problem.

### Q54. What if the database succeeds but Gemini fails?

- This is one reason I save the application first.

- The structured application remains available in the database even if the AI generation request fails.

- The user can retry the generation instead of having to re-enter the entire form.

### Q55. What if Gemini succeeds but saving the generated document fails?

- The generated response exists in memory on the frontend, but persistence has failed.

- The application should communicate the save failure clearly rather than pretending that the document has been permanently stored.

- This is an example of why external-service success and database persistence are separate operations.

## 🔵 Deployment Questions

### Q56. How did you deploy the project?

- The frontend is deployed on Vercel.

- Supabase provides the backend services including authentication, PostgreSQL, RLS and the Edge Function.

- The Gemini secret is configured in Supabase rather than Vercel's frontend environment.

### Q57. What environment variables does the frontend need?

```js
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

- The Gemini API key is not placed in the frontend environment.

### Q58. Why does the frontend use VITE_ variables?

- Vite exposes variables prefixed with VITE_ to the frontend application.

- That's useful for values that are intended to be available to client-side code, such as the Supabase project URL and publishable key.

- But it is precisely why private secrets should not be placed there.

### Q59. What is the difference between development and production?

- During development I run the React application locally and use the configured Supabase project.

- In production, the frontend is deployed through Vercel and communicates with the production Supabase services and deployed Edge Function.

- Environment configuration needs to be appropriate for each environment.

## 🔵 Testing Questions

### Q60. How did you test the project?

- I tested the major user journeys rather than testing only individual components.

- I tested:

- Registration
- Login
- Protected access
- Application creation
- Form validation
- Database persistence
- AI generation
- Generated-document persistence
- Editing
- Rename
- Delete
- Print / Save as PDF
- Production deployment
- A separate authenticated account

### Q61. Why did you test with another account?

- Because user-specific data protection is an important part of the application.

- Testing with another account helps verify that authentication and RLS behave according to the intended ownership model rather than only testing everything with the original account.

## 🔵 Project Decision Questions

### Q62. Why didn't you build a traditional Express backend?

- For this project, Supabase Edge Functions provided the server-side capability I needed without requiring me to build and maintain a separate Express server.

- It also integrated naturally with the Supabase authentication and database services I was already using.

- A traditional backend such as Express would also be a valid architecture, especially if the backend requirements became more complex.

### Q63. Why didn't you use Firebase?

- My learning goal for this project included gaining practical experience with Supabase and PostgreSQL.

- Supabase provided authentication, relational database capabilities, RLS and Edge Functions in one ecosystem, which matched the requirements of this project.

### Q64. Why didn't you use a custom Node.js backend?

- I wanted to learn how managed backend services and serverless functions can solve real application requirements.

- Using Supabase allowed me to focus on the application's architecture and security while still working with PostgreSQL and server-side functions.

## 🔥 Scenario-Based Questions

- These are particularly important because interviewers often move from "What did you build?" to "What would happen if...?"

### Q65. What if a user tries to access another user's application?

- The application should not rely only on frontend checks. Supabase RLS should prevent unauthorized access to the database record.

### Q66. What if the user's JWT expires while generating a document?

- The authenticated request can fail because the token is no longer valid. The Edge Function should reject the request rather than allowing unauthenticated AI generation. The frontend can then handle the authentication failure appropriately.

### Q67. What if Gemini is temporarily unavailable?

- The AI generation request can fail, but the application data has already been saved. Therefore, the user doesn't lose the completed application and can retry generation.

### Q68. What if thousands of users start generating documents simultaneously?

- The current MVP would need additional controls before assuming that level of scale.

- I would consider rate limiting, per-user quotas, usage tracking, monitoring, database optimization and appropriate AI service capacity.

### Q69. What if someone discovers your Edge Function URL?

- Knowing the endpoint URL alone should not be enough to generate documents because the function validates the user's authentication token before processing the request.

### Q70. What if someone discovers your Gemini API key?

- That would be a security incident. The key should be revoked or rotated immediately, and its exposure should be investigated.

- This is why private credentials should never be committed to GitHub or bundled into the frontend.

## 🔵 Performance Questions

### Q71. Your Vite build showed a large JavaScript bundle. How would you improve it?

- I would first analyze the bundle to identify the largest dependencies and modules.

- Then I could consider:

- Route-based code splitting
- Lazy loading
- Dynamic imports
- Removing unnecessary dependencies
- Optimizing large libraries
- Better chunking strategy

- This is an area I would address as the application grows.

### Q72. How would you improve the application if it became slow?

- I would first measure rather than immediately optimize.

- I would investigate:

- Browser performance
- Network requests
- Database queries
- Bundle size
- Rendering behavior
- AI request latency

- Then optimize the actual bottleneck.

## 🧠 Project Ownership Questions

### Q73. Which parts of this project did you personally build?

- Be prepared to answer this very clearly.

- You should explain honestly which parts you implemented yourself, which parts were assisted by AI tools, and which parts you reviewed.

- A strong answer is:

- I used AI tools as development assistance in some areas, but I remained responsible for understanding the architecture, reviewing the generated code, integrating the pieces, debugging issues, testing the application and making the final implementation decisions.

### Q74. Did you use AI to build this project?

- Yes, I used AI tools as development assistance where appropriate. However, I did not treat generated code as something to blindly copy.

- I reviewed the implementation, understood the logic, integrated it into the project, tested it, and debugged issues when the implementation didn't behave as expected.

- One of my main goals with this project was actually to understand the architecture and decisions rather than simply produce code.

### Q75. What did you personally learn from this project?

- I learned that building a complete application is much more than writing React components.

- I learned how authentication, authorization, database design, RLS, server-side functions, external APIs, error handling and deployment fit together.

- The Gemini integration particularly helped me understand the difference between client-side and server-side responsibilities.

- Most importantly, I gained experience taking an idea from a guided workflow to a deployed full-stack application.

### Q76. If you had to rebuild this project, what would you do differently?

- I would plan the data model and AI integration boundary earlier.

- I would also think about rate limiting and usage tracking earlier because AI generation is an external resource with quota and cost considerations.

- I would consider performance optimization and dedicated PDF generation as later improvements.

- At the same time, I would keep the separation between structured form data and generated document data because that proved useful during development.

## 🏆 Final 10 "Deep Understanding" Questions

### Q77. Draw the complete architecture of AI WriteAssist.

- The overall architecture of my application is:

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ React + Vite         │
                    │ Frontend             │
                    │                      │
                    │ React Router         │
                    │ React Hook Form      │
                    │ Zod                  │
                    │ Redux Toolkit        │
                    └──────────┬───────────┘
                               │
                 Authentication / Data Requests
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Supabase             │
                    │                      │
                    │ Authentication      │
                    │ PostgreSQL           │
                    │ Row Level Security   │
                    └──────────┬───────────┘
                               │
                    Generate Document
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Supabase Edge        │
                    │ Function             │
                    │ generate-document    │
                    │                      │
                    │ Validate JWT         │
                    │ Read Gemini Secret   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Gemini AI            │
                    │                      │
                    │ Generate Document    │
                    └──────────┬───────────┘
                               │
                         Generated Text
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Supabase Database    │
                    │                      │
                    │ generated_document   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ React UI             │
                    │ Edit / Save / Print  │
                    └──────────────────────┘
```

- The important point is that Gemini is not called directly from the React frontend. The request goes through the authenticated Supabase Edge Function.

### Q78. Explain exactly what happens from clicking "Generate Document" until the generated document appears on screen.

- When the user clicks Generate Document, the flow is:

1.The form data has already been validated and the application has been saved.

2.The frontend calls my generateDocument() logic.

3.The React application sends a request to the generate-document Supabase Edge Function.

4.The authenticated user's access token is sent in the Authorization: Bearer <JWT> header.

5.The Edge Function extracts the bearer token.

6.It validates the user using Supabase Auth.

7.If authentication succeeds, the function retrieves the Gemini API key from Supabase secrets.

8.The function constructs the AI prompt using the application information, language, tone, and other required data.

9.It sends the request to Gemini.

10.Gemini returns the generated document.

11.The Edge Function sends the generated document back to React.

12.React updates the generatedDocument state.

13.The generated document appears in the UI.

14.The document is also saved into the generated_document column of the application.

- So the important chain is:

```text
Generate button
      ↓
React
      ↓
Authenticated Edge Function
      ↓
Validate JWT
      ↓
Gemini
      ↓
Generated document
      ↓
React state
      ↓
UI
      ↓
Supabase database
```

### Q79. Where is the Gemini API key stored and why can't it be stored in the React frontend?

- The Gemini API key is stored as a Supabase Edge Function secret:

```js
GEMINI_API_KEY
```

- can be bundled into the frontend JavaScript and ultimately exposed to users.

- Therefore:

```js
❌ React → Gemini
```

- would expose the API key.

- Instead I use:

```text
React
   ↓
Authenticated Edge Function
   ↓
Gemini API
```

### Q80. How does the Edge Function know which user is making the request?

- The frontend sends the logged-in user's access token in the Authorization header:

```js
Authorization: Bearer <JWT>
```

- The Edge Function extracts the token and uses Supabase Auth to validate it.

- Conceptually:

```text
React
  ↓
Bearer JWT
  ↓
Edge Function
  ↓
Supabase Auth
  ↓
Identify authenticated user
```

- The important distinction is that the frontend doesn't simply tell the Edge Function:

```js
userId = 123
```

- and expect the server to trust it.

- The server validates the authentication token and obtains the authenticated user's identity from Supabase Auth.

### Q81. How does RLS prevent User A from accessing User B's applications?

- RLS means Row Level Security.

- I use it so that database access is controlled according to the authenticated user.

- Conceptually, each application belongs to a user through its user_id

- For example:

```text
Application 1 → User A
Application 2 → User B
```

- When User A makes a database request, Supabase knows the authenticated user through the authentication context.

- The RLS policy checks whether the application's user_id matches the current authenticated user.

- Therefore:

```text
User A → User A's applications ✅
User A → User B's applications ❌
```

- This is important because I don't rely only on filtering data in React.

- For example, simply doing:

```js
applications.filter(app => app.user_id === user.id)
```

- would not be sufficient security because the database itself would still need to enforce ownership.

- RLS provides the database-level protection.

### Q82. Why are content and generated_document separate?

- This was an important architectural decision and also fixed an actual bug I encountered.

- content stores the original structured application/form data.

- For example:

```text
category
document type
language
tone
user-entered fields
```

- generated_document stores the AI-generated or manually edited document.

- So conceptually:

```text
content
   ↓
Input / source data

generated_document
   ↓
Final generated/editable document
```

- Initially, I had a problem where generated plain text was being saved into content.

- Later, when the Edit Application page tried to parse content as JSON, it caused an error because content was no longer JSON.

- I fixed the architecture by keeping them separate:

```text
applications
├── content
└── generated_document
```

- This keeps the original structured data independent from the generated document.

### Q83.What happens if the AI request fails after the application has been saved?

- The application is saved before the AI generation step.

- So if Gemini fails:

```text
Save Application
       ↓
Success
       ↓
Call Gemini
       ↓
Gemini fails
```

- The application itself is not lost.

- The user can still access the saved application from the dashboard and try the generation process again.

- My Edge Function also handles certain temporary Gemini failures with retry/fallback logic.

- The important design decision is:

- I don't make the user's form data dependent on successful AI generation.

### Q84.What happens if the database update fails after Gemini returns successfully?

- There are two separate operations:

```text
Gemini
  ↓
Generated document returned
  ↓
Update database
```

- If Gemini succeeds but the database update fails, the generated document may already exist in the frontend state, but it hasn't been successfully persisted to the database.

- The application should therefore treat the database update as a separate persistence step and handle the error rather than pretending that the document was successfully saved.

- The important distinction is:

```text
AI generation success ≠ database persistence success
```

- A production version could improve this further by adding stronger retry/error recovery and clearer save status to the user.

### Q85.What would you change if 10,000 users started using the application?

- I would first identify the bottlenecks rather than immediately changing the architecture.

- The areas I would examine are:

### 1. AI usage and cost

- I would introduce controls such as:

- rate limiting
- per-user quotas
- usage tracking
- request throttling
- possibly caching where appropriate

### 2. Database

- I would review:

- indexes
- query performance
- database connections
- frequently accessed queries
- RLS policy performance

### 3. Edge Functions

- I would monitor:

- execution time
- concurrent requests
- failures
- Gemini API response time
- 429/5xx errors

### 4. Frontend performance

- My current production build already showed a Vite warning about a large JavaScript chunk, so I would investigate:

- code splitting
- lazy loading routes
- reducing unnecessary dependencies
- bundle analysis

### 5. Monitoring

- I would introduce proper observability:

```text
Frontend
   ↓
Error monitoring

Edge Function
   ↓
Logs + metrics

Database
   ↓
Query monitoring

Gemini
   ↓
Usage + failure monitoring
```

- So I wouldn't simply say "I would move everything to another backend." I would first measure where the actual bottleneck is.

### Q86.What is one architectural decision you made in this project and why?

- One of my most important architectural decisions was to put Gemini behind a Supabase Edge Function instead of calling Gemini directly from React.

- The reason was security.

- The frontend is publicly accessible, so putting the Gemini API key inside the React application would expose the key.

- Instead:

```text
React
   ↓
Authenticated request
   ↓
Supabase Edge Function
   ↓
Gemini
```

- The Edge Function validates the authenticated user and accesses the Gemini secret server-side.

- This decision also helped me understand how frontend applications, authentication, backend functions, secrets, and external AI APIs work together instead of treating AI as just another frontend API call.

## ⚡ Rapid-Fire Questions

| Question                         | Key point                                        |
| -------------------------------- | ------------------------------------------------ |
| What is React?                   | Component-based UI library                       |
| What is Vite?                    | Frontend build/dev tooling                       |
| What is Supabase?                | Backend platform around PostgreSQL               |
| What is PostgreSQL?              | Relational database                              |
| What is RLS?                     | Database-level row access policies               |
| What is JWT?                     | Token representing authenticated identity/claims |
| Authentication vs authorization? | Identity vs permissions                          |
| What is CRUD?                    | Create, Read, Update, Delete                     |
| What is Zod?                     | Schema validation                                |
| What is React Hook Form?         | Form state/submission management                 |
| What is an Edge Function?        | Server-side/serverless function                  |
| Why not expose Gemini key?       | Client code is inspectable                       |
| Why save before AI generation?   | Preserve user input if AI fails                  |
| Why separate generated document? | Keep structured input independent                |
| Why use JavaScript?              | Current learning focus                           |
| Why Supabase?                    | Auth + PostgreSQL + RLS + Edge Functions         |
| Why Gemini?                      | Generative document creation                     |
| Why Vercel?                      | Frontend deployment                              |
| What is RLS protecting?          | User-owned database records                      |

## 10 core chains:

```text
1. User
   ↓
2. Authentication
   ↓
3. Protected Route
   ↓
4. Form
   ↓
5. Validation
   ↓
6. Supabase Database
   ↓
7. Authenticated Edge Function
   ↓
8. Gemini
   ↓
9. generated_document
   ↓
10. Dashboard / Edit / Print
```

## Authentication tells you who the user is.

## Authorization determines what that user is allowed to access.

## RLS helps enforce that authorization at the database level.

# AI WriteAssist — Interview Questions & Answers

> Interview preparation guide for the AI WriteAssist full-stack project.

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

- equest failure
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

T- he Edge Function rejects the request rather than continuing to Gemini.

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

- t should not be treated like the Gemini API secret.

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
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



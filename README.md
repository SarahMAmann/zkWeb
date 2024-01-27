<a href="https://www.zk-web.xyz/">
  <h1 align="center">zkWeb</h1>
</a>

<p align="center">
 Bringing zero knowledge proofs to the web - for everyone!
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#documentation"><strong>Documentation</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a> ·
  <a href="#become-a-contributor"><strong>Become a Contributor</strong></a>
</p>
<br/>

<p>
  This is a free and open source fun side project funded and maintained by ✨[me](https://www.sarahbenson.dev/)✨ to help people use and learn about ZKPs 🤓 
</p>
<br/>

## Features

 Stack:
  - Next.js
  - Tailwind CSS
  - Jest
  - Supabase
  - Vercel
  - zkWeb relies on the [zokrates.js](https://zokrates.github.io/toolbox/zokrates_js.html) toolbox. It would be beneficial to familiarize yourself with Zokrates before working with this project.


## Documentation

Please refer to the full [zkWeb documentation](https://sarah-m-benson.notion.site/sarah-m-benson/zkWeb-User-API-Documentation-8f183fe4d3a14fab845918bd8237b109#01ed3a7752f9488d9674b1c9509ba103) for a comprehensive overview of ZKP technical implementation.

## Deploy to Vercel

All pushes to the `main` branch will trigger a production deployment.

## Clone and run locally

1. Clone the project

2. Create a `.env.local` and update the following (reach out about becoming a contributor to get env credentials):

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Without the env values you can still build the frontend locally but you wil not be able to see any of the proofs or make calls to the database. [In the future](https://github.com/users/SarahMAmann/projects/1?pane=issue&itemId=51313816), the goal is to set up Supabase for local development.

3. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).
  
4. Husky pre-commit hooks are set up to run both the unit tests and the linter. These can also be run separately with the commands `npm run test` and `npm run lint`.


## Feedback and issues

Please file feedback and issues over on the [zkWeb GitHub org](https://github.com/SarahMAmann/zkWeb/issues).

## Become a Contributor

If you would like to become a zkWeb contributor, please reach out to `zkwebproject@gmail.com` to introduce yourself and tell us why you want to help out!
Open tickets: [task board](https://github.com/users/SarahMAmann/projects/1)

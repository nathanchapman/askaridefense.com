# Askari website recreation

This local educational recreation uses Next.js 16, React 19, TypeScript, Bun, and Tailwind CSS 4. The homepage follows the reference section by section, with locally hosted fonts and media. The careers, values, press, company story, and legal pages are included.

Run the site with:

```sh
bun install --cpu '*'
bun run dev
```

Open [localhost:3000](http://localhost:3000). The install command includes native packages for both Apple Silicon and Rosetta when Bun and Node use different architectures.

For LAN testing, open the Network URL printed by the development server on a device connected to the same network. The development config allows this machine's current IPv4 addresses to access Next.js dev resources, including hot reload. Restart the server after switching networks or changing IP addresses. Conductor uses its assigned port in the Network URL.

Run validation with:

```sh
bun run typecheck
bun run test:e2e
bun run build
```

The browser tests use an installed Google Chrome. Run `bun run start` to serve the production build.

The contact and product inquiry forms validate input and show a local demo confirmation. They do not send or store messages. External news, social, and job links retain their original destinations. No account or backend service is required.

Homepage sections live in `src/components/` and `src/app/page.tsx`. The linked pages use the Next.js App Router. Public article content is stored in `src/data/`, and reference media is stored in `public/`. The site includes reduced-motion support and keyboard access to the contact panel.

The media and brand assets come from askaridefense.com and are included for this private educational exercise. The application is marked `noindex`.

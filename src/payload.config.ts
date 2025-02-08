// Import Storage Adapter Placeholder (if needed in the future)
import { postgresAdapter } from '@payloadcms/db-postgres';

import sharp from 'sharp'; // Image optimization
import path from 'path';
import { buildConfig, PayloadRequest } from 'payload';
import { fileURLToPath } from 'url';

import { Categories } from './collections/Categories';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Posts } from './collections/Posts';
import { Users } from './collections/Users';
import { Footer } from './Footer/config';
import { Header } from './Header/config';
import { plugins } from './plugins';
import { defaultLexical } from '@/fields/defaultLexical';
import { getServerSideURL } from './utilities/getURL';
import { Services } from './collections/Services';
import { Clients } from './collections/Clients';
import { Projects } from './collections/Projects';
import { AIAssistants } from './collections/AIAssistants';
import { CaseStudies } from './collections/CaseStudies';
import { Testimonials } from './collections/Testimonials';
import { Settings } from './collections/Settings';
import { ClientsSocialMediaPosts } from './collections/clients_social_media_posts';


// Resolve directory name for compatibility
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    branding: {
      logo: '/DelpumaLogo.svg', // ✅ Make sure this file exists in `/public`
      favicon: '/favicon.ico',  // ✅ Optional custom favicon
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    disableSuspense: true, // ✅ Prevents React hydration mismatch issues
  },
  importMap: {
    baseDir: path.resolve(process.cwd()), // ✅ More reliable than dirname
  },
  user: Users.slug,
  livePreview: {
    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
      { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
      { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
    ],
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: (() => {
        const databaseURI = process.env.DATABASE_URI;
        if (!databaseURI) {
          throw new Error('❌ Missing DATABASE_URI! Please set it in your .env file.');
        }
        return databaseURI;
      })(),
    },
  }),
  collections: [Pages, Posts, Media, Services, Clients, Projects, AIAssistants, CaseStudies,ClientsSocialMediaPosts, Testimonials, Categories, Users, Settings],
  cors: [process.env.SERVER_URL || 'http://localhost:3000'], // ✅ Safer fallback for local & production
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true;
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});

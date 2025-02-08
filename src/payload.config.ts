import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp' // Image optimization
import nodemailer from 'nodemailer'
import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'

// ✅ Import Collections
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { Clients } from './collections/Clients'
import { Projects } from './collections/Projects'
import { AIAssistants } from './collections/AIAssistants'
import { CaseStudies } from './collections/CaseStudies'
import { Testimonials } from './collections/Testimonials'
import { Settings } from './collections/Settings'
import { ClientsSocialMediaPosts } from './collections/clients_social_media_posts'
import { BlogPosts } from './collections/BlogPosts'

// ✅ Import Globals
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'

// ✅ Import Utilities
import { defaultLexical } from '@/fields/defaultLexical'

// Resolve directory name for compatibility
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ✅ Ensure DATABASE_URI exists
if (!process.env.DATABASE_URI) {
  throw new Error('❌ Missing DATABASE_URI! Set it in your .env file.')
}

// ✅ Email Adapter
const emailTransport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export default buildConfig({
  admin: {
    branding: {
      logo: '/DelpumaLogo.svg', // ✅ Ensure file exists in `/public`
      favicon: '/favicon.ico', // ✅ Optional favicon
    },
    components: {
      beforeLogin: '@/components/BeforeLogin',
      afterDashboard: '@/components/AfterDashboard',
    },
    disableSuspense: true, // ✅ Prevents React hydration mismatch issues
  },
  importMap: {
    baseDir: path.resolve(process.cwd()), // ✅ More reliable
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
      connectionString: process.env.DATABASE_URI,
    },
  }),
  email: {
    fromName: 'Kitt3n AI',
    fromAddress: process.env.EMAIL_FROM || 'no-reply@yourdomain.com',
    transport: emailTransport,
  },
  collections: [
    Pages,
    Posts,
    Media,
    Services,
    Clients,
    Projects,
    AIAssistants,
    CaseStudies,
    ClientsSocialMediaPosts,
    Testimonials,
    BlogPosts,
    Categories,
    Users,
    Settings,
  ],
  cors: [process.env.SERVER_URL || 'http://localhost:3000'],
  globals: [Header, Footer],
  plugins: [
    ...plugins,
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})

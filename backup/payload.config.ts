export default buildConfig({
  admin: {
    branding: {
      logo: '/DelpumaLogo.svg',
      favicon: '/favicon.ico',
    },
    components: {
      beforeLogin: '@/components/BeforeLogin',
      afterDashboard: '@/components/AfterDashboard',
    },
    disableSuspense: true,
  },
  importMap: {
    baseDir: path.resolve(process.cwd()),
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

  email: process.env.NODE_ENV === 'production' ? {
    fromName: 'Your App',
    fromAddress: 'no-reply@yourapp.com',
    transport: {
      host: 'smtp.your-email-provider.com',
      port: 587,
      auth: {
        user: 'your-username',
        pass: 'your-password',
      },
    },
  } : null,

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
  plugins: [...plugins],
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

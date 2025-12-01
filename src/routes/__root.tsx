import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { MainLayout } from '../components/layouts/MainLayout'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ISKM Montreal | Hare Krishna Temple',
      },
      {
        name: 'description',
        content: 'Welcome to ISKM Montreal. Join us for spiritual programs, kirtan, and prasadam. Dedicated to the teachings of Srila Prabhupada.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: 'ISKM Montreal | Hare Krishna Temple',
      },
      {
        property: 'og:description',
        content: 'Welcome to ISKM Montreal. Join us for spiritual programs, kirtan, and prasadam. Dedicated to the teachings of Srila Prabhupada.',
      },
      {
        property: 'og:image',
        content: '/iskm-montreal-banner.png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'ISKM Montreal | Hare Krishna Temple',
      },
      {
        name: 'twitter:description',
        content: 'Welcome to ISKM Montreal. Join us for spiritual programs, kirtan, and prasadam. Dedicated to the teachings of Srila Prabhupada.',
      },
      {
        name: 'twitter:image',
        content: '/iskm-montreal-banner.png',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/iskm-montreal.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/iskm-montreal.png',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <a href="/" className="text-primary hover:underline">
        Go back home
      </a>
    </div>
  )
}

import { ThemeProvider } from '@/components/theme-provider'

// ... imports

import { CommandMenu } from '@/components/command-menu'

// ... imports

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="pondi-ui-theme">
          <MainLayout>
            {children}
          </MainLayout>
          <CommandMenu />
        </ThemeProvider>
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}

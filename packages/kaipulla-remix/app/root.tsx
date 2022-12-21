import { createEmotionCache, MantineProvider } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from "@remix-run/react"
import { NotificationsProvider } from "@mantine/notifications"

import { theme } from "./theme"
import { ModalsProvider } from "@mantine/modals"
import { StylesPlaceholder } from "@mantine/remix"
import { NGProgress } from "@helluwa/ui"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kaipulla",
  viewport: "width=device-width,initial-scale=1",
})

createEmotionCache({ key: "mantine" })

export default function App() {
  const transition = useTransition()

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <ModalsProvider>
          <html lang='en'>
            <head>
              <StylesPlaceholder />
              <Meta />
              <Links />
            </head>
            <body style={{ margin: 0 }}>
              <div style={{zIndex:1000}}>
                <NGProgress
                  isAnimating={
                    transition.state === "loading" ||
                    transition.state === "submitting"
                  }
                />
              </div>
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </body>
          </html>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

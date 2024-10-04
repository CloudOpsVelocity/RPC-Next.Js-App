import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

type RouteConfig = {
  [key: string]: {
    [key: string]: string
  }
}

const config: RouteConfig = {
  builderRoutes: {
    base: "/builders",
    "base/[city]": "/builder/[city]",
    "base/[city]/[slug]": "/builder/[city]/[slug]"
  },
  projectRoutes: {
    base:"/projects/"
    // Add project routes here
  }
}

type LinkRouterProps = Omit<LinkProps, 'href'> & {
  routeType: keyof RouteConfig
  routeKey: string
  params?: { [key: string]: string }
  children: ReactNode
}

export default function LinkRouter({ routeType, routeKey, params, children, ...rest }: LinkRouterProps) {
    // builders/

  const baseRoute = config[routeType][routeKey];
  let href = baseRoute
//   if (params) {
//     href = Object.keys(params).reduce((acc, key) => {
//       return acc.replace(`[${key}]`, params[key])
//     }, href)
//   }

  return <Link href={href}  {...rest}>{children}</Link>
}
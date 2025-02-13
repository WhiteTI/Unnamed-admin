/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as appAuthImport } from './routes/(app)/_auth'
import { Route as appAuthDashboardImport } from './routes/(app)/_auth.dashboard'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const appAuthRoute = appAuthImport.update({
  id: '/_auth',
  getParentRoute: () => appRoute,
} as any)

const appAuthDashboardRoute = appAuthDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => appAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/(app)': {
      id: '/(app)'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_auth': {
      id: '/(app)/_auth'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAuthImport
      parentRoute: typeof appRoute
    }
    '/(app)/_auth/dashboard': {
      id: '/(app)/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof appAuthDashboardImport
      parentRoute: typeof appAuthImport
    }
  }
}

// Create and export the route tree

interface appAuthRouteChildren {
  appAuthDashboardRoute: typeof appAuthDashboardRoute
}

const appAuthRouteChildren: appAuthRouteChildren = {
  appAuthDashboardRoute: appAuthDashboardRoute,
}

const appAuthRouteWithChildren =
  appAuthRoute._addFileChildren(appAuthRouteChildren)

interface appRouteChildren {
  appAuthRoute: typeof appAuthRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appAuthRoute: appAuthRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/login': typeof LoginRoute
  '/': typeof appAuthRouteWithChildren
  '/dashboard': typeof appAuthDashboardRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/': typeof appAuthRouteWithChildren
  '/dashboard': typeof appAuthDashboardRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/login': typeof LoginRoute
  '/(app)': typeof appRouteWithChildren
  '/(app)/_auth': typeof appAuthRouteWithChildren
  '/(app)/_auth/dashboard': typeof appAuthDashboardRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/login' | '/' | '/dashboard'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/' | '/dashboard'
  id:
    | '__root__'
    | '/login'
    | '/(app)'
    | '/(app)/_auth'
    | '/(app)/_auth/dashboard'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LoginRoute: typeof LoginRoute
  appRoute: typeof appRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LoginRoute: LoginRoute,
  appRoute: appRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/login",
        "/(app)"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/(app)": {
      "filePath": "(app)",
      "children": [
        "/(app)/_auth"
      ]
    },
    "/(app)/_auth": {
      "filePath": "(app)/_auth.tsx",
      "parent": "/(app)",
      "children": [
        "/(app)/_auth/dashboard"
      ]
    },
    "/(app)/_auth/dashboard": {
      "filePath": "(app)/_auth.dashboard.tsx",
      "parent": "/(app)/_auth"
    }
  }
}
ROUTE_MANIFEST_END */

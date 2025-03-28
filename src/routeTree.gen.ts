/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as ForgotPasswordImport } from './routes/forgot-password'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedAboutImport } from './routes/_authenticated/about'
import { Route as AuthenticatedCategoriesIndexImport } from './routes/_authenticated/categories/index'
import { Route as AuthenticatedInviteInviteTokenImport } from './routes/_authenticated/invite/$inviteToken'
import { Route as AuthenticatedCategoriesCategoryNameImport } from './routes/_authenticated/categories/$categoryName'
import { Route as AuthenticatedCategoriesCategoryNameTaskListIdImport } from './routes/_authenticated/categories/$categoryName_/$taskListId'
import { Route as AuthenticatedAssignTaskListTaskListIdImport } from './routes/_authenticated/assign/task-list/$taskListId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ForgotPasswordRoute = ForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedAboutRoute = AuthenticatedAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCategoriesIndexRoute =
  AuthenticatedCategoriesIndexImport.update({
    id: '/categories/',
    path: '/categories/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedInviteInviteTokenRoute =
  AuthenticatedInviteInviteTokenImport.update({
    id: '/invite/$inviteToken',
    path: '/invite/$inviteToken',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCategoriesCategoryNameRoute =
  AuthenticatedCategoriesCategoryNameImport.update({
    id: '/categories/$categoryName',
    path: '/categories/$categoryName',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedCategoriesCategoryNameTaskListIdRoute =
  AuthenticatedCategoriesCategoryNameTaskListIdImport.update({
    id: '/categories/$categoryName_/$taskListId',
    path: '/categories/$categoryName/$taskListId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedAssignTaskListTaskListIdRoute =
  AuthenticatedAssignTaskListTaskListIdImport.update({
    id: '/assign/task-list/$taskListId',
    path: '/assign/task-list/$taskListId',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/about': {
      id: '/_authenticated/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AuthenticatedAboutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/$categoryName': {
      id: '/_authenticated/categories/$categoryName'
      path: '/categories/$categoryName'
      fullPath: '/categories/$categoryName'
      preLoaderRoute: typeof AuthenticatedCategoriesCategoryNameImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/invite/$inviteToken': {
      id: '/_authenticated/invite/$inviteToken'
      path: '/invite/$inviteToken'
      fullPath: '/invite/$inviteToken'
      preLoaderRoute: typeof AuthenticatedInviteInviteTokenImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/': {
      id: '/_authenticated/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof AuthenticatedCategoriesIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/assign/task-list/$taskListId': {
      id: '/_authenticated/assign/task-list/$taskListId'
      path: '/assign/task-list/$taskListId'
      fullPath: '/assign/task-list/$taskListId'
      preLoaderRoute: typeof AuthenticatedAssignTaskListTaskListIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/categories/$categoryName_/$taskListId': {
      id: '/_authenticated/categories/$categoryName_/$taskListId'
      path: '/categories/$categoryName/$taskListId'
      fullPath: '/categories/$categoryName/$taskListId'
      preLoaderRoute: typeof AuthenticatedCategoriesCategoryNameTaskListIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedAboutRoute: typeof AuthenticatedAboutRoute
  AuthenticatedCategoriesCategoryNameRoute: typeof AuthenticatedCategoriesCategoryNameRoute
  AuthenticatedInviteInviteTokenRoute: typeof AuthenticatedInviteInviteTokenRoute
  AuthenticatedCategoriesIndexRoute: typeof AuthenticatedCategoriesIndexRoute
  AuthenticatedAssignTaskListTaskListIdRoute: typeof AuthenticatedAssignTaskListTaskListIdRoute
  AuthenticatedCategoriesCategoryNameTaskListIdRoute: typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedAboutRoute: AuthenticatedAboutRoute,
  AuthenticatedCategoriesCategoryNameRoute:
    AuthenticatedCategoriesCategoryNameRoute,
  AuthenticatedInviteInviteTokenRoute: AuthenticatedInviteInviteTokenRoute,
  AuthenticatedCategoriesIndexRoute: AuthenticatedCategoriesIndexRoute,
  AuthenticatedAssignTaskListTaskListIdRoute:
    AuthenticatedAssignTaskListTaskListIdRoute,
  AuthenticatedCategoriesCategoryNameTaskListIdRoute:
    AuthenticatedCategoriesCategoryNameTaskListIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AuthenticatedAboutRoute
  '/categories/$categoryName': typeof AuthenticatedCategoriesCategoryNameRoute
  '/invite/$inviteToken': typeof AuthenticatedInviteInviteTokenRoute
  '/categories': typeof AuthenticatedCategoriesIndexRoute
  '/assign/task-list/$taskListId': typeof AuthenticatedAssignTaskListTaskListIdRoute
  '/categories/$categoryName/$taskListId': typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/about': typeof AuthenticatedAboutRoute
  '/categories/$categoryName': typeof AuthenticatedCategoriesCategoryNameRoute
  '/invite/$inviteToken': typeof AuthenticatedInviteInviteTokenRoute
  '/categories': typeof AuthenticatedCategoriesIndexRoute
  '/assign/task-list/$taskListId': typeof AuthenticatedAssignTaskListTaskListIdRoute
  '/categories/$categoryName/$taskListId': typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/forgot-password': typeof ForgotPasswordRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/_authenticated/about': typeof AuthenticatedAboutRoute
  '/_authenticated/categories/$categoryName': typeof AuthenticatedCategoriesCategoryNameRoute
  '/_authenticated/invite/$inviteToken': typeof AuthenticatedInviteInviteTokenRoute
  '/_authenticated/categories/': typeof AuthenticatedCategoriesIndexRoute
  '/_authenticated/assign/task-list/$taskListId': typeof AuthenticatedAssignTaskListTaskListIdRoute
  '/_authenticated/categories/$categoryName_/$taskListId': typeof AuthenticatedCategoriesCategoryNameTaskListIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/about'
    | '/categories/$categoryName'
    | '/invite/$inviteToken'
    | '/categories'
    | '/assign/task-list/$taskListId'
    | '/categories/$categoryName/$taskListId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/about'
    | '/categories/$categoryName'
    | '/invite/$inviteToken'
    | '/categories'
    | '/assign/task-list/$taskListId'
    | '/categories/$categoryName/$taskListId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/_authenticated/about'
    | '/_authenticated/categories/$categoryName'
    | '/_authenticated/invite/$inviteToken'
    | '/_authenticated/categories/'
    | '/_authenticated/assign/task-list/$taskListId'
    | '/_authenticated/categories/$categoryName_/$taskListId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  ForgotPasswordRoute: typeof ForgotPasswordRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  ForgotPasswordRoute: ForgotPasswordRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
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
        "/_authenticated",
        "/forgot-password",
        "/login",
        "/register"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/about",
        "/_authenticated/categories/$categoryName",
        "/_authenticated/invite/$inviteToken",
        "/_authenticated/categories/",
        "/_authenticated/assign/task-list/$taskListId",
        "/_authenticated/categories/$categoryName_/$taskListId"
      ]
    },
    "/forgot-password": {
      "filePath": "forgot-password.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/_authenticated/about": {
      "filePath": "_authenticated/about.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/$categoryName": {
      "filePath": "_authenticated/categories/$categoryName.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/invite/$inviteToken": {
      "filePath": "_authenticated/invite/$inviteToken.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/": {
      "filePath": "_authenticated/categories/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/assign/task-list/$taskListId": {
      "filePath": "_authenticated/assign/task-list/$taskListId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/categories/$categoryName_/$taskListId": {
      "filePath": "_authenticated/categories/$categoryName_/$taskListId.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */

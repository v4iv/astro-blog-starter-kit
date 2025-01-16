import express from "express"
// import type { RequestHandler } from "express"
import cookieParser from "cookie-parser"
import ServerlessHttp from "serverless-http"
import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer"
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs"
import cors from "cors"

import { databaseClient } from "../../tina/__generated__/databaseClient"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true"

const tinaBackend = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: process.env.NEXTAUTH_SECRET || "",
          debug: true,
        }),
      }),
  databaseClient,
})

app.post("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  tinaBackend(req, res, next)
})

app.get("/api/tina/*", async (req, res, next) => {
  // Modify request if needed
  tinaBackend(req, res, next)
})

export const handler = ServerlessHttp(app)
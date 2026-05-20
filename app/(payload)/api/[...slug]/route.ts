import { handlePayloadRequest } from '@payloadcms/next/routes'
import configPromise from '@payload-config'

export const GET = (req: Request) => handlePayloadRequest(req, configPromise)
export const POST = (req: Request) => handlePayloadRequest(req, configPromise)
export const PUT = (req: Request) => handlePayloadRequest(req, configPromise)
export const PATCH = (req: Request) => handlePayloadRequest(req, configPromise)
export const DELETE = (req: Request) => handlePayloadRequest(req, configPromise)

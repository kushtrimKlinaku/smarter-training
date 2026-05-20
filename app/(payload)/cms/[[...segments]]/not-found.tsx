import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { importMap } from '../../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default function NotFound({ params, searchParams }: Args) {
  return NotFoundPage({ config: configPromise, importMap, params, searchParams })
}

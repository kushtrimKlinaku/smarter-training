import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { importMap } from '../../importMap'

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams })

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export default function Page({ params, searchParams }: Args) {
  return RootPage({ config: configPromise, importMap, params, searchParams })
}

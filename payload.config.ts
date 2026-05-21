import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || 'super-secret-key-change-in-production',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Smarter Training CMS',
    },
  },

  routes: {
    admin: '/cms',
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  collections: [
    // ── Users (built-in auth) ──────────────────────────────────────────
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [],
    },

    // ── Programs ──────────────────────────────────────────────────────
    {
      slug: 'programs',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'level', 'active'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titulli',
        },
        {
          name: 'tag',
          type: 'text',
          required: true,
          label: 'Etiketa (tag)',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Përshkrimi',
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Kohëzgjatja',
        },
        {
          name: 'level',
          type: 'select',
          label: 'Niveli',
          options: [
            { label: 'Bazë', value: 'Bazë' },
            { label: 'Mesatar', value: 'Mesatar' },
            { label: 'Avancuar', value: 'Avancuar' },
          ],
        },
        {
          name: 'participants',
          type: 'text',
          label: 'Pjesëmarrësit',
        },
        {
          name: 'accent',
          type: 'text',
          label: 'Ngjyra (hex)',
          defaultValue: '#D4753A',
        },
        {
          name: 'category',
          type: 'select',
          label: 'Kategoria',
          options: [
            { label: 'Lidershipë & Biznes', value: 'Lidershipë & Biznes' },
            { label: 'Kreativitet & Dizajn', value: 'Kreativitet & Dizajn' },
            { label: 'Zhvillim Personal', value: 'Zhvillim Personal' },
            { label: 'Shitje & Shërbime', value: 'Shitje & Shërbime' },
            { label: 'Teknologji', value: 'Teknologji' },
          ],
        },
        {
          name: 'active',
          type: 'checkbox',
          label: 'Aktiv',
          defaultValue: true,
        },
      ],
    },

    // ── Hero ──────────────────────────────────────────────────────────
    {
      slug: 'hero',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Teksti i vogël mbi titull',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titulli kryesor',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'Nëntitulli',
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          label: 'Butoni kryesor',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          label: 'Butoni dytësor',
        },
      ],
    },

    // ── Testimonials ─────────────────────────────────────────────────
    {
      slug: 'testimonials',
      admin: {
        useAsTitle: 'authorName',
        defaultColumns: ['authorName', 'authorCompany', 'active'],
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Citimi',
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
          label: 'Emri i autorit',
        },
        {
          name: 'authorRole',
          type: 'text',
          label: 'Pozita',
        },
        {
          name: 'authorCompany',
          type: 'text',
          label: 'Kompania',
        },
        {
          name: 'active',
          type: 'checkbox',
          label: 'Aktiv',
          defaultValue: true,
        },
      ],
    },
  ],
})

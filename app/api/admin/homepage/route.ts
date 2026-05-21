import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false }
});

const DEFAULT_CONTENT = {
  services: {
    title: 'Shërbimet',
    subtitle: 'Përfitoni në disa fusha. Çfarëdo qofshin nevojat e biznesit tuaj, shërbimet tona dhe përvoja shumë vjeçare u vijnë në ndihmë.',
    items: [
      { id: 'trajnime', title: 'Trajnime', description: 'Trajnime që i shërbejnë rritjes dhe zhvillimit të entiteteve.\n\n• Mbi 70 programe tashmë të vlerësuara\n• Zhvillim të trajnimeve për nevoja specifike\n• Matje para dhe pas trajnimit' },
      { id: 'coaching', title: 'Coaching', description: 'Coaching ju mundëson të përgatisni stafin tuaj për sfida të reja, përmes qasjes individuale.\n\n• Coaching për nivel Ekzekutiv\n• Coaching për performansë\n• Coaching për jetë' },
      { id: 'rekreacion', title: 'Rekreacion', description: 'Aktivitete Rekreative të kombinuara me zhvillim të shprehive për:\n\n• Forcim të ekipeve\n• Motivim të punonjësve\n• Socializime dhe ngjarje' },
      { id: 'matje', title: 'Matje e përforcim', description: 'Matje për vlerësimin e gjendjes dhe përcaktimin e qasjes për intervenim.\n\n• Analizë të Nevojës për Trajnime\n• Përcjellje dhe matje të rezultateve pas trajnimit\n• Modeli KIRKPATRICK i adaptuar për tregun tonë' },
      { id: 'manuale', title: 'Manuale', description: 'Përpilim i manualeve për:\n\n• Trajnime të brendshme\n• Udhëzime për ndryshime operacionale\n• Ndërtim të kurrikulave' },
    ],
  },
};

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS custom_cms_settings (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL
      );
    `);
  } finally {
    client.release();
  }
}

export async function GET() {
  try {
    await initDB();
    const result = await pool.query('SELECT value FROM custom_cms_settings WHERE key = $1', ['homepage']);
    
    if (result.rows.length === 0) {
      return NextResponse.json(DEFAULT_CONTENT);
    }
    
    return NextResponse.json(result.rows[0].value);
  } catch (error) {
    console.error('Error reading homepage from DB:', error);
    // Fallback to default if DB fails
    return NextResponse.json(DEFAULT_CONTENT);
  }
}

export async function POST(request: NextRequest) {
  try {
    await initDB();
    const body = await request.json();
    
    await pool.query(`
      INSERT INTO custom_cms_settings (key, value) 
      VALUES ($1, $2)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `, ['homepage', JSON.stringify(body)]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing homepage to DB:', error);
    return NextResponse.json({ error: 'Failed to save homepage data' }, { status: 500 });
  }
}

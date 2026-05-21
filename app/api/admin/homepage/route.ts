import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const HOMEPAGE_FILE = path.join(process.cwd(), 'data', 'homepage.json');

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

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

export async function GET() {
  try {
    ensureDataDir();
    if (!fs.existsSync(HOMEPAGE_FILE)) {
      // Return defaults if file doesn't exist yet
      return NextResponse.json(DEFAULT_CONTENT);
    }
    const raw = fs.readFileSync(HOMEPAGE_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading homepage.json:', error);
    return NextResponse.json({ error: 'Failed to read homepage data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    ensureDataDir();
    const body = await request.json();
    fs.writeFileSync(HOMEPAGE_FILE, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing homepage.json:', error);
    return NextResponse.json({ error: 'Failed to save homepage data' }, { status: 500 });
  }
}

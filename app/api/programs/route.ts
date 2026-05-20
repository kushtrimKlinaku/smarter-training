import { NextResponse } from 'next/server';
import { getPrograms, savePrograms } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const programs = getPrograms();
  return NextResponse.json(programs.items || []);
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const item = await request.json();
    const programsData = getPrograms();
    
    if (!item.id) {
       item.id = 'p' + Date.now();
    }
    
    if (!programsData.items) programsData.items = [];
    programsData.items.push(item);
    
    savePrograms(programsData);
    
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const item = await request.json();
    const programsData = getPrograms();
    
    if (!programsData.items) programsData.items = [];
    const index = programsData.items.findIndex((p: any) => p.id === item.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    
    programsData.items[index] = item;
    savePrograms(programsData);
    
    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    
    const programsData = getPrograms();
    if (!programsData.items) programsData.items = [];
    
    programsData.items = programsData.items.filter((p: any) => p.id !== id);
    savePrograms(programsData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

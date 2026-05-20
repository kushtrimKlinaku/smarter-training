import { NextResponse } from 'next/server';
import { getAnnouncements, saveAnnouncements } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const announcements = getAnnouncements();
  return NextResponse.json(announcements || []);
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const item = await request.json();
    const data = getAnnouncements();
    
    if (!item.id) {
       item.id = 'ann_' + Date.now();
    }
    
    data.push(item);
    
    saveAnnouncements(data);
    
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
    const data = getAnnouncements();
    
    const index = data.findIndex((p: any) => p.id === item.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    data[index] = item;
    saveAnnouncements(data);
    
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
    
    let data = getAnnouncements();
    
    data = data.filter((p: any) => p.id !== id);
    saveAnnouncements(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

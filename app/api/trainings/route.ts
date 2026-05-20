import { NextResponse } from 'next/server';
import { getTrainings, saveTrainings } from '@/lib/data';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const trainings = getTrainings();
  return NextResponse.json(trainings);
}

export async function POST(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const training = await request.json();
    const trainings = getTrainings();
    
    // Ensure slug doesn't exist
    if (trainings.find(t => t.slug === training.slug)) {
      return NextResponse.json({ error: 'Training with this slug already exists' }, { status: 400 });
    }
    
    trainings.push(training);
    saveTrainings(trainings);
    
    return NextResponse.json({ success: true, training }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const training = await request.json();
    const trainings = getTrainings();
    
    const index = trainings.findIndex(t => t.slug === training.slug);
    if (index === -1) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }
    
    trainings[index] = training;
    saveTrainings(trainings);
    
    return NextResponse.json({ success: true, training });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    
    const trainings = getTrainings();
    const updatedTrainings = trainings.filter(t => t.slug !== slug);
    
    saveTrainings(updatedTrainings);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET - Récupérer tous les témoignages
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des témoignages" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau témoignage
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const testimonial = await prisma.testimonial.create({
      data: {
        quote: body.quote,
        author: body.author,
        role: body.role,
        category: body.category,
        order: body.order || 0,
      }
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du témoignage" },
      { status: 500 }
    );
  }
}

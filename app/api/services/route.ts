import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Récupérer tous les services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des services" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const service = await prisma.service.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        icon: body.icon,
        features: JSON.stringify(body.features || []),
        order: body.order || 0,
      }
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du service" },
      { status: 500 }
    );
  }
}

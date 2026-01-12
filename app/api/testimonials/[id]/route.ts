import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
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
      { error: "Erreur lors de la mise à jour du témoignage" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await prisma.testimonial.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du témoignage" },
      { status: 500 }
    );
  }
}

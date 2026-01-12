import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Ajout des catégories par défaut...');

  const defaultCategories = [
    { name: 'Restaurant', order: 0 },
    { name: 'Auto', order: 1 },
    { name: 'BTP', order: 2 },
    { name: 'Corporate', order: 3 },
  ];

  for (const category of defaultCategories) {
    try {
      await prisma.category.create({
        data: category,
      });
      console.log(`✅ Catégorie "${category.name}" créée`);
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`⚠️  Catégorie "${category.name}" existe déjà`);
      } else {
        console.error(`❌ Erreur pour "${category.name}":`, error);
      }
    }
  }

  console.log('\n🎉 Catégories initialisées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

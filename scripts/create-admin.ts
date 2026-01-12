import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@sonosmedia.fr';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: 'Administrateur',
    },
  });

  console.log('✅ Utilisateur admin créé :');
  console.log(`   Email: ${email}`);
  console.log(`   Mot de passe: ${password}`);
  console.log('\n⚠️  Changez le mot de passe après la première connexion !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

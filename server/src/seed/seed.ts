import { prisma } from "@/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
    console.log("🌱 Starting database seed...\n");

    // ============================================================
    // PASSWORD
    // ============================================================

    const hashedPassword = await bcrypt.hash("Password@123", 10);

    // ============================================================
    // USERS
    // ============================================================

    console.log("👤 Creating users...");

    await prisma.user.upsert({
        where: {
            email: "john@example.com",
        },
        update: {
            name: "John Doe",
            password: hashedPassword,
        },
        create: {
            email: "john@example.com",
            name: "John Doe",
            password: hashedPassword,
        },
    });

    await prisma.user.upsert({
        where: {
            email: "jane@example.com",
        },
        update: {
            name: "Jane Smith",
            password: hashedPassword,
        },
        create: {
            email: "jane@example.com",
            name: "Jane Smith",
            password: hashedPassword,
        },
    });

    await prisma.user.upsert({
        where: {
            email: "alex@example.com",
        },
        update: {
            name: "Alex Johnson",
            password: hashedPassword,
        },
        create: {
            email: "alex@example.com",
            name: "Alex Johnson",
            password: hashedPassword,
        },
    });

    await prisma.user.upsert({
        where: {
            email: "mike@example.com",
        },
        update: {
            name: "Michael Thomas",
            password: hashedPassword,
        },
        create: {
            email: "mike@example.com",
            name: "Michael Thomas",
            password: hashedPassword,
        },
    });

    await prisma.user.upsert({
        where: {
            email: "sara@example.com",
        },
        update: {
            name: "Sara Wilson",
            password: hashedPassword,
        },
        create: {
            email: "sara@example.com",
            name: "Sara Wilson",
            password: hashedPassword,
        },
    });

    // ============================================================
    // SUMMARY
    // ============================================================

    console.log("========================================");
    console.log("🎉 DATABASE SEED COMPLETED");
    console.log("========================================");

    console.log("\n👤 Users: 5");

    console.log("\n🔐 Test login password:");
    console.log("Password@123");

    console.log("\n📧 Test users:");

    console.log("john@example.com");
    console.log("jane@example.com");
    console.log("alex@example.com");
    console.log("mike@example.com");
    console.log("sara@example.com");

    console.log("\n🌱 Done!");

}

main()
    .catch((error) => {
        console.error("\n❌ Database seeding failed:");
        console.error(error);

        process.exit(1);
    })
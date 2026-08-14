import { prisma } from "@/config/prisma.js";
import { generateSlug } from "@/utils/genSlug.js";
import type { EventStatus, MediaNames, SocialPlatform } from "@prisma/client";
import bcrypt from "bcrypt";

const TEST_PASSWORD = "Password@123";

type SeedEvent = {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    deadline: Date;
    isFree: boolean;
    price?: number;
    helpEmail: string;
    maxTickets: number;
    location: string;
    locationLink: string;
    venueName: string;
    status: EventStatus;
    socialLinks: { platform: SocialPlatform; url: string }[];
    media: { name: MediaNames; url: string }[];
};

const addDays = (days: number, hours: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hours, 0, 0, 0);
    return date;
};

const seedEvents: SeedEvent[] = [
    {
      title: "Kerala Tech Summit 2026",
      description:
        "A two-day technology conference bringing together developers, startup founders, designers, and technology enthusiasts from across Kerala.",
      startDate: addDays(7, 9),
      endDate: addDays(8, 18),
      deadline: addDays(5, 23),
      isFree: false,
      price: 999,
      maxTickets: 500,
      location: "Kochi, Kerala",
      locationLink: "https://maps.google.com/?q=Grand+Hyatt+Kochi",
      venueName: "Grand Hyatt Kochi Bolgatty",
      helpEmail: "help@keralatechsummit.com",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "INSTAGRAM", url: "https://www.instagram.com" },
        { platform: "LINKEDIN", url: "https://www.linkedin.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        },
      ],
    },
  
    {
      title: "React Kerala Meetup",
      description:
        "A community meetup for React developers featuring technical talks, live coding sessions, networking, and discussions about modern frontend development.",
      startDate: addDays(14, 10),
      endDate: addDays(14, 16),
      deadline: addDays(12, 23),
      isFree: true,
      maxTickets: 150,
      location: "Kozhikode, Kerala",
      locationLink:
        "https://maps.google.com/?q=Hilite+Business+Park+Kozhikode",
      venueName: "Hilite Business Park",
      helpEmail: "support@reactkerala.dev",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "LINKEDIN", url: "https://www.linkedin.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        },
      ],
    },
  
    {
      title: "AI and Machine Learning Workshop",
      description:
        "A hands-on workshop covering machine learning fundamentals, neural networks, generative AI, and practical AI application development.",
      startDate: addDays(28, 9),
      endDate: addDays(28, 17),
      deadline: addDays(26, 23),
      isFree: false,
      price: 1499,
      maxTickets: 100,
      location: "Infopark, Kochi, Kerala",
      locationLink: "https://maps.google.com/?q=Infopark+Kochi",
      venueName: "Infopark Kochi",
      helpEmail: "help@aiworkshopkerala.com",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "YOUTUBE", url: "https://www.youtube.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1555255707-c07966088b7b",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        },
      ],
    },
  
    {
      title: "Startup Kerala 2026",
      description:
        "An entrepreneurship conference focused on startups, innovation, fundraising, product development, and building technology businesses.",
      startDate: addDays(21, 9),
      endDate: addDays(21, 18),
      deadline: addDays(19, 23),
      isFree: false,
      price: 499,
      maxTickets: 800,
      location: "Technopark, Thiruvananthapuram, Kerala",
      locationLink:
        "https://maps.google.com/?q=Technopark+Trivandrum",
      venueName: "Technopark",
      helpEmail: "hello@startupkerala.org",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "INSTAGRAM", url: "https://www.instagram.com" },
        { platform: "LINKEDIN", url: "https://www.linkedin.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
        },
      ],
    },
  
    {
      title: "Design and Innovation Conference",
      description:
        "A creative conference for UI UX designers, product designers, developers, and entrepreneurs exploring the future of digital experiences.",
      startDate: addDays(35, 10),
      endDate: addDays(35, 17),
      deadline: addDays(33, 23),
      isFree: true,
      maxTickets: 300,
      location: "Kochi, Kerala",
      locationLink:
        "https://maps.google.com/?q=Lulu+Convention+Centre+Kochi",
      venueName: "Lulu Convention Centre",
      helpEmail: "designhelp@innovationkerala.com",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "INSTAGRAM", url: "https://www.instagram.com" },
        { platform: "FACEBOOK", url: "https://www.facebook.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        },
      ],
    },
  
    {
      title: "Full Stack Developer Bootcamp",
      description:
        "An intensive developer workshop covering frontend development, backend APIs, databases, authentication, deployment, and modern web development practices.",
      startDate: addDays(42, 9),
      endDate: addDays(43, 18),
      deadline: addDays(39, 23),
      isFree: false,
      price: 1999,
      maxTickets: 80,
      location: "Kozhikode, Kerala",
      locationLink:
        "https://maps.google.com/?q=UL+CyberPark+Kozhikode",
      venueName: "UL CyberPark",
      helpEmail: "support@fullstackbootcamp.dev",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "LINKEDIN", url: "https://www.linkedin.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        },
      ],
    },
  
    {
      title: "Kerala Photography Walk",
      description:
        "A community photography event where photographers of all skill levels explore the streets, architecture, and culture of Fort Kochi.",
      startDate: addDays(49, 7),
      endDate: addDays(49, 12),
      deadline: addDays(48, 23),
      isFree: true,
      maxTickets: 50,
      location: "Fort Kochi, Kerala",
      locationLink: "https://maps.google.com/?q=Fort+Kochi",
      venueName: "Fort Kochi Beach",
      helpEmail: "hello@keralaphotowalk.com",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "INSTAGRAM", url: "https://www.instagram.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        },
      ],
    },
  
    {
      title: "Cyber Security Awareness Day",
      description:
        "An awareness event covering online security, password management, phishing attacks, privacy, secure development, and modern cyber threats.",
      startDate: addDays(56, 9),
      endDate: addDays(56, 16),
      deadline: addDays(54, 23),
      isFree: true,
      maxTickets: 250,
      location: "Thrissur, Kerala",
      locationLink:
        "https://maps.google.com/?q=Kerala+Sahitya+Akademi",
      venueName: "Kerala Sahitya Akademi",
      helpEmail: "securityhelp@keralacyber.org",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "LINKEDIN", url: "https://www.linkedin.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        },
      ],
    },
  
    {
      title: "Kerala Music and Arts Festival",
      description:
        "A celebration of music, art, culture, and local talent featuring live performances, exhibitions, workshops, and food experiences.",
      startDate: addDays(63, 14),
      endDate: addDays(64, 22),
      deadline: addDays(60, 23),
      isFree: false,
      price: 299,
      maxTickets: 1000,
      location: "Kochi, Kerala",
      locationLink:
        "https://maps.google.com/?q=Marine+Drive+Kochi",
      venueName: "Marine Drive Ground",
      helpEmail: "contact@keralaartsfest.com",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "INSTAGRAM", url: "https://www.instagram.com" },
        { platform: "YOUTUBE", url: "https://www.youtube.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        },
      ],
    },
  
    {
      title: "Developer Networking Night",
      description:
        "A casual networking event for developers, engineers, students, founders, and technology professionals to connect and share ideas.",
      startDate: addDays(70, 17),
      endDate: addDays(70, 21),
      deadline: addDays(69, 23),
      isFree: true,
      maxTickets: 120,
      location: "Kakkanad, Kochi, Kerala",
      locationLink:
        "https://maps.google.com/?q=Kakkanad+Kochi",
      venueName: "Startup Village",
      helpEmail: "events@devnetworkkerala.com",
      status: "PUBLISHED",
      socialLinks: [
        { platform: "LINKEDIN", url: "https://www.linkedin.com" },
      ],
      media: [
        {
          name: "BANNER",
          url: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
        },
        {
          name: "THUMBNAIL",
          url: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
        },
        {
          name: "LOGO",
          url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
        },
      ],
    },
  ];

async function main() {

    console.log("Starting database seed...");

    const password = await bcrypt.hash(TEST_PASSWORD, 10);
    const users = await Promise.all(
        [
            ["john@example.com", "John Doe"],
            ["jane@example.com", "Jane Smith"],
            ["alex@example.com", "Alex Johnson"],
            ["mike@example.com", "Michael Thomas"],
            ["sara@example.com", "Sara Wilson"],
        ].map(([email, name]) =>
            prisma.user.upsert({
                where: { email },
                update: { name, password },
                create: { email, name, password },
            }),
        ),
    );

    await prisma.$transaction([
        prisma.rsvp.deleteMany(),
        prisma.socialLink.deleteMany(),
        prisma.media.deleteMany(),
        prisma.event.deleteMany(),
    ]);

    const organiserIds = users.map(v => v.id);

    await prisma.$transaction(
        seedEvents.map(({ media, socialLinks, title, ...event }) => {
          const organiserId =
            organiserIds[Math.floor(Math.random() * organiserIds.length)];
      
          return prisma.event.create({
            data: {
              ...event,
              title,
              slug: generateSlug(title),
              organiserId,
              media: { create: media },
              socialLinks: { create: socialLinks },
            },
          });
        }),
    );

    console.log(`Seed complete: ${users.length} users and ${seedEvents.length} events.`);
    console.log(`Test password: ${TEST_PASSWORD}`);
}

main()
    .catch((error) => {
        console.error("Database seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

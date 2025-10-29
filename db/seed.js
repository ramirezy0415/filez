import db, { insertFolder, insertFile } from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folder1_results = await insertFolder({ name: "folder1" });
  const folder2_results = await insertFolder({ name: "folder2" });
  const folder3_results = await insertFolder({ name: "folder3" });

  const folder1 = folder1_results.id;
  const folder2 = folder2_results.id;
  const folder3 = folder3_results.id;
  // Files for Documents (ID 1)
  await insertFile({ name: "Resume.pdf", size: 350, folder_id: folder1 });
  await insertFile({
    name: "Taxes_2024.xlsx",
    size: 812,
    folder_id: folder1,
  });
  await insertFile({
    name: "Meeting_Notes.docx",
    size: 45,
    folder_id: folder1,
  });
  await insertFile({
    name: "Project_Plan.txt",
    size: 12,
    folder_id: folder1,
  });
  await insertFile({
    name: "Vacation_Itinerary.pdf",
    size: 150,
    folder_id: folder1,
  });
  await insertFile({
    name: "Presentation.pptx",
    size: 1024,
    folder_id: folder1,
  });

  // Files for Images (ID 2)
  await insertFile({ name: "Profile.jpg", size: 1500, folder_id: folder2 });
  await insertFile({ name: "Sunset.png", size: 5200, folder_id: folder2 });
  await insertFile({ name: "Logo.svg", size: 50, folder_id: folder2 });
  await insertFile({
    name: "Screenshot_1.jpg",
    size: 980,
    folder_id: folder2,
  });
  await insertFile({
    name: "Family_Portrait.heic",
    size: 4100,
    folder_id: folder2,
  });
  await insertFile({ name: "Icon_2.png", size: 200, folder_id: folder2 });

  // Files for Code (ID 3)
  await insertFile({ name: "index.js", size: 25, folder_id: folder3 });
  await insertFile({ name: "styles.css", size: 8, folder_id: folder3 });
  await insertFile({ name: "data.json", size: 120, folder_id: folder3 });
  await insertFile({ name: "server.ts", size: 500, folder_id: folder3 });
  await insertFile({ name: "utils.py", size: 30, folder_id: folder3 });
  await insertFile({ name: "README.md", size: 15, folder_id: folder3 });
}

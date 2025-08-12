import { auth } from "@clerk/nextjs/server";




export default async function Dashboard() {
  const { userId } = await auth();
  
  // Use userId for future functionality
  console.log('User ID:', userId);

  return <main className='p-4 text-3xl font-bold text-blue-600 underline'>Dashboard xd</main>;
}

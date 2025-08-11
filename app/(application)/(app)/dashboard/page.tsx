import { auth } from "@clerk/nextjs/server";




export default async function Dashboard() {

  const { userId } = await auth()

  return <main className='p-4 text-3xl font-bold text-blue-600 underline'>Dashboard xd</main>;
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-bold text-saddlebrown">
          Not Authenticated
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  const { name, email } = session.user;

  return (
    <div className="flex flex-col items-start w-full gap-8 mt-12">
      {/* Profile Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[3.5rem] font-bold text-saddlebrown leading-tight">
          My Profile
        </h1>
        <p className="text-xl text-saddlebrown/70 font-medium">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="w-full bg-white border-2 border-palegoldenrod rounded-3xl p-10 shadow-sm flex flex-col md:flex-row gap-10 items-center md:items-start">
        {/* Avatar Placeholder */}
        <div className="w-32 h-32 rounded-full bg-goldenrod flex items-center justify-center text-white text-5xl font-bold shrink-0">
          {name?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-saddlebrown/50 uppercase tracking-wider">
                Full Name
              </span>
              <span className="text-xl font-semibold text-saddlebrown">
                {name}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-saddlebrown/50 uppercase tracking-wider">
                Email Address
              </span>
              <span className="text-xl font-semibold text-saddlebrown">
                {email}
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-palegoldenrod mt-2" />

          <button className="w-max px-8 py-3 bg-saddlebrown text-white rounded-full font-bold hover:bg-saddlebrown/90 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

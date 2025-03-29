import { auth } from "../_lib/auth";
import PageHeading from "./ui/PageHeading";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default async function Header() {
  const session = await auth();
  // console.log(session);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="block sm:hidden">
          <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
        </div>

        <PageHeading />

        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            {!session ? (
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
            ) : (
              <img
                src={session.user.image}
                alt={session.user.image}
                className="h-8 w-8 rounded-[50%]"
                referrerPolicy="no-referrer"
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

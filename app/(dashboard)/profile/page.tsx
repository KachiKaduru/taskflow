import PageHeader from "@/app/_components/ui/PageHeader";
import EditProfile from "@/app/_components/ui/EditProfile";
import ProfileInfo from "@/app/_components/profile/ProfileInfo";
import Statistics from "@/app/_components/profile/Statistics";
import { getSession } from "@/app/_lib/auth/session";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getSession();
  const user = session?.user ?? { name: null, email: null, image: null };

  return (
    <section className="space-y-6">
      <PageHeader title="Your Profile">
        <EditProfile />
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileInfo user={user} />

        {/* <Statistics /> */}
      </div>
    </section>
  );
}

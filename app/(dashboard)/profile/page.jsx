import PageHeader from "@/app/_components/ui/PageHeader";
import EditProfile from "@/app/_components/ui/EditProfile";
import ProfileInfo from "@/app/_components/profile/ProfileInfo";
import Statistics from "@/app/_components/profile/Statistics";

export const metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <section className="space-y-6">
      <PageHeader title="Your Profile">
        <EditProfile />
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileInfo />

        <Statistics />
      </div>
    </section>
  );
}

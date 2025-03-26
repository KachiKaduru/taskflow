import PageHeader from "@/app/_components/ui/PageHeader";
import NotificationSettings from "@/app/_components/settings/NotificationSettings";
import PasswordSettings from "@/app/_components/settings/PasswordSettings";
import AdvancedSettings from "@/app/_components/settings/AdvancedSettings";

export const metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="Settings" />

      <div className="lg:col-span-3 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NotificationSettings />
            <PasswordSettings />
          </div>

          <AdvancedSettings />
        </div>
      </div>
    </section>
  );
}

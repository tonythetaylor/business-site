import { useContent } from "../../contexts/ContentContext";
import HeaderSection from "./components/HeaderSection";
import ServicesGrid from "./components/ServicesGrid";
import DeliveryApproachSection from "./components/DeliveryApproachSection";
import EngagementModelsSection from "./components/EngagementModelsSection";

export default function ServicesPage() {
  const { content, loading, error } = useContent();

  if (loading && !content) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading services…
      </p>
    );
  }

  if (error && !content) {
    return (
      <p className="text-center text-red-600">
        Failed to load services.
      </p>
    );
  }

  if (!content) return null;

  const { services } = content;

  return (
    <div className="space-y-6">
      <HeaderSection />

      <ServicesGrid services={services} />

      <div className="grid gap-5 md:grid-cols-2">
        <DeliveryApproachSection />
        <EngagementModelsSection />
      </div>
    </div>
  );
}
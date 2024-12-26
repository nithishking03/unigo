import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  className?: string;
}

export const ServiceCard = ({ title, description, icon: Icon, to, className }: ServiceCardProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "block group p-6 bg-white rounded-xl shadow-sm border transition-all duration-200",
        "hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};
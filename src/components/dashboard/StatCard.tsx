
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconClassName?: string;
  className?: string;
  index?: number;
  linkTo?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconClassName,
  className,
  index = 0,
  linkTo
}: StatCardProps) {
  const content = (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={cn("self-start", iconClassName)}>
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
  );

  return linkTo ? (
    <Link 
      to={linkTo}
      className={cn(
        "stat-card animate-fade-in cursor-pointer transition-all hover:shadow-md hover:-translate-y-1", 
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {content}
    </Link>
  ) : (
    <div 
      className={cn(
        "stat-card animate-fade-in", 
        className
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {content}
    </div>
  );
}

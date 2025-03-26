
import { Package2, Users, DollarSign, Activity } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RecentBookings from '@/components/dashboard/RecentBookings';

export default function Dashboard() {
  const stats = [
    { 
      title: 'Total Bookings', 
      value: '1,234', 
      icon: Package2, 
      iconClassName: 'stat-icon-blue' 
    },
    { 
      title: 'Active Users', 
      value: '856', 
      icon: Users, 
      iconClassName: 'stat-icon-green'
    },
    { 
      title: 'Total Revenue', 
      value: '$45,678', 
      icon: DollarSign, 
      iconClassName: 'stat-icon-yellow'
    },
    { 
      title: 'Active Trips', 
      value: '42', 
      icon: Activity, 
      iconClassName: 'stat-icon-purple'
    }
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconClassName={stat.iconClassName}
            index={index}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <RecentBookings />
        </div>
      </div>
    </div>
  );
}

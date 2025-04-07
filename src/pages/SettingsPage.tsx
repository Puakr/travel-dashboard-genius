
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Settings as SettingsIcon, User, Switch as SwitchIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input-elements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function SettingsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get the active tab from URL query params or default to 'profile'
  const query = new URLSearchParams(location.search);
  const activeTab = query.get('tab') || 'profile';
  
  // Set the active tab in URL when changing tabs
  const setActiveTab = (tab: string) => {
    navigate(`/settings?tab=${tab}`);
  };
  
  // Profile states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  // Settings states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [timeZone, setTimeZone] = useState("UTC");
  
  const handleSaveProfile = () => {
    // In a real app, you would update the user profile here
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully."
    });
  };
  
  // Render profile tab content
  const renderProfileTab = () => (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Your photo</CardTitle>
            <CardDescription>This will be displayed on your profile</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://github.com/shadcn.png" alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full">Change photo</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={user?.role || "User"} disabled />
            </div>
            
            <Button onClick={handleSaveProfile}>Save changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  // Render settings tab content
  const renderSettingsTab = () => (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="font-medium">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications for important updates
              </p>
            </div>
            <Switch 
              id="push-notifications" 
              checked={pushNotifications} 
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timezone">Time Zone</Label>
            <Select value={timeZone} onValueChange={setTimeZone}>
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue placeholder="Select a time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                <SelectItem value="CST">Central Time (CST)</SelectItem>
                <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                <SelectItem value="PST">Pacific Time (PST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSaveSettings}>Save preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
  
  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeTab === 'profile' ? "default" : "outline"} 
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2"
        >
          <User size={16} />
          <span>Profile</span>
        </Button>
        <Button 
          variant={activeTab === 'settings' ? "default" : "outline"} 
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2"
        >
          <SettingsIcon size={16} />
          <span>Settings</span>
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">
        {activeTab === 'profile' ? 'Profile' : 'Settings'}
      </h1>
      
      {/* Tab content */}
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </div>
  );
}

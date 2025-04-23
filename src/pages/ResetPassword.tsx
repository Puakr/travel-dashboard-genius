
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Plane, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.includes("access_token")) {
      setTokenError(true);
      setError("Invalid or expired reset link. Please request a new password reset.");
      console.error("No access token found in URL hash");
    } else {
      console.log("Access token found in URL hash");
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError("Please enter both password fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Attempting to update password...");
      const { data, error } = await supabase.auth.updateUser({ password });
      
      console.log("Password update response:", data, error);
      
      if (error) {
        throw error;
      }
      
      setIsSuccess(true);
      toast.success("Password has been reset successfully", {
        description: "You can now sign in with your new password"
      });
      
      if (window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      
      // Auto redirect to sign in page after 3 seconds
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to reset password");
      toast.error("Failed to reset password", {
        description: err.message || "Please try again or request a new reset link"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zippy-darker">
      <div className="w-full max-w-md px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-zippy-blue mr-2">
              <Plane size={40} />
            </div>
            <h1 className="text-4xl font-bold text-white">ZippyTrip</h1>
          </div>
          <p className="text-gray-400">Reset your password</p>
        </div>
        
        <Card className="border-white/[0.05] bg-zippy-dark shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Reset Password
            </CardTitle>
            <CardDescription className="text-center">
              {tokenError ? "Link error" : isSuccess ? "Success" : "Enter your new password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {tokenError ? (
              <div className="text-center py-4">
                <p className="text-white mb-4">
                  The password reset link is invalid or has expired.
                </p>
                <p className="text-gray-400 mb-4">
                  Please request a new password reset link.
                </p>
                <Button
                  className="mt-4 bg-zippy-blue hover:bg-zippy-blue/90"
                  onClick={handleBackToSignIn}
                >
                  Back to Sign In
                </Button>
              </div>
            ) : isSuccess ? (
              <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <p className="text-white mb-2 text-xl font-medium">
                  Password Reset Successful!
                </p>
                <p className="text-gray-400 mb-6">
                  Your password has been updated. You'll be redirected to the login page in a moment.
                </p>
                <div className="animate-pulse mb-2 text-center text-sm text-gray-500">
                  Redirecting...
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-white">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-zippy-darker border-white/10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-zippy-darker border-white/10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      className="w-full bg-zippy-blue hover:bg-zippy-blue/90 rounded-md h-12" 
                      type="submit" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <button 
              onClick={handleBackToSignIn}
              className="text-sm text-zippy-blue hover:underline focus:outline-none"
            >
              Back to Sign In
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

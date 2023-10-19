"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { AuthService } from "@/services";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const [userData, setUserData] = useState<null | User>(null);
  const { toast } = useToast();
  const router = useRouter();

  const logout = async () => {
    await AuthService.logout();
    router.push("/authentication");
  };

  const handleClick = async () => {
    try {
      await logout();
      toast({
        description: "Logout Successfully",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          description: error.response?.data.message,
        });
      }
    }
  };

  const getUserDetails = async () => {
    try {
      const { data } = await AuthService.me();
      setUserData(data);
    } catch (error) {
      await logout();
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          description: error.response?.data.message,
        });
      }
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (!userData)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
          <Loader2 className="animate-spin" />
          <div>Loading ...</div>
        </div>
      </div>
    );

  return (
    <CardHeader
      className="space-y-1 flex flex-row align-middle justify-between"
      data-testid="dashboard-header"
    >
      <CardTitle className="text-2xl">Welcome, {userData.username}</CardTitle>
      <Button
        variant="outline"
        onClick={handleClick}
        data-testid="logout-button"
      >
        Logout
      </Button>
    </CardHeader>
  );
}

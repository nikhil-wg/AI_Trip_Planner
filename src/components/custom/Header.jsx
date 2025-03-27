import { useState } from "react";
import { Button } from "../ui/button";
import { Plane } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
console.log(response.data)
      localStorage.setItem(`user`, JSON.stringify(response.data));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <header className="w-full py-6 absolute top-0 left-0 right-0 z-10">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <a href="/">
          <div className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="text-xl font-medium cursor-pointer">
              AI Trip Planner
            </span>
          </div>
        </a>

        <div className="flex items-center space-x-8">
          {user ? (
            <div className="flex items-center gap-5">
              <a href="/my-trip">
                <Button variant="outline" className="rounded-full">
                  My Trip
                </Button>
              </a>
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">
                  + Create Plan
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user.picture}
                    alt="User Image"
                    className="cursor-pointer h-9 w-9 rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <div className="flex items-center space-x-2 text-black border-b-2">
                    <Plane className="h-6 w-6" />
                    <span className="text-xl font-medium text-black p-2">
                      AI Trip Planner
                    </span>
                  </div>
                  <h2 className="font-bold text-lg mt-5">
                    Sign In with Google
                  </h2>
                  <p>Sign In to App with Google Authentication Security</p>
                  <Button
                    className="w-full mt-5 gap-4 items-center"
                    onClick={() => {
                      login();
                    }}
                  >
                    <FcGoogle className="w-7 h-7" />
                    Sign In with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
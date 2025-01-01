import { Button } from "../ui/button";
import { Plane } from "lucide-react";
export default function Header() {
  return (
    <header className="w-full py-6 absolute top-0 left-0 right-0 z-10 ">
    <nav className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Plane className="h-6 w-6" />
        <span className="text-xl font-medium">AI Trip Planner</span>
      </div>
      <div className="flex items-center space-x-8">
        
         <Button>Sign In</Button>
    
      </div>
    </nav>
    
  </header>
  );
}

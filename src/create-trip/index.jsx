import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  TreePalmIcon as PalmTree,
  DollarSign,
  Plane,
  GlassWater,
  Home,
  Users,
} from "lucide-react";
import { useState } from "react";

const destinations = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "Rome, Italy",
  "Barcelona, Spain",
  "Dubai, UAE",
  "Sydney, Australia",
];

const budgetOptions = [
  {
    id: "cheap",
    title: "Cheap",
    description: "Stay conscious of costs",
    icon: <DollarSign className="w-8 h-8 text-yellow-950" />,
  },
  {
    id: "moderate",
    title: "Moderate",
    description: "Keep cost on the average side",
    icon: <DollarSign className="w-8 h-8 text-zinc-500" />,
  },
  {
    id: "luxury",
    title: "Luxury",
    description: "Don't worry about cost",
    icon: <DollarSign className="w-8 h-8 text-amber-600" />,
  },
];

const companionOptions = [
  {
    id: "solo",
    title: "Just Me",
    description: "Solo adventure",
    icon: <Plane className="w-8 h-8 text-blue-500" />,
  },
  {
    id: "couple",
    title: "A Couple",
    description: "Romantic getaway",
    icon: <GlassWater className="w-8 h-8 text-pink-500" />,
  },
  {
    id: "family",
    title: "Family",
    description: "Family vacation",
    icon: <Home className="w-8 h-8 text-purple-500" />,
  },
  {
    id: "friend",
    title: "Friend",
    description: "Friends vacation",
    icon: <Users className="w-8 h-8 text-red-500" />,
  },
];
export default function CreateTrip() {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedCompanion, setSelectedCompanion] = useState("");

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 mt-20">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Tell us your travel preferences{" "}
            <span role="img" aria-label="map and palm tree">
              🗺️ 🌴
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="destination" className="text-lg font-semibold">
              What is destination of choice?
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((destination) => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="days" className="text-lg font-semibold">
              How many days are you planning your trip?
            </label>
            <Input
              id="days"
              placeholder="Ex: 3"
              type="number"
              min="1"
              className="max-w-[200px]"
            />
          </div>

          <div className="space-y-4">
            <label className="text-lg font-semibold">
              What is Your Budget?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedBudget === option.id
                      ? "border-2 border-primary"
                      : "border border-gray-200"
                  }`}
                  onClick={() => setSelectedBudget(option.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    {option.icon}
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-lg font-semibold">
              Who do you plan on traveling with on your next adventure?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {companionOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedCompanion === option.id
                      ? "border-2 border-primary"
                      : "border border-gray-200"
                  }`}
                  onClick={() => setSelectedCompanion(option.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    {option.icon}
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full md:w-auto">
            Generate Trip
          </Button>
        </div>
      </div>
    </div>
  );
}

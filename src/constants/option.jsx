import { DollarSign, Plane, GlassWater, Home, Users } from "lucide-react";
export const budgetOptions = [
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
export const companionOptions = [
  {
    id: "solo",
    title: "Just Me",
    description: "Solo adventure",
    people: "single person",
    icon: <Plane className="w-8 h-8 text-blue-500" />,
  },
  {
    id: "couple",
    title: "A Couple",
    description: "Romantic getaway",
    people: "2 peoples",
    icon: <GlassWater className="w-8 h-8 text-pink-500" />,
  },
  {
    id: "family",
    title: "Family",
    description: "Family vacation",
    people: "3 to 5 peoples",
    icon: <Home className="w-8 h-8 text-purple-500" />,
  },
  {
    id: "friend",
    title: "Friend",
    description: "Friends vacation",
    people: "5 to 10 peoples",
    icon: <Users className="w-8 h-8 text-red-500" />,
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget}  budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates,  rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} with each day plan with best time to visit in JSON format.";

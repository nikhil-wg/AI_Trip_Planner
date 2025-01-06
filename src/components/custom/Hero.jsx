import { Button } from "../ui/button";
import { Map, Calendar, Clock, Compass } from "lucide-react";
// import CreateTrip from "@/create-trip";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Full screen hero section with nav */}
      <div className="h-screen flex flex-col relative">
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-4xl mb-6">
            Plan{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500 text-transparent bg-clip-text">
              smarter
            </span>
            , <br className="hidden sm:block" />
            not harder
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12">
            The ultimate AI travel companion for crafting your perfect journey,
            powered by advanced artificial intelligence
          </p>
          <Link to={"/create-trip"}>
            <Button className="h-14 px-8 text-lg rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Try TripAI
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div href="#features" className="animate-bounce">
            <Clock className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-16">
            Your personalised AI travel planner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Map className="h-8 w-8" />}
              title="Smart Itineraries"
              description="AI-powered trip planning that adapts to your preferences and travel style"
            />
            <FeatureCard
              icon={<Compass className="h-8 w-8" />}
              title="Local Insights"
              description="Discover hidden gems and authentic experiences recommended by AI"
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Real-time Updates"
              description="Stay informed with dynamic updates and smart scheduling"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-16">
            How TripAI Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Share Your Preferences",
                description: "Tell us about your travel style and interests",
              },
              {
                step: "2",
                title: "AI Planning",
                description: "Our AI creates a personalized itinerary",
              },
              {
                step: "3",
                title: "Fine-tune",
                description: "Adjust and customize your plan as needed",
              },
              {
                step: "4",
                title: "Travel Smart",
                description: "Enjoy your perfectly planned trip",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-medium">{item.step}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Ready to plan your next adventure?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who plan smarter, not harder with TripAI
          </p>
          <Link to={"/create-trip"}>
            <Button className="h-14 px-8 text-lg rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Start Planning Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} TripAI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://nikhilwagh.vercel.app/"
              target="_blank"
              className="text-sm text-gray-600 hover:text-red-950 dark:text-gray-400 dark:hover:text-gray-100"
            >
              My Portfolio Site
            </a>
            <a
              target="_blank"
              href="https://github.com/nikhil-wg"
              className="text-xl text-black hover:text-red-950"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 p-3 rounded-2xl bg-gray-100 dark:bg-gray-800">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

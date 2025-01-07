import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  budgetOptions,
  companionOptions,
} from "../constants/option";
import {  useState } from "react";
// import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Plane } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleFormChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GeneratePlan = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    setLoading(true);
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.Traveler
    ) {
      toast("Please fill all details");
      return;
    }
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{budget} ", formData?.budget)
      .replace("{traveler}", formData?.Traveler)
      .replace("{totalDays}", formData?.noOfDays);

    
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    SaveAiTrip(result?.response?.text());
    setLoading(false);
    
  };

  const SaveAiTrip = async (TripDate) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrip", docId), {
      userSelection: formData,
      tripDate: JSON.parse(TripDate),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };
  const getUserProfile = async (tokneInfo) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokneInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
     
      localStorage.setItem(`user`, JSON.stringify(response.data));
      setOpenDialog(false);
      window.location.reload();
      GeneratePlan();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
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
          {/* destination */}
          <div className="space-y-2">
            <label htmlFor="destination" className="text-lg font-semibold">
              What is destination of choice?
            </label>
            <Select>
              <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleFormChange("location", v);
                  },
                }}
              />
            </Select>
          </div>
          {/* days */}
          <div className="space-y-2">
            <label htmlFor="days" className="text-lg font-semibold">
              How many days are you planning your trip?
            </label>
            <Input
              id="days"
              placeholder="Ex: 3  (max: 5 days)"
              type="number"
              max="5"
              min="1"
              className="max-w-[200px]"
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "1" ||
                  (Number(value) >= 1 && Number(value) <= 5)
                ) {
                  handleFormChange("noOfDays", value);
                }
              }}
            />
          </div>
          {/* Budget */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">
              What is Your Budget? 💸
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    formData?.budget === option.id
                      ? "border-2 border-primary"
                      : "border border-gray-200"
                  }`}
                  onClick={() => {
                    handleFormChange("budget", option.id);
                  }}
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
          {/* traveler */}
          <div className="space-y-4">
            <label className="text-lg font-semibold">
              Who do you plan on traveling with on your next adventure?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {companionOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    formData?.Traveler === option.people
                      ? "border-2 border-primary"
                      : "border border-gray-200"
                  }`}
                  onClick={() => {
                    handleFormChange("Traveler", option.people);
                  }}
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

          <Button
            disabled={loading}
            size="lg"
            className="w-full md:w-auto"
            onClick={() => {GeneratePlan()
              toast("Creating Your Plan Please wait....");
            }}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="w7 h-7 animate-spin" />
              
            ) : (
              "Generate Trip"
            )}
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <div className="flex items-center space-x-2 text-black border-b-2">
                    <Plane className="h-6 w-6 " />
                    <span className="text-xl font-medium text-black p-2">
                      AI Trip Planner
                    </span>
                  </div>
                  <h2 className="font-bold text-lg mt-5">
                    Sign In with Google
                  </h2>
                  <p>Sign In to App with Google Authentication Security </p>
                  <Button
                    className="w-full mt-5 gap-4 items-center"
                    onClick={login}
                  >
                    <FcGoogle className="w-7 h-7" />
                    Sign In with Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

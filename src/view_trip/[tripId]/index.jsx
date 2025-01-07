import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import HotalRecommend from "../components/HotalRecommend";
import Itinerary from "../components/Itinerary";
import { FaGithub } from "react-icons/fa";
// import { Hotel } from "lucide-react";

export default function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);


  useEffect(() => {
    const GetTripData = async () => {
      if (tripId) {
        const docRef = doc(db, "AITrip", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("document", docSnap.data());
          setTrip(docSnap.data());
        } else {
          console.log("trip data is not found");
        }
      }
    };

    GetTripData();
  }, [tripId]);

  
  return (
    <>
    <div className="p-10 md:px-20 lg:px-44 xl:56">
      {/* information section  */}
      {trip ? <InfoSection trip={trip} /> : <p>Image and title not able to loading</p>}
      {/* hotal recommendation section  */}
     <HotalRecommend trip={trip}/>
      {/* Daily activity section  */}
      <Itinerary trip={trip}/>
      {/* footer section  */}
      
    </div>
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
    </>
  );
}

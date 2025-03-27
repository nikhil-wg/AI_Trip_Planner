import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyTrip() {
  const [userTrip, setUserTrip] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrip();
  }, []);

  // Function to get user trips
  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.log("User not found");
      navigate("/");
      return;
    }

    setUserTrip([]); // Clear previous state
    const q = query(collection(db, "AITrip"), where("userEmail", "==", user.email));
    const querySnapshot = await getDocs(q);

    // Accumulate trips first, then update state
    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Ensure a unique key
      ...doc.data(),
    }));

    setUserTrip(trips); // Update state once
  };

  return (
    <div className="md:px-20 lg:px-44 xl:56 mt-20">
      <h1 className="text-3xl font-bold mb-4">My Trip</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTrip.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/view-trip/${trip.id}`)}
          >
            <img src="/plan.jpg" alt="Trip Image" className="rounded" />
            <h2 className="text-lg font-semibold mt-2">
              {trip?.userSelection?.location?.label || "Unknown Location"}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import { Button } from "@/components/ui/button";
// import { GrMapLocation } from "react-icons/gr";
export default function Itinerary({ trip }) {
  // Get the itinerary object
  const itinerary = trip?.tripDate?.itinerary || {};

  // Convert the itinerary object into an array and sort it by day number
  const sortedItinerary = Object.entries(itinerary).sort(([dayA], [dayB]) => {
    const dayNumA = parseInt(dayA.match(/\d+/), 10);
    const dayNumB = parseInt(dayB.match(/\d+/), 10);
    return dayNumA - dayNumB;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold  mt-8">Trip Itinerary</h1>
      <div className="gap-2">
        {sortedItinerary.map(([day, details], index) => (
          <div key={index} className="p-4">
            <h2 className="text-xl font-bold mb-2">{day.toUpperCase()}</h2>
            <p className="mb-1"><b>Theme:</b> {details.theme}</p>
            <p className="text-gray-500 mb-2"><b>⏲️</b> {details.bestTimeToVisit}</p>
            <div className="flex flex-wrap gap-5">
              {details.places.map((place, i) => (
                <div key={i} className="flex-1 min-w-full sm:min-w-[48%] md:min-w-[31%] lg:min-w-[30%] p-3 hover:scale-95 transition-all cursor-pointer border rounded-lg shadow-sm">
                  <Link
                    // eslint-disable-next-line react/prop-types
                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)} ${encodeURIComponent(trip?.tripDate?.tripDetails?.location)}`}
                    target="_blank"
                    className=""
                  >
                    <img
                      src="/plan.jpg"
                      alt={place.placeName || "Place Image Not Found"}
                      className="rounded-xl w-full h-48 object-cover"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-medium">{place.placeName}</h3>
                      <p>⭐ {place.rating} Rating</p>
                      <p>🎟️: {place.ticketPricing}</p>
                      <p className="text-sm text-gray-700">ℹ️ {place.placeDetails}</p>
                      <p className="text-sm text-gray-700">⌚ {place.timeTravel}</p>
                    </div>
                    {/* <Button className="mt-3 mx-3 " >Location<GrMapLocation /></Button> */}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PropTypes validation
Itinerary.propTypes = {
  trip: PropTypes.shape({
    tripDate: PropTypes.shape({
      itinerary: PropTypes.objectOf(
        PropTypes.shape({
          theme: PropTypes.string,
          bestTimeToVisit: PropTypes.string,
          places: PropTypes.arrayOf(
            PropTypes.shape({
              placeName: PropTypes.string,
              placeImageUrl: PropTypes.string,
              geoCoordinates: PropTypes.shape({
                latitude: PropTypes.number,
                longitude: PropTypes.number,
              }),
              rating: PropTypes.number,
              ticketPricing: PropTypes.string,
              placeDetails: PropTypes.string,
              timeTravel: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }),
};

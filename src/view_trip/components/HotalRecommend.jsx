import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
export default function HotalRecommend({ trip }) {
  console.log(trip);
  return (
    <div>
      <h1 className=" text-2xl font-bold text mb-5">Hotel Recommendation</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripDate?.hotelOptions?.map((item, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.hotelName + " " + item.hotelAddress)}`}
            target='_blank'
          >
            <div className="hover:scale-110 transition-all cursor-pointer">
              <img
                src="/hotel.jfif"
                alt={item.hotelName || "Hotel Image Not Found"}
                className="rounded-xl  object-cover   "
              />
              <div className="flex flex-col">
                <h2 className="font-medium">{item.hotelName}</h2>
                <h2 className="text-gray-500">📍{item.hotelAddress}</h2>
                <p>💰{item.price}</p>
                {item.rating && (
                  <div className="flex items-center gap-1 mb-2 m-1">
                    {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// PropTypes validation
HotalRecommend.propTypes = {
  trip: PropTypes.shape({
    tripDate: PropTypes.shape({
      hotelOptions: PropTypes.arrayOf(
        PropTypes.shape({
          hotelName: PropTypes.string,
          hotelAddress: PropTypes.string,
          price: PropTypes.string,
          rating: PropTypes.number,
        })
      ),
    }),
  }),
};

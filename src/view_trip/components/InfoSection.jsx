/* eslint-disable react/prop-types */
import { Calendar, DollarSign, Users } from "lucide-react";
import { LuSend } from "react-icons/lu";
// eslint-disable-next-line react/prop-types
export default function InfoSection({ trip }) {
  
  return (
    <>
      <div className="mt-20">
        <img
          src="/header.jfif"
          className=" h-[350px] w-full object-cover rounded-xl "
        />
      </div>
      {/* Trip Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 ">
            {trip?.userSelection?.location?.label}
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-400 p-1 bg-gray-200 rounded-full px-3 text-sm md:text-base">
                <Calendar className="w-5 h-5" />
                {trip?.userSelection?.noOfDays}
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-400 p-1 bg-gray-200 rounded-full px-3 text-sm md:text-base">
                <DollarSign className="w-5 h-5" />
                {trip?.userSelection?.budget}
              </div>
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-400 p-1 bg-gray-200 rounded-full px-3 text-sm md:text-base">
                <Users className="w-5 h-5" />
                No. Of Traveler: {trip?.userSelection?.Traveler}
              </div>
            </div>
            <button className="bg-black text-white p-2 rounded-xl text-xl"><LuSend /></button>
          </div>
        </div>
      </div>
    </>
  );
}

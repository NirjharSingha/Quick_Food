"use client";

import React, { useEffect, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import DeliveryHeader from "@/app/components/DeliveryHeader";
import { useGlobals } from "@/app/contexts/Globals";

const Page = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const { windowWidth } = useGlobals();

  useEffect(() => {
    const deliveryStatus = JSON.parse(localStorage.getItem("deliveryStatus"));

    if (deliveryStatus) {
      const { latitude, longitude } = deliveryStatus;

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setDestination({ lat: latitude, lng: longitude });
      }
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const directionsCallback = (response, status) => {
    if (status === "OK") {
      setDirections(response);
    } else {
      console.error("Directions request failed:", status);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <DeliveryHeader />
      <div className="p-4 pl-1 pr-1 sm:pl-4 sm:pr-4 w-full">
        <div className="flex justify-center items-center mb-5 mt-4">
          <FaMapMarkerAlt
            className={`mr-2 ${
              windowWidth > 650 ? "text-6xl" : "text-5xl"
            } text-gray-700`}
          />
          <p
            className={`font-serif ${
              windowWidth > 650 ? "text-4xl mt-2" : "text-3xl mt-3"
            } font-bold text-gray-700`}
          >
            Map
          </p>
        </div>
        <div className="w-[100%] mx-auto shadow-md shadow-gray-400 rounded-lg bg-slate-100">
          <div className="w-full overflow-y-auto">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}>
              <GoogleMap
                center={currentLocation}
                zoom={13}
                mapContainerStyle={{ height: "500px", width: "100%" }}
              >
                {currentLocation && destination && (
                  <DirectionsService
                    options={{
                      destination,
                      origin: currentLocation,
                      travelMode: "DRIVING",
                    }}
                    callback={directionsCallback}
                  />
                )}
                {directions && (
                  <DirectionsRenderer options={{ directions: directions }} />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

// responsive

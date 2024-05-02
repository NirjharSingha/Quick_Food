"use client";

import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";

const page = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationType, setLocationType] = useState(""); // Default to 'currentLocation'
  const autocompleteRef = useRef(null);
  const router = useRouter();

  // Handler for when the user selects a place from the autocomplete suggestions
  const onPlaceSelected = () => {
    const place = autocompleteRef.current.getPlace(); // Access the place object from the Autocomplete component
    console.log("Place selected:", place);

    if (!place.geometry) {
      console.error("Place does not have geometry");
      return;
    }

    const newLocation = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      address: place.formatted_address,
    };

    if (locationType === "searchLocation") {
      setSelectedLocation(newLocation);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLocationType("currentLocation");
    }, 1000);
  }, []);

  // Handler for radio button change
  const handleLocationTypeChange = () => {
    if (locationType === "currentLocation") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Create a LatLng object from the coordinates
            const latLng = new google.maps.LatLng(latitude, longitude);

            // Initialize a Geocoder object
            const geocoder = new google.maps.Geocoder();

            // Perform reverse geocoding to get the formatted address
            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === "OK") {
                if (results[0]) {
                  // Extract the formatted address from the first result
                  const formattedAddress = results[0].formatted_address;
                  // Set the selected location state with latitude, longitude, and formatted address
                  setSelectedLocation({
                    latitude,
                    longitude,
                    address: formattedAddress,
                  });
                } else {
                  console.error("No results found");
                }
              } else {
                console.error("Geocoder failed due to: " + status);
              }
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
      }
    }
  };

  useEffect(() => {
    handleLocationTypeChange();
  }, [locationType]);

  const handleClick = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const updatedCart = {
      ...cart,
      address: selectedLocation.address,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    router.push("/orderFood/cart/payment");
  };

  return (
    <div div className="w-full overflow-y-auto">
      <div className="p-4 w-full">
        <div className="flex justify-center items-center mb-5">
          <FaMapMarkerAlt className="mr-2 text-4xl text-gray-700" />
          <p className="font-serif text-3xl font-bold text-gray-700 mt-2">
            Delivery Address
          </p>
        </div>
        <div className="w-[90%] mx-auto shadow-md shadow-gray-400 rounded-lg bg-slate-100">
          <div>
            {/* Radio buttons for selecting the method */}
            <div className="flex items-center p-2 justify-center gap-x-8 font-sans">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="currentLocation"
                  name="locationType"
                  value="currentLocation"
                  className="cursor-pointer"
                  checked={locationType === "currentLocation"}
                  onChange={(e) => setLocationType(e.target.value)}
                />
                <label htmlFor="currentLocation">Use Current Location</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="searchLocation"
                  name="locationType"
                  value="searchLocation"
                  className="cursor-pointer"
                  checked={locationType === "searchLocation"}
                  onChange={(e) => setLocationType(e.target.value)}
                />
                <label htmlFor="searchLocation">Search Location</label>
              </div>
            </div>

            {locationType === "searchLocation" && (
              <div className="w-full flex justify-center items-center">
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                  } // Save Autocomplete instance to ref
                  onPlaceChanged={onPlaceSelected}
                >
                  <input
                    type="text"
                    placeholder="Enter Your Location"
                    className="w-full mx-auto rounded-full border py-3 px-6 mt-3 mb-6 max-w-[300px] text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none"
                  />
                </Autocomplete>
              </div>
            )}
            {/* Google Maps with Autocomplete */}
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
              libraries={["places"]} // Specify the "places" library
            >
              <GoogleMap
                center={
                  selectedLocation
                    ? {
                        lat: selectedLocation.latitude,
                        lng: selectedLocation.longitude,
                      }
                    : { lat: 0, lng: 0 }
                }
                zoom={selectedLocation ? 15 : 1}
                mapContainerStyle={{
                  height: "500px",
                  width: "100%",
                  minHeight: "calc(100% - 8rem)",
                }}
              >
                {selectedLocation && (
                  <Marker
                    position={{
                      lat: selectedLocation.latitude,
                      lng: selectedLocation.longitude,
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>

            {/* Display selected location */}
            {selectedLocation && (
              <div className="text-right mt-4 mb-3 font-sans p-3 text-sm">
                <p>Latitude: {selectedLocation.latitude}</p>
                <p>Longitude: {selectedLocation.longitude}</p>
                <p>Address: {selectedLocation.address}</p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-[90%] mx-auto h-8 bg-gray-300 font-sans font-bold mt-5 rounded-2xl hover:bg-gray-400 text-gray-700 flex justify-center items-center cursor-pointer`}
          onClick={handleClick}
        >
          Go for payment
        </div>
      </div>
    </div>
  );
};

export default page;

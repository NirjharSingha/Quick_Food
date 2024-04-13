"use client";
import { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 23.7270478, lng: 90.4031032 };

export default function GoogleApi({ setPlace }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [sourceMarker, setSourceMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const originRef = useRef();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSourceMarker({ lat: latitude, lng: longitude });
          center.lat = latitude;
          center.lng = longitude;
          console.log("User location:", latitude, longitude);
          // Set the source location here
          calculateRoute({ lat: latitude, lng: longitude }, dummyDestination);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const dummyDestination = { lat: 23.728097, lng: 90.392567 };

  const calculateRoute = (origin, destination) => {
    if (window.google && window.google.maps) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    } else {
      console.error("Google Maps API not loaded");
    }
  };

  const handleMarkerDragEnd = (markerType, event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (markerType === "source") {
      setSourceMarker(newMarkerPosition);
    } else if (markerType === "destination") {
      setDestinationMarker(newMarkerPosition);
    }

    if (sourceMarker && destinationMarker) {
      calculateRoute(sourceMarker, destinationMarker);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-[80%] h-[80%] m-auto rounded-md overflow-hidden">
        {isLoaded && (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {sourceMarker && (
              <Marker
                position={sourceMarker}
                draggable={true}
                onDragEnd={(event) => handleMarkerDragEnd("source", event)}
              />
            )}
            {destinationMarker && (
              <Marker
                position={destinationMarker}
                draggable={true}
                onDragEnd={(event) => handleMarkerDragEnd("destination", event)}
              />
            )}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{ suppressMarkers: true }}
              />
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

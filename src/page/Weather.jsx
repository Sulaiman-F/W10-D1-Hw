import { useState } from "react";
import { useNavigate } from "react-router";
import { weatherAPI } from "../services/api";
import Alert from "@mui/material/Alert";
import { WiThermometer, WiHumidity, WiCloud } from "react-icons/wi";
import { MdLocationOn, MdRefresh } from "react-icons/md";

function Weather() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lon: "",
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Alert severity="warning" className="mb-4">
          Please sign in to access weather data
        </Alert>
        <button
          onClick={() => navigate("/login")}
          className="bg-cyan-500 text-white p-2 px-6 rounded-lg hover:bg-cyan-600 transition-colors duration-300 cursor-pointer"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coordinates.lat || !coordinates.lon) {
      setError("Please enter both latitude and longitude");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (isNaN(coordinates.lat) || isNaN(coordinates.lon)) {
      setError("Please enter valid numbers for coordinates");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await weatherAPI.getCurrentWeather(
        parseFloat(coordinates.lat),
        parseFloat(coordinates.lon)
      );

      if (response.success) {
        setWeather(response.data);
      } else {
        setError(response.error?.message || "Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Weather error:", err);
      setError(
        err.response?.data?.error?.message || "Failed to fetch weather data"
      );
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude.toFixed(6),
            lon: position.coords.longitude.toFixed(6),
          });
          setLoading(false);
        },
        () => {
          setError("Unable to get current location");
          setLoading(false);
          setTimeout(() => setError(""), 3000);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
      setTimeout(() => setError(""), 3000);
    }
  };

  const clearData = () => {
    setWeather(null);
    setCoordinates({ lat: "", lon: "" });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-neutral-100 p-4 ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-neutral-800 mb-2">
            WeatherHub
          </h1>{" "}
          <p className="text-neutral-600">Get real-time weather information</p>
        </div>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            className="mb-6 max-w-lg mx-auto"
          >
            {error}
          </Alert>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude (e.g., 23.45)"
                  value={coordinates.lat}
                  onChange={(e) =>
                    setCoordinates({ ...coordinates, lat: e.target.value })
                  }
                  className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                  type="number"
                  step="any"
                  placeholder="Longitude (e.g., 46.68)"
                  value={coordinates.lon}
                  onChange={(e) =>
                    setCoordinates({ ...coordinates, lon: e.target.value })
                  }
                  className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {loading ? "Loading..." : "Get Weather"}
                <WiCloud className="text-xl" />
              </button>
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loading}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                Use My Location
                <MdLocationOn className="text-xl" />
              </button>
              <button
                type="button"
                onClick={clearData}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2 cursor-pointer"
              >
                Clear
                <MdRefresh className="text-xl" />
              </button>{" "}
            </div>
          </form>
        </div>

        {weather && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Weather Information
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MdLocationOn className="text-xl" />
                <span>
                  {weather.coordinates.lat}, {weather.coordinates.lon}
                </span>{" "}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-6 text-white text-center">
                <WiThermometer className="text-6xl mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Temperature</h3>{" "}
                <p className="text-3xl font-bold">{weather.tempC}°C</p>
              </div>

              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white text-center">
                <WiHumidity className="text-6xl mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Humidity</h3>{" "}
                <p className="text-3xl font-bold">{weather.humidity}%</p>
              </div>

              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white text-center">
                <WiCloud className="text-6xl mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Condition</h3>
                <p className="text-lg font-medium capitalize">
                  {weather.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;

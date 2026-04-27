import React, { useState } from "react";
import { FaArrowLeft, FaSearch, FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'
import { serverUrl } from '../App.jsx'
import start from '../assets/google-assistant.mp3'
import CourseCard from "../components/CourseCard.jsx";

const SearchWithAi = () => {
  const startSound = new Audio(start)
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false)

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const speak = (message) => {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }
  const handleVoiceSearch = () => {
    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    startSound.play();
    recognition.start();

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript;
      console.log(transcript);
      setInput(transcript)
      await handleSearch(transcript);
    };

    recognition.onerror = () => {
      toast.error("Voice recognition failed");
    };
  };

  const handleSearch = async (query) => {
    if (!query) return;
    setListening(true)
    try {
      const result = await axios.post(serverUrl + `/api/course/search`, { input: query }, { withCredentials: true })
      console.log(result)
      setRecommendations(result.data)
      setListening(false)
      if (result.data.length > 0) {
        speak("Here are some courses I found for you")
      } else {
        speak("No Courses found")
      }
    } catch (error) {
      setListening(false)
      console.log(error)
    }

  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-20 py-10">

      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 cursor-pointer mb-10"
      >
        <FaArrowLeft />
        Back
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Smart Search
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3">

          <input
            type="text"
            placeholder="What you want to learn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white"
          />

          {/* Voice */}
          <button
            className="text-gray-400 hover:text-orange-500"
            onClick={handleVoiceSearch}
          >
            <FaMicrophone />
          </button>

          {/* Search */}
          <button
            onClick={() => handleSearch(input)}
            className="bg-orange-500 text-black px-4 py-2 rounded-full hover:bg-orange-400"
          >
            <FaSearch />
          </button>

        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid gap-6 md:grid-cols-3">

        {recommendations.length === 0 && !listening && (
          <p className="text-center text-gray-400">
            No courses found. Try searching something else.
          </p>
        )}

        {recommendations.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}

      </div>

    </div>
  );
};

export default SearchWithAi;
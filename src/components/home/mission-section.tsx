"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function MissionSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // You'll need to replace this with your actual video element reference
    const videoElement = document.getElementById(
      "mission-video"
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
  };

  return (
    <section className="w-full bg-background-two text-black py-16">
      <div className="container mx-auto px-4 text-black">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Our mission is to help all the people in need.
          </h2>
          <p className="text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden max-w-4xl mx-auto">
          <video
            id="mission-video"
            className="w-full h-full object-cover rounded-3xl"
            poster="/video.png" // Replace with your thumbnail
          >
            <source src="/mission.mp4" type="video/mp4" />
          </video>

          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-white rounded-full p-5 cursor-pointer hover:scale-110 transition-transform"
            >
              <Play className="w-8 h-8 text-black" />
            </button>
          )}
        </div>

        <div className="absolute -z-10">
          <div className="absolute left-0 top-0">
            {/* Green leaves decoration */}
            <img src="/path-to-green-leaves.svg" alt="" className="w-32" />
          </div>
          <div className="absolute right-0 top-0">
            {/* Yellow leaves decoration */}
            <img src="/path-to-yellow-leaves.svg" alt="" className="w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}

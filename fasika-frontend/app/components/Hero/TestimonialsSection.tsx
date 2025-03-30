"use client";
import { useHeroStore } from "@/app/stores/heroStore";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";
import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TestimonialsSection() {
  const { heroes, loading, error, fetchHeroes } = useHeroStore();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Seek video to 0:12 seconds when metadata is loaded
  const seekToTwelveSeconds = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 12;
    }
  };

  if (loading) return <PageSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const hero = heroes.length > 0 ? heroes[0] : null;
  if (!hero) return <PageSkeleton />;

  const testimonialVideos = [
    ...(hero.Testimonialsvideo1 || []),
    ...(hero.Testimonialsvideo2 || []),
    ...(hero.Testimonialsvideo3 || []),
  ];

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        if (playingIndex !== null && playingIndex !== index) {
          videoRefs.current[playingIndex]?.pause();
        }
        video.muted = isMuted;
        video.volume = volume;
        video.play();
        setPlayingIndex(index);
      } else {
        video.pause();
        setPlayingIndex(null);
      }
    }
  };

  const handleVolumeChange = (index: number, newVolume: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    }
  };

  const handleSeek = (index: number, time: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = time;
    }
  };

  const toggleFullscreen = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (!isFullscreen) {
        video.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  const handlePrevious = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    emblaApi?.scrollPrev();
  };

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    emblaApi?.scrollNext();
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-28">
          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-3 text-center md:text-left -mt-8 md:-mt-12 md:-ml-12">
            <h2 className="text-lg font-semibold text-gray-900 relative inline-block">
              {hero.practice}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">
              {hero.Testimonials}
            </h1>
            <p className="text-base font-bold text-gray-600 mt-2 max-w-2xl">
              {hero.TestimonialsDesc}
            </p>
          </div>

          {/* Video Carousel */}
          <div className="md:w-1/2 w-full relative">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex">
                {testimonialVideos.length > 0 ? (
                  testimonialVideos.map((video, index) => (
                    <div className="embla__slide flex-[0_0_100%]" key={index}>
                      <div className="rounded-xl shadow-lg overflow-hidden relative group transition-all duration-300 hover:shadow-xl">
                        <div className="relative aspect-video">
                          <video
                            ref={(el) => {
                              videoRefs.current[index] = el;
                              el?.addEventListener('loadedmetadata', () => seekToTwelveSeconds(index));
                            }}
                            src={`${BASE_URL}${video.url}`}
                            playsInline
                            muted={isMuted}
                            className="w-full h-full object-cover"
                            onTimeUpdate={() => handleTimeUpdate(index)}
                            onClick={() => handlePlayPause(index)}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex items-center justify-between">
                            <button
                              onClick={() => handlePlayPause(index)}
                              className="p-1.5 bg-black/50 backdrop-blur-sm rounded-full shadow-sm hover:bg-black/60 transition-colors"
                              aria-label={playingIndex === index ? "Pause" : "Play"}
                            >
                              {playingIndex === index ? (
                                <Pause className="w-4 h-4 text-white" />
                              ) : (
                                <Play className="w-4 h-4 text-white" />
                              )}
                            </button>

                            <div className="flex-1 mx-2">
                              <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                onChange={(e) => handleSeek(index, parseFloat(e.target.value))}
                                className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                              />
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleVolumeChange(index, isMuted ? volume : 0)}
                                className="p-1.5 bg-black/50 backdrop-blur-sm rounded-full shadow-sm hover:bg-black/60 transition-colors"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                              >
                                {isMuted ? (
                                  <VolumeX className="w-4 h-4 text-white" />
                                ) : (
                                  <Volume2 className="w-4 h-4 text-white" />
                                )}
                              </button>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => handleVolumeChange(index, parseFloat(e.target.value))}
                                className="w-16 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                              />
                            </div>

                            <button
                              onClick={() => toggleFullscreen(index)}
                              className="p-1.5 bg-black/50 backdrop-blur-sm rounded-full shadow-sm hover:bg-black/60 transition-colors"
                              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            >
                              {isFullscreen ? (
                                <Minimize className="w-4 h-4 text-white" />
                              ) : (
                                <Maximize className="w-4 h-4 text-white" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No videos available.
                  </div>
                )}
              </div>
            </div>

            <button
              className="hidden md:flex items-center justify-center size-8 absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
              onClick={handlePrevious}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="hidden md:flex items-center justify-center size-8 absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
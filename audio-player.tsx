"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2 } from "lucide-react"

interface AudioPlayerProps {
  src?: string
  title: string
  artist: string
  spotifyLink: string
}

export function AudioPlayer({ src, title, artist, spotifyLink }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
      setHasError(false)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    const handleError = () => {
      setHasError(true)
      setIsPlaying(false)
    }

    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("error", handleError)
    }
  }, [src])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio || !src || hasError) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {
        setHasError(true)
        setIsPlaying(false)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || !src || hasError) return

    const newTime = (Number.parseFloat(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || !src || hasError) return

    const newVolume = Number.parseFloat(e.target.value) / 100
    audio.volume = newVolume
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      {src && !hasError ? (
        <>
          <audio ref={audioRef} src={src} preload="metadata" />

          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlayPause}
              className="bg-amber-600 hover:bg-amber-700 rounded-full w-12 h-12 flex-shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-sm text-slate-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Volume2 className="w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="w-16 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>

          <div className="mt-2 text-center">
            <p className="text-white font-medium text-base">{title}</p>
            <p className="text-slate-400 text-sm">{artist}</p>
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-slate-400 text-base">Audio preview coming soon</p>
        </div>
      )}
    </div>
  )
}

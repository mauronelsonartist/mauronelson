"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, AirplayIcon as Spotify, ChevronDown, Music, Send, User, LogIn, LogOut } from "lucide-react"
import { Caveat } from "next/font/google"
import { AuthModal } from "@/components/auth/auth-modal"
import { AudioPlayer } from "@/components/audio-player"
import { useAuth } from "@/components/auth/auth-context"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const caveat = Caveat({ subsets: ["latin"] })

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)
  const [easterEggClicks, setEasterEggClicks] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const { user, logout } = useAuth()

  // Scroll animations
  const musicSection = useScrollAnimation({ threshold: 0.2 })
  const aboutSection = useScrollAnimation({ threshold: 0.3 })
  const newsletterSection = useScrollAnimation({ threshold: 0.3 })
  const contactSection = useScrollAnimation({ threshold: 0.2 })

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["hero", "music", "about", "newsletter", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSubmitted(true)
    setNewsletterEmail("")
  }

  const handleEasterEgg = () => {
    setEasterEggClicks((prev) => prev + 1)
    if (easterEggClicks >= 4) {
      window.open("/easter-egg", "_blank")
    }
  }

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const albums = [
    {
      title: "Last Night in the Field",
      year: "2025",
      type: "Single",
      cover: "/last-night-in-the-field-cover.png",
      tracks: 1,
      spotifyLink: "https://open.spotify.com/track/1HOwQgkDw6BGRFhodlqc3j",
      audioSrc: "",
      isReleased: true,
    },
  ]

  const galleryItems = [
    { type: "image", src: "/performance-1.png", alt: "Live at The Fillmore" },
    { type: "video", src: "/studio-session.mp4", thumbnail: "/studio-thumb.png", alt: "Studio Session" },
    { type: "image", src: "/performance-2.png", alt: "Acoustic Set" },
    { type: "image", src: "/backstage.png", alt: "Backstage Moments" },
    { type: "video", src: "/live-performance.mp4", thumbnail: "/live-thumb.png", alt: "Live Performance" },
    { type: "image", src: "/songwriting.png", alt: "Songwriting Process" },
  ]

  return (
    <div className={`min-h-screen bg-slate-900 text-white ${caveat.className}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-wide cursor-pointer" onClick={handleEasterEgg}>
              Mauro Nelson
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {["hero", "music", "about", "newsletter", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 hover:text-amber-400 text-xl ${
                    activeSection === section ? "text-amber-400" : "text-slate-300"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                </button>
              ))}
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {user.avatar && (
                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                      )}
                      <span className="text-slate-300 text-xl">{user.name.split(" ")[0]}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ink-effect-btn group border-slate-600 hover:bg-slate-700 bg-transparent text-xl"
                      onClick={logout}
                    >
                      <LogOut className="w-4 h-4 mr-2 relative z-10 group-hover:text-white transition-colors duration-500" />
                      <span className="relative z-10">Sign Out</span>
                      <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                        <div className="ink-blob-1"></div>
                        <div className="ink-blob-2"></div>
                        <div className="ink-blob-3"></div>
                      </div>
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ink-effect-btn group border-slate-600 hover:bg-slate-700 bg-transparent text-xl"
                      onClick={() => openAuthModal("login")}
                    >
                      <LogIn className="w-4 h-4 mr-2 relative z-10 group-hover:text-white transition-colors duration-500" />
                      <span className="relative z-10">Sign In</span>
                      <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                        <div className="ink-blob-1"></div>
                        <div className="ink-blob-2"></div>
                        <div className="ink-blob-3"></div>
                      </div>
                    </Button>
                    <Button
                      size="sm"
                      className="ink-effect-btn group bg-amber-600 hover:bg-amber-700 text-xl"
                      onClick={() => openAuthModal("signup")}
                    >
                      <User className="w-4 h-4 mr-2 relative z-10 group-hover:text-white transition-colors duration-500" />
                      <span className="relative z-10">Sign Up</span>
                      <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                        <div className="ink-blob-1"></div>
                        <div className="ink-blob-2"></div>
                        <div className="ink-blob-3"></div>
                      </div>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black"></div>

        <div className="relative z-10 text-center px-6">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-7xl md:text-9xl font-light mb-8 tracking-wider">
              <span className="font-thin">mauro</span>
              <br />
              <span className="font-light text-amber-400">nelson</span>
            </h1>
            <p className="text-3xl md:text-4xl text-slate-300 mb-10 font-light tracking-wide">
              Singer • Songwriter • Storyteller
            </p>
            <p className="text-3xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
              Crafting melodies that speak to the soul, weaving stories through song
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="ink-effect-btn group bg-amber-600 hover:bg-white relative overflow-hidden transition-all duration-500 hover:scale-105 text-xl px-10 py-6 h-auto"
                onClick={() => window.open("https://open.spotify.com/artist/0XjlW7rVoesijuDqWWCRu3", "_blank")}
              >
                <Spotify className="w-6 h-6 mr-3 relative z-10 group-hover:text-white transition-colors duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Listen Now</span>
                <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                  <div className="ink-blob-1"></div>
                  <div className="ink-blob-2"></div>
                  <div className="ink-blob-3"></div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="ink-effect-btn group border-slate-600 hover:bg-slate-700 bg-transparent text-xl px-10 py-6 h-auto"
                onClick={() => scrollToSection("music")}
              >
                <Music className="w-6 h-6 mr-3 relative z-10 group-hover:text-white transition-colors duration-500" />
                <span className="relative z-10">Explore Music</span>
                <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                  <div className="ink-blob-1"></div>
                  <div className="ink-blob-2"></div>
                  <div className="ink-blob-3"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("music")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-10 h-10 text-amber-400" />
        </button>
      </section>

      {/* Music Section */}
      <section id="music" className="py-24 px-6" ref={musicSection.ref}>
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              musicSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-6xl md:text-7xl font-light mb-8 tracking-wide">Music</h2>
            <p className="text-4xl text-slate-400 max-w-2xl mx-auto">
              A collection of stories told through melody and verse
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
              {albums.map((album, index) => (
                <div
                  key={album.title + index}
                  className={`flex flex-col items-center max-w-sm transition-all duration-1000 ${
                    musicSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-lg mb-6 group">
                    <Image
                      src={album.cover || "/placeholder.svg"}
                      alt={album.title}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{album.title}</h3>
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <Badge
                        variant="secondary"
                        className={`${
                          album.isReleased ? "bg-amber-600/20 text-amber-400" : "bg-slate-600/20 text-slate-400"
                        } text-xl px-4 py-2`}
                      >
                        Single
                      </Badge>
                      <span className="text-slate-400 text-2xl">{album.year}</span>
                    </div>
                  </div>

                  {album.isReleased && (
                    <div className="w-full mb-6">
                      <AudioPlayer
                        src={album.audioSrc}
                        title={album.title}
                        artist="Mauro Nelson"
                        spotifyLink={album.spotifyLink}
                      />
                    </div>
                  )}

                  <div className="w-full">
                    {album.isReleased ? (
                      <Button
                        size="lg"
                        className="ink-effect-btn group bg-amber-600 hover:bg-white relative overflow-hidden transition-all duration-500 hover:scale-105 w-full text-xl py-4 rounded-full"
                        onClick={() => window.open(album.spotifyLink, "_blank")}
                      >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                          LISTEN NOW
                        </span>
                        <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                          <div className="ink-blob-1"></div>
                          <div className="ink-blob-2"></div>
                          <div className="ink-blob-3"></div>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        disabled
                        className="ink-effect-btn group w-full text-xl py-4 bg-slate-700 text-slate-400 cursor-not-allowed rounded-full"
                      >
                        <span className="relative z-10">COMING SOON</span>
                        <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                          <div className="ink-blob-1"></div>
                          <div className="ink-blob-2"></div>
                          <div className="ink-blob-3"></div>
                        </div>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-slate-800/30" ref={aboutSection.ref}>
        <div className="max-w-4xl mx-auto">
          <div className="grid-cols-1 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                aboutSection.isVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-6xl md:text-7xl font-light mb-10 tracking-wide">About</h2>
              <div className="space-y-8 text-3xl text-slate-300 leading-relaxed">
                <p>
                  I'm a starting artist from Belgium pouring my heart into creating amazing hits. I'm chasing big dreams
                  and doing my best every day to share my music with the world. Thanks for being part of the journey!
                </p>
                <div className="pt-6">
                  <h3 className="text-3xl font-semibold mb-4 text-amber-400">Musical Influences</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Folk", "Indie Rock", "Alternative", "Singer-Songwriter", "Acoustic"].map((genre) => (
                      <Badge
                        key={genre}
                        variant="outline"
                        className="border-slate-600 text-slate-300 text-xl px-4 py-2"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 px-6 bg-slate-800/30" ref={newsletterSection.ref}>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              newsletterSection.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-6xl md:text-7xl font-light mb-8 tracking-wide">Stay Connected</h2>
            <p className="text-4xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Get the latest updates, exclusive content, and early access to new releases
            </p>

            {!newsletterSubmitted ? (
              <form onSubmit={handleNewsletterSubmit} className="max-w-lg mx-auto">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 text-2xl h-16"
                  />
                  <Button
                    type="submit"
                    className="ink-effect-btn group bg-amber-600 hover:bg-amber-700 px-12 text-2xl h-16"
                  >
                    <Send className="w-5 h-5 mr-2 relative z-10 group-hover:text-white transition-colors duration-500" />
                    <span className="relative z-10">Join</span>
                    <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                      <div className="ink-blob-1"></div>
                      <div className="ink-blob-2"></div>
                      <div className="ink-blob-3"></div>
                    </div>
                  </Button>
                </div>
                <p className="text-2xl text-slate-500 mt-6">
                  Want to hear my new music first? Sign up and never miss a release!
                </p>
              </form>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="bg-green-900/20 border border-green-700 rounded-lg p-8">
                  <h3 className="text-3xl font-semibold text-green-400 mb-3">Thank you!</h3>
                  <p className="text-slate-300 mb-6 text-2xl">
                    Welcome to the community. Check your email for your free download link!
                  </p>
                  <Button
                    variant="outline"
                    className="ink-effect-btn group border-green-600 text-green-400 hover:bg-green-900/30 bg-transparent text-xl"
                    onClick={() => setNewsletterSubmitted(false)}
                  >
                    <span className="relative z-10">Subscribe Another Email</span>
                    <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                      <div className="ink-blob-1"></div>
                      <div className="ink-blob-2"></div>
                      <div className="ink-blob-3"></div>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6" ref={contactSection.ref}>
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              contactSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-6xl md:text-7xl font-light mb-10 tracking-wide">Get In Touch</h2>
            <p className="text-4xl text-slate-400 mb-16 max-w-2xl mx-auto">
              Ready to collaborate, book a show, or just want to say hello? I'd love to hear from you.
            </p>

            <div className="flex justify-center mb-16">
              <Card
                className={`bg-slate-800/50 border-slate-700 transition-all duration-1000 delay-200 ${
                  contactSection.isVisible ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <CardContent className="p-10">
                  <h3 className="text-4xl font-semibold mb-6 text-white">Say Hello</h3>
                  <p className="text-slate-400 mb-8 text-2xl">
                    For show bookings, collaborations, and business inquiries
                  </p>
                  <Button
                    className="ink-effect-btn group bg-white hover:bg-gray-100 text-black text-2xl px-10 py-6 h-auto"
                    onClick={() => window.open("mailto:hello@mauronelson.com", "_blank")}
                  >
                    <Mail className="w-5 h-5 mr-3 relative z-10 group-hover:text-white transition-colors duration-500" />
                    <span className="relative z-10">hello@mauronelson.com</span>
                    <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                      <div className="ink-blob-1"></div>
                      <div className="ink-blob-2"></div>
                      <div className="ink-blob-3"></div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div
              className={`flex justify-center space-x-8 mb-12 transition-all duration-1000 delay-600 ${
                contactSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                variant="ghost"
                size="lg"
                className="ink-effect-btn group hover:text-amber-400 p-4"
                onClick={() => window.open("https://open.spotify.com/artist/0XjlW7rVoesijuDqWWCRu3", "_blank")}
              >
                <Spotify className="w-8 h-8 relative z-10 group-hover:text-white transition-colors duration-500" />
                <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                  <div className="ink-blob-1"></div>
                  <div className="ink-blob-2"></div>
                  <div className="ink-blob-3"></div>
                </div>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="ink-effect-btn group hover:text-amber-400 p-4"
                onClick={() => window.open("https://linktr.ee/mauronelson", "_blank")}
              >
                <svg
                  className="w-8 h-8 relative z-10 group-hover:text-white transition-colors duration-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897.525 0 .973-.38 1.052-.897 0-.162 0-.323-.08-.486L8.005 9.5h1.838c.164 0 .323-.081.405-.243.08-.162.08-.405-.081-.567L6.647 3.76c-.162-.243-.486-.243-.648 0L2.48 8.69c-.161.162-.161.405-.08.567.08.162.24.243.404.243h1.838l1.271 5.566ZM16.047 8.934c.08-.163.08-.324.08-.486-.08-.517-.528-.897-1.052-.897-.525 0-.973.38-1.052.897 0 .162 0 .323.08.486L15.995 14.5h-1.838c-.164 0-.323.081-.405.243-.08.162-.08.405.081.567l3.52 4.93c.162.243.486.243.648 0l3.519-4.93c.161-.162.161-.405.08-.567-.08-.162-.24-.243-.404.243h-1.838l-1.271-5.566Z" />
                </svg>
                <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                  <div className="ink-blob-1"></div>
                  <div className="ink-blob-2"></div>
                  <div className="ink-blob-3"></div>
                </div>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="ink-effect-btn group hover:text-amber-400 p-4"
                onClick={() => window.open("https://www.tiktok.com/@mauronelsonbe", "_blank")}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z" />
                </svg>
                <div className="ink-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-800">
                  <div className="ink-blob-1"></div>
                  <div className="ink-blob-2"></div>
                  <div className="ink-blob-3"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p className="text-2xl">&copy; {new Date().getFullYear()} Mauro Nelson. All rights reserved.</p>
          <p className="text-xl mt-3">Made with ❤️ for music lovers everywhere</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </div>
  )
}

import React, { useState, useRef, useEffect } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faForwardFast } from "@fortawesome/free-solid-svg-icons";
import { faShuffle, faRightLong } from "@fortawesome/free-solid-svg-icons";

const AudioPlayerWithMoods = () => {
  const tracks = [
    {
      id: 1,
      title: "Bodyart",
      file: "/artist-radio-app/audio/Bodyart.mp3",
      mood: ["Calm", "Melancholic"],
    },
    {
      id: 2,
      title: "I Hate TV",
      file: "/artist-radio-app/audio/I_Hate_TV.mp3",
      mood: ["Disturbing"],
    },
    {
      id: 3,
      title: "Kiddy",
      file: "/artist-radio-app/audio/Kiddy.mp3",
      mood: ["Energetic", "Silly"],
    },
    {
      id: 4,
      title: "Illectrik",
      file: "/artist-radio-app/audio/Illectrik.mp3",
      mood: ["Eclectic"],
    },

    {
      id: 5,
      title: "Waves",
      file: "/artist-radio-app/audio/Weves.mp3",
      mood: ["Melancholic"],
    },
    {
      id: 6,
      title: "The Fat Bee Dance",
      file: "/artist-radio-app/audio/The_Fat_Bee_Dance.mp3",
      mood: ["Silly", "Energetic"],
    },
    {
      id: 7,
      title: "Serial Spring",
      file: "/artist-radio-app/audio/Serial_Spring.mp3",
      mood: ["Calm"],
    },

    {
      id: 8,
      title: "Buckyball Molecule",
      file: "/artist-radio-app/audio/Buckyball_Molecule.mp3",
      mood: ["Calm", "Eclectic"],
    },

    {
      id: 9,
      title: "CE3",
      file: "/artist-radio-app/audio/CE3.mp3",
      mood: ["Melancholic"],
    },

    {
      id: 10,
      title: "Dirty",
      file: "/artist-radio-app/audio/Dirty.mp3",
      mood: ["Disturbing"],
    },

    {
      id: 11,
      title: "Electrofash",
      file: "/artist-radio-app/audio/Electrofash.mp3",
      mood: ["Disturbing"],
    },

    {
      id: 12,
      title: "Free Foam",
      file: "/artist-radio-app/audio/Free_Foam.mp3",
      mood: ["Eclectic", "Energetic"],
    },

    {
      id: 13,
      title: "Hertz War",
      file: "/artist-radio-app/audio/Hertz_War.mp3",
      mood: ["Eclectic"],
    },

    {
      id: 14,
      title: "HiFi Riot",
      file: "/artist-radio-app/audio/HiFi_Riot.mp3",
      mood: ["Eclectic", "Energetic"],
    },

    {
      id: 15,
      title: "Lemon Up",
      file: "/artist-radio-app/audio/Lemon_Up.mp3",
      mood: ["Energetic", "Silly"],
    },

    {
      id: 16,
      title: "Lullaby (Slobber Mix)",
      file: "/artist-radio-app/audio/Lullaby_(Slobber_mix).mp3",
      mood: ["Calm", "Melancholic"],
    },

    {
      id: 17,
      title: "Mouldy",
      file: "/artist-radio-app/audio/Mouldy.mp3",
      mood: ["Disturbing"],
    },

    {
      id: 18,
      title: "Nema Pipa Kondi",
      file: "/artist-radio-app/audio/Nema_Pipa_Kondi.mp3",
      mood: ["Silly", "Eclectic"],
    },

    {
      id: 19,
      title: "Pulsejet",
      file: "/artist-radio-app/audio/Pulsejet.mp3",
      mood: ["Energetic", "Eclectic"],
    },

    {
      id: 20,
      title: "Sunsmile",
      file: "/artist-radio-app/audio/Sunsmile.mp3",
      mood: ["Energetic"],
    },

    {
      id: 21,
      title: "Venom",
      file: "/artist-radio-app/audio/Venom.mp3",
      mood: ["Calm", "Eclectic"],
    },

    {
      id: 22,
      title: "Yesterday",
      file: "/artist-radio-app/audio/Yesterday.mp3",
      mood: ["Melancholic"],
    },
  ];

  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeMood, setActiveMood] = useState(null);

  const audioRef = useRef(null);
  const playedTracks = useRef(new Set());

  //  shuffle the array
  const shuffleArray = (array) => {
    const remainingTracks = array.filter(
      (track) => !playedTracks.current.has(track.id)
    );
    if (remainingTracks.length === 0) {
      playedTracks.current.clear();
      remainingTracks.push(...array);
    }
    for (let i = remainingTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingTracks[i], remainingTracks[j]] = [
        remainingTracks[j],
        remainingTracks[i],
      ];
    }
    return remainingTracks;
  };

  // Play all tracks when no mood is selected
  const playAllTracks = () => {
    setActiveMood(null);
    playedTracks.current.clear();
    const shuffledTracks = shuffleArray(tracks);
    setCurrentPlaylist(shuffledTracks);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  // Play specific mood
  const playMood = (mood) => {
    setActiveMood(mood);
    playedTracks.current.clear();
    const filteredTracks = tracks.filter((track) => track.mood.includes(mood));
    const shuffledTracks = isShuffling
      ? shuffleArray(filteredTracks)
      : filteredTracks;
    setCurrentPlaylist(shuffledTracks);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const currentTrackId = currentPlaylist[currentTrackIndex]?.id;

    if (isShuffling) {
      playedTracks.current.add(currentTrackId);

      const remainingTracks = currentPlaylist.filter(
        (track) => !playedTracks.current.has(track.id)
      );

      if (remainingTracks.length === 0) {
        playedTracks.current.clear();
        const reshuffledPlaylist = shuffleArray(currentPlaylist);
        setCurrentPlaylist(reshuffledPlaylist);
        setCurrentTrackIndex(0);
      } else {
        const nextTrack = remainingTracks[0];
        const nextIndex = currentPlaylist.findIndex(
          (track) => track.id === nextTrack.id
        );
        setCurrentTrackIndex(nextIndex);
      }
    } else {
      const nextIndex = currentTrackIndex + 1;
      if (nextIndex < currentPlaylist.length) {
        setCurrentTrackIndex(nextIndex);
      } else {
        setCurrentTrackIndex(0);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  // update  the prog. bar
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  // seek action - clicking on the progress bar
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const progressBar = e.target;
    const seekTime =
      (e.nativeEvent.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = seekTime;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      if (currentPlaylist.length === 0) {
        // simulate "Play All Tracks"
        playAllTracks();
      } else {
        // Play the current track from the current position
        audio.play();
      }
    }

    setIsPlaying(!isPlaying);
  };

  // Effect for handling audio changes
  useEffect(() => {
    const audio = audioRef.current;

    if (currentPlaylist.length > 0 && currentTrackIndex !== null) {
      const currentTrack = currentPlaylist[currentTrackIndex];

      if (audio.src !== currentTrack?.file) {
        audio.src = currentTrack?.file || "";
        if (isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }
  }, [currentPlaylist, currentTrackIndex]);

  return (
    <div className="player-container">
      <h1>
        <img
          src="/artist-radio-app/images/Parallel Concept LOGO white.svg"
          alt="Lew Boo Logo"
          className="logo-image"
        />
      </h1>

      <div className="mood-buttons">
        {[
          "Calm",
          "Melancholic",
          "Eclectic",
          "Silly",
          "Energetic",
          "Disturbing",
        ].map((mood) => (
          <button
            key={mood}
            className={`mood-btn mood-btn-${mood.toLowerCase()} ${
              activeMood === mood ? "active" : ""
            }`}
            onClick={() => playMood(mood)}
          >
            {mood}
          </button>
        ))}
        <button
          className={`mood-btn mood-btn-play-all ${
            activeMood === null ? "active" : ""
          }`}
          onClick={playAllTracks}
        >
          Play All
        </button>
      </div>

      <div className="track-title">
        {currentPlaylist[currentTrackIndex]?.title || ". . . . . . . . ."}
      </div>

      <div className="progress-bar" onClick={handleSeek}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls">
        <button onClick={togglePlayPause} className="play-btn">
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button onClick={nextTrack} className="next-btn">
          <FontAwesomeIcon icon={faForwardFast} />
        </button>
        <button
          onClick={() => setIsShuffling((prev) => !prev)}
          className="shuffle-btn"
        >
          {isShuffling ? (
            <FontAwesomeIcon icon={faShuffle} />
          ) : (
            <FontAwesomeIcon icon={faRightLong} />
          )}
        </button>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
    </div>
  );
};

export default AudioPlayerWithMoods;

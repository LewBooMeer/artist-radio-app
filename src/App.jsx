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
      file: "/audio/Bodyart.mp3",
      mood: ["Calm", "Melancholic"],
    },
    {
      id: 2,
      title: "I Hate TV",
      file: "/audio/I_Hate_TV.mp3",
      mood: ["Disturbing"],
    },
    {
      id: 3,
      title: "Kiddy",
      file: "/audio/Kiddy.mp3",
      mood: ["Energetic", "Silly"],
    },
    {
      id: 4,
      title: "Illectrik",
      file: "/audio/Illectrik.mp3",
      mood: ["Eclectic"],
    },

    { id: 5, title: "Waves", file: "/audio/Weves.mp3", mood: ["Melancholic"] },
    {
      id: 6,
      title: "The Fat Bee Dance",
      file: "/audio/The_Fat_Bee_Dance.mp3",
      mood: ["Silly", "Energetic"],
    },
    {
      id: 7,
      title: "Serial Spring",
      file: "/audio/Serial_Spring.mp3",
      mood: ["Calm"],
    },

    {
      id: 8,
      title: "Buckyball Molecule",
      file: "/audio/Buckyball_Molecule.mp3",
      mood: ["Calm", "Eclectic"],
    },

    {
      id: 9,
      title: "CE3",
      file: "/audio/CE3.mp3",
      mood: ["Melancholic"],
    },

    {
      id: 10,
      title: "Dirty",
      file: "/audio/Dirty.mp3",
      mood: ["Disturbing"],
    },

    {
      id: 11,
      title: "Electrofash",
      file: "/audio/Electrofash.mp3",
      mood: ["Disturbing"],
    },

    {
      id: 12,
      title: "Free Foam",
      file: "/audio/Free_Foam.mp3",
      mood: ["Eclectic", "Energetic"],
    },

    {
      id: 13,
      title: "Hertz War",
      file: "/audio/Hertz_War.mp3",
      mood: ["Eclectic"],
    },

    {
      id: 14,
      title: "HiFi Riot",
      file: "/audio/HiFi_Riot.mp3",
      mood: ["Eclectic", "Energetic"],
    },

    {
      id: 15,
      title: "Lemon Up",
      file: "/audio/Lemon_Up.mp3",
      mood: ["Energetic", "Silly"],
    },

    {
      id: 16,
      title: "Lullaby (Slobber Mix)",
      file: "/audio/Lullaby_(Slobber_mix).mp3",
      mood: ["Calm", "Melancholic"],
    },

    {
      id: 17,
      title: "Mouldy",
      file: "/audio/Mouldy.mp3",
      mood: ["Disturbing"],
    },

    {
      id: 18,
      title: "Nema Pipa Kondi",
      file: "/audio/Nema_Pipa_Kondi.mp3",
      mood: ["Silly", "Eclectic"],
    },

    {
      id: 19,
      title: "Pulsejet",
      file: "/audio/Pulsejet.mp3",
      mood: ["Energetic", "Eclectic"],
    },

    {
      id: 20,
      title: "Sunsmile",
      file: "/audio/Sunsmile.mp3",
      mood: ["Energetic"],
    },

    {
      id: 21,
      title: "Venom",
      file: "/audio/Venom.mp3",
      mood: ["Calm", "Eclectic"],
    },

    {
      id: 22,
      title: "Yesterday",
      file: "/audio/Yesterday.mp3",
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

        if (reshuffledPlaylist[0]?.id === currentTrackId) {
          if (reshuffledPlaylist.length > 1) {
            [reshuffledPlaylist[0], reshuffledPlaylist[1]] = [
              reshuffledPlaylist[1],
              reshuffledPlaylist[0],
            ];
          }
        }

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

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const progressBar = e.target;
    const seekTime =
      (e.nativeEvent.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = seekTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (currentPlaylist.length > 0) {
      audio.src = currentPlaylist[currentTrackIndex]?.file || "";
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [currentPlaylist, currentTrackIndex, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-container">
      <h1>
        {
          <img
            src="public/images/Parallel Concept LOGO white.svg"
            alt="Lew Boo Logo"
            className="logo-image"
          />
        }
      </h1>

      {}
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
      </div>

      {}
      <div className="track-title">
        {currentPlaylist[currentTrackIndex]?.title || ". . . . . . . . ."}
      </div>

      {}
      <div className="progress-bar" onClick={handleSeek}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      {}
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

      {}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
    </div>
  );
};

export default AudioPlayerWithMoods;

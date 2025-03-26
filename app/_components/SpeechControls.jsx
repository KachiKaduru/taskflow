// components/SpeechControls.js
"use client";

import { VolumeUpIcon, VolumeOffIcon } from "@heroicons/react/24/solid";
import useTextToSpeech from "@/hooks/useTextToSpeech";

export default function SpeechControls({ textToSpeak }) {
  const { speak, stop, isSpeaking, voices, selectedVoice, setVoice } = useTextToSpeech();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => (isSpeaking ? stop() : speak(textToSpeak))}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label={isSpeaking ? "Stop speech" : "Read aloud"}
      >
        {isSpeaking ? (
          <VolumeOffIcon className="h-5 w-5 text-red-500" />
        ) : (
          <VolumeUpIcon className="h-5 w-5 text-blue-500" />
        )}
      </button>

      {voices.length > 0 && (
        <select
          value={voices.indexOf(selectedVoice)}
          onChange={(e) => setVoice(voices[e.target.value])}
          className="text-xs p-1 border rounded"
          disabled={isSpeaking}
        >
          {voices.map((voice, index) => (
            <option key={voice.name} value={index}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

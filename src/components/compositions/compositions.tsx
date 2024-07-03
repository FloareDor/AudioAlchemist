import React, { useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioSet {
  id: number;
  source: string;
  output: string;
  composition: string;
}

const audioSets: AudioSet[] = [
    { id: 1, source: '/songs/source/1.mp3', output: '/songs/output/1.wav', composition: '/songs/compositions/1.mp3' },
    { id: 2, source: '/songs/source/2.mp3', output: '/songs/output/2.wav', composition: '/songs/compositions/2.mp3' }
];

const Compositions: React.FC = () => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-br from-black to-black min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-one to-middle">
          Compositions
        </h1>
        {audioSets.map((set) => (
          <div key={set.id} className="mb-12 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-one">Set {set.id}</h2>
            <div className="space-y-4">
              {(['source', 'output', 'composition'] as const).map((type) => {
                const audioSrc = set[type];
                return (
                  <div key={type} className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {type === 'source' ? 'Original Source' : type === 'output' ? 'Sampled Output' : 'Final Composition'}
                    </h3>
                    <AudioPlayer
                      src={audioSrc}
                      onPlay={() => setPlayingAudio(audioSrc)}
                      autoPlayAfterSrcChange={false}
                      customControlsSection={[
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS,
                      ]}
                      customProgressBarSection={[
                        RHAP_UI.PROGRESS_BAR,
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.DURATION,
                      ]}
                      layout="horizontal-reverse"
                      style={{ background: 'transparent', boxShadow: 'none' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compositions;
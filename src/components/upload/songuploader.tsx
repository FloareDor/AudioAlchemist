import React, { useState, useRef, useEffect, DragEvent } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { ChevronDown, ChevronUp, Upload } from 'lucide-react';

const SongUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sampledFile, setSampledFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showOriginalVis, setShowOriginalVis] = useState(true);
  const [showSampledVis, setShowSampledVis] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sampledAudioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sampledCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setSampledFile(null);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  const visualize = (audioElement: HTMLAudioElement, canvasElement: HTMLCanvasElement) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgb(20, 20, 20)';
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      const barWidth = (canvasElement.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasElement.height);
        gradient.addColorStop(0, '#01FE19');
        gradient.addColorStop(1, '#093100');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvasElement.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();
  };

  useEffect(() => {
    if (file && audioRef.current && canvasRef.current) {
      visualize(audioRef.current, canvasRef.current);
    }
  }, [file]);

  useEffect(() => {
    if (sampledFile && sampledAudioRef.current && sampledCanvasRef.current) {
      visualize(sampledAudioRef.current, sampledCanvasRef.current);
    }
  }, [sampledFile]);

  const handleSample = async () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8000/sample', formData, {
          responseType: 'blob',
        });

        const sampledAudioUrl = URL.createObjectURL(response.data);
        setSampledFile(sampledAudioUrl);
      } catch (error) {
        console.error('Error sampling the audio:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVisualizeSampled = () => {
    if (sampledFile && sampledAudioRef.current && sampledCanvasRef.current) {
      sampledAudioRef.current.play();
      visualize(sampledAudioRef.current, sampledCanvasRef.current);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-black min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-one to-middle">
          Audio Alchemist
        </h1>
        
        <div className="mb-12 relative">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-two bg-middle'
                : 'border-gray-300 bg-black hover:border-middle'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload size={48} className={`mb-4 ${isDragging ? 'text-one' : 'text-gray-400'}`} />
            <span className={`text-lg font-semibold ${isDragging ? 'text-one' : 'text-gray-300'}`}>
              {file ? file.name : "Drop your audio here or click to upload"}
            </span>
          </label>
          {file && (
            <Button 
              onClick={handleSample} 
              disabled={isLoading}
              className="mt-4 w-full bg-gradient-to-r from-two to-middle hover:from-two hover:to-middle hover:scale-x-[102%] text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              {isLoading ? 'Sampling...' : 'Transmute Audio'}
            </Button>
          )}
        </div>

        {file && (
          <div className="mb-12 bg-black rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Original Elixir</h2>
              <Button
                onClick={() => setShowOriginalVis(!showOriginalVis)}
                variant="ghost"
                size="icon"
              >
                {showOriginalVis ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            <audio ref={audioRef} src={URL.createObjectURL(file)} className="w-full mb-4" controls />
            {showOriginalVis && (
              <canvas ref={canvasRef} width="640" height="200" className="w-full rounded-lg" />
            )}
          </div>
        )}

        {sampledFile && (
          <div className="bg-black rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Transmuted Essence</h2>
              <Button
                onClick={() => setShowSampledVis(!showSampledVis)}
                variant="ghost"
                size="icon"
              >
                {showSampledVis ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            <audio ref={sampledAudioRef} src={sampledFile} className="w-full mb-4" controls />
            {showSampledVis && (
              <canvas ref={sampledCanvasRef} width="640" height="200" className="w-full rounded-lg" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongUploader;
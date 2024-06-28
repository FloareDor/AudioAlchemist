import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';

const HomePage: React.FC = () => {
  return (
    <div className=" pt-[7.5%] px-4 bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/path-to-your-image.jpg"  // Replace with your image path
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-one to-two">
            Audio Alchemist
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-300">
            We&apos;re building an auto sampler for producers to get juicy sample loops out of any song.
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-one to-two hover:scale-[105%] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            <Link href="/upload">Try It Now</Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Analyze"
            description="Extract key and chord progression from your audio files."
          />
          <FeatureCard
            title="Generate"
            description="Create new compositions based on extracted musical elements."
          />
          <FeatureCard
            title="Enhance"
            description="Transpose and recombine audio segments for unique variations."
          />
        </div>

        {/* <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <ol className="text-left list-decimal list-inside space-y-2 text-gray-300">
            <li>Audio analysis: Extract tempo, key, and chord information</li>
            <li>Segmentation: Divide audio into bars</li>
            <li>Chord progression generation: Create new progressions based on music theory</li>
            <li>Composition: Assemble new audio by matching and transposing segments</li>
            <li>Output: Generate a final audio file</li>
          </ol>
        </div> */}
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
	<Link href='/'>
  <div className="bg-[#341615] hover:bg-[#8f4a48] p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-100">{description}</p>
		</div>
		</Link>
);

export default HomePage;
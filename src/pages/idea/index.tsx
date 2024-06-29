import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar/navbar';
const IdeaPage: React.FC = () => {
	return (
	  <div className='flex flex-col'>
			<Navbar />
			<div className=" pt-[50%] px-4 bg-black text-white relative overflow-hidden">
				{/* Background Image */}
				<div className="absolute inset-0 z-0 opacity-70">
					<Image
					src="/images/idea.png"
					alt="Background"
					layout="fill"
					objectFit="cover"
					quality={100}
					/>
				</div>
			</div>
		</div>

		)
}

export default IdeaPage;
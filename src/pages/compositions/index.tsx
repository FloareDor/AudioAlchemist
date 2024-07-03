import Compositions from "@/components/compositions/compositions";
import React from 'react';
import Navbar from '@/components/navbar/navbar';
import AudioPlayer from "@/components/audioplayer";

const CompositionsPage: React.FC = () => {
	return (
	  <div className='flex flex-col'>
			<Navbar />
			<Compositions/>
		</div>

		)
}

export default CompositionsPage;
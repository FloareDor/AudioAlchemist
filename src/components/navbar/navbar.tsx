import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ['latin'] });
const Navbar = () => {
	return (
		<div className="w-full border-b border-[#2D2D2D] bg-black">
			<div className="py-[2vh] flex flex-row justify-between w-[90%] mx-auto items-center border-bottom">
				<Link href={'/'}>
					<div className="flex flex-row gap-2">
						{/* <Image src='/images/logo.svg' alt='logo' width={22} height={22}/> */}
						<span className="text-md text-transparent bg-clip-text bg-gradient-to-br from-one to-two ${inter.className}">Audio Alchemist</span>
					</div>
				</Link>
				<Link href={'/contact'}> <span className="text-transparent bg-clip-text bg-gradient-to-br from-one to-two text-sm">Contact</span> </Link>
			</div>
		</div>
	)
};

export default Navbar
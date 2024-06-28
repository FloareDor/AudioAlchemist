import Link from "next/link";
import Navbar from "@/components/navbar/navbar";

const socials = () => {
    return (
        <div>
            <div className="flex flex-col bg-black">
                <Navbar />
                <div className="flex flex-col items-center gap-2 pt-28 lg:pt-60 md:pt-60 sm:pt-60">
                    <Link href={"https://floaredor.vercel.app/"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Floare Dor</span>
                    </Link>
                    <Link href={"https://vivekdhir.com/"} target="_blank">
                        <span className="text-white font-sans hover:text-gray-300">Vivek Dhir</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default socials;
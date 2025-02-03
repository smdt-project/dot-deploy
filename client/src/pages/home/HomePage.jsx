import Header from "../../features/header/Header";
import Features from "./features/features/Features";
import Footer from "./features/footer/Footer";
import Hero from "./features/hero/Hero";

const HomePage = () => {
	return (
		<section className="flex flex-col inset-0 max-w-[100dvw] overflow-hidden">
			<Header />
			<Hero />
			<Features />
			<Footer />
		</section>
	);
};

export default HomePage;

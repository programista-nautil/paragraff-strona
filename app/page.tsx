'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { NAV_LINKS, OFFER_ITEMS, PORTFOLIO_ITEMS, HERO_SLIDES } from '@/data/mockData'

export default function Home() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<main className='min-h-screen bg-dark text-white selection:bg-primary selection:text-white'>
			{/* --- HEADER --- */}
			<header className='fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-md border-b border-white/10 shadow-lg'>
				<div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
					{/* LOGO - Obrazek */}
					<div className='relative w-40 h-12'>
						<div className='flex items-center h-full'>
							<Image src='/logo.png' alt='Paragraff Logo' fill className='object-contain object-left' priority />
						</div>
					</div>

					<nav className='hidden md:flex gap-8'>
						{NAV_LINKS.map(link => (
							<a
								key={link.label}
								href={link.href}
								className='text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium'>
								{link.label}
							</a>
						))}
					</nav>
				</div>
			</header>

			{/* --- HERO SECTION --- */}
			{/* Zastępujemy slider nowoczesnym Hero Image z gradientem */}
			<section id='home' className='relative h-screen flex items-center justify-center overflow-hidden'>
				{/* Tło */}
				{HERO_SLIDES.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
							index === currentSlide ? 'opacity-100' : 'opacity-0'
						}`}>
						<Image
							src={slide.image}
							alt={slide.alt}
							fill
							className='object-cover'
							priority={index === 0} // Priorytet tylko dla pierwszego
						/>
						{/* Gradient Overlay - żeby tekst był czytelny na każdym zdjęciu */}
						<div className='absolute inset-0 bg-black/40' />
						<div className='absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark' />
					</div>
				))}

				<div className='relative z-10 text-center px-4 max-w-4xl drop-shadow-2xl'>
					<h1 className='text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white'>
						UNIKALNE <span className='text-primary'>KONCEPCJE</span>
					</h1>
					<p className='text-xl md:text-2xl text-gray-300 font-light mb-10 tracking-wide'>
						I ŚWIEŻE SPOJRZENIE NA KLIENTA
					</p>
					<a
						href='#portfolio'
						className='border border-primary text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all duration-300'>
						Zobacz Nasze Portfolio
					</a>
				</div>

				<div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20'>
					{HERO_SLIDES.map((_, idx) => (
						<button
							key={idx}
							onClick={() => setCurrentSlide(idx)}
							className={`w-3 h-3 rounded-full transition-all ${
								idx === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
							}`}
						/>
					))}
				</div>
			</section>

			{/* --- OFERTA --- */}
			<section id='offer' className='py-24 px-6 bg-zinc-900'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold uppercase tracking-widest mb-4'>Nasza Oferta</h2>
						<p className='text-gray-400 max-w-2xl mx-auto'>
							Jesteśmy odpowiedzialni za każde zlecenie od momentu projektu do gotowego produktu oszczędzając w ten
							sposób Państwa cenny czas.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-12 text-center'>
						{OFFER_ITEMS.map(item => (
							<div
								key={item.title}
								className='group p-8 rounded-2xl bg-card bg-dark transition-all border border-white/5 hover:border-primary/30 flex flex-col items-center'>
								<div className='relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary group-hover:scale-105 transition-all duration-300 p-6'>
									<div className='relative w-full h-full'>
										<Image src={item.imageSrc} alt={item.title} fill className='object-contain drop-shadow-md' />
									</div>
								</div>

								<h3 className='text-xl font-bold text-primary mb-4 uppercase'>{item.title}</h3>
								<p className='text-gray-400 leading-relaxed text-sm'>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --- PORTFOLIO --- */}
			{/* =========CHANGE========= Zmieniono bg-zinc-950 na bg-black (Głęboka czerń) żeby odciąć się od oferty */}
			<section id='portfolio' className='py-24 px-6 bg-black relative overflow-hidden'>
				{/* Dekoracyjny element w tle (subtelny dym/abstract) */}
				<div className='absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent'></div>

				<div className='max-w-7xl mx-auto relative z-10'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold uppercase tracking-widest mb-2'>Portfolio</h2>
						<p className='text-gray-400 uppercase text-sm tracking-widest'>
							Zapraszamy do zapoznania się z naszymi realizacjami
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{/* Wyświetla wszystkie elementy z tablicy PORTFOLIO_ITEMS */}
						{PORTFOLIO_ITEMS.map(item => (
							<div
								key={item.id}
								onClick={() => setSelectedImage(item.src)}
								className='relative group aspect-video overflow-hidden cursor-pointer bg-zinc-900'>
								<Image
									src={item.src}
									alt={item.category}
									fill
									className='object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100'
								/>
								<div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
									<span className='text-primary font-bold uppercase tracking-widest border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors'>
										{item.category}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* --- KONTAKT --- */}
			{/* =========CHANGE========= Zmieniono bg-dark na bg-zinc-900 (powrót do koloru z sekcji Oferta) */}
			<section id='contact' className='py-24 px-6 bg-zinc-900'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid md:grid-cols-2 gap-16 items-center'>
						{/* Dane kontaktowe */}
						<div>
							<h2 className='text-3xl font-bold uppercase tracking-widest mb-8'>Kontakt</h2>
							<p className='text-gray-400 mb-10'>Zapraszamy do kontaktu z nami, odpowiemy na każde zapytanie.</p>

							<div className='space-y-8'>
								<div>
									<h4 className='text-primary font-bold uppercase text-sm mb-2'>Siedziba Firmy</h4>
									<p className='text-gray-400'>ul. Nad Strugą 8, 87-100 Toruń</p>
									<p className='text-gray-400'>NIP: 879-229-83-14</p>
									<p className='text-gray-400'>REGON: 871634747</p>
								</div>

								<div>
									<h4 className='text-primary font-bold uppercase text-sm mb-2'>Dział Handlowy</h4>
									<p className='text-gray-400'>tel. 509 70 77 13</p>
									<p className='text-gray-400'>e-mail: handel@paragraff.pl</p>
								</div>

								<div>
									<h4 className='text-primary font-bold uppercase text-sm mb-2'>Dział Projektowy</h4>
									<p className='text-gray-400'>tel. 509 70 77 12</p>
									<p className='text-gray-400'>e-mail: projekt@paragraff.pl</p>
								</div>
							</div>
						</div>

						{/* Mapa */}
						<div className='h-[400px] w-full bg-zinc-800 rounded-lg overflow-hidden'>
							{/* Placeholder dla Google Maps */}
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9593.121677880214!2d18.7112283!3d53.0512687!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471cccbd5c846dd1%3A0x3840ae2bb858c1af!2sParaGraff!5e0!3m2!1spl!2spl!4v1770281799407!5m2!1spl!2spl'
								width='100%'
								height='100%'
								style={{ border: 0 }}
								loading='lazy'></iframe>
						</div>
					</div>
				</div>
			</section>

			{/* --- FOOTER --- */}
			<footer className='bg-black py-12 text-center border-t border-white/5'>
				<div className='max-w-4xl mx-auto px-6'>
					<p className='text-2xl font-serif italic text-gray-400 mb-4'>
						"Wiele rzeczy małych stało się wielkimi, tylko dzięki odpowiedniej reklamie."
					</p>
					<p className='text-primary text-sm uppercase tracking-widest mb-8'>- Mark Twain</p>
					<p className='text-xs text-gray-500 uppercase'>© 2026 Paragraff. All Rights Reserved.</p>
				</div>
			</footer>

			{selectedImage && (
				<div
					className='fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4'
					onClick={() => setSelectedImage(null)}>
					<button
						className='absolute top-4 right-4 text-white hover:text-primary transition-colors z-50 p-2'
						onClick={() => setSelectedImage(null)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-10 h-10'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
						</svg>
					</button>

					<div className='relative w-full max-w-5xl aspect-video'>
						<Image src={selectedImage} alt='Powiększenie' fill className='object-contain' quality={100} />
					</div>
				</div>
			)}
		</main>
	)
}

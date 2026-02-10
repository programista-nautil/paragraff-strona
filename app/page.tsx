'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { NAV_LINKS, OFFER_ITEMS, PORTFOLIO_ITEMS, HERO_SLIDES } from '@/data/mockData'

// --- WARIANTY ANIMACJI ---

const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: 'easeOut' },
	},
}

const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
}

const cardItem: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'backOut' },
	},
}

const quoteContainer: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.03,
			delayChildren: 0.2,
		},
	},
}

const quoteLetter: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
	},
}

export default function Home() {
	const [isLoading, setIsLoading] = useState(true) // Stan ładowania
	const [currentSlide, setCurrentSlide] = useState(0)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)
	const [activeSection, setActiveSection] = useState('')
	const [isFirstLoad, setIsFirstLoad] = useState(true)

	// Dodaj ten useEffect, żeby wykryć pierwszą zmianę slajdu
	useEffect(() => {
		if (currentSlide > 0) {
			setIsFirstLoad(false)
		}
	}, [currentSlide])

	// Slider logic
	useEffect(() => {
		if (isLoading) return
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)
		}, 7000)
		return () => clearInterval(interval)
	}, [isLoading])

	// Scroll Spy Logic
	useEffect(() => {
		const handleScroll = () => {
			// Jeśli loading trwa, nie rób nic (zabezpieczenie, jeśli masz zmienną isLoading w zależnościach)
			// if (isLoading) return

			const scrollPosition = window.scrollY + 150

			// 1. WYKRYWANIE GÓRY (HOME) - NOWE ZABEZPIECZENIE
			// Jeśli scroll jest mniejszy niż 100px, na sztywno ustawiamy Home i przerywamy.
			// To naprawia błąd, gdzie przy ładowaniu zaliczało "Kontakt"
			if (window.scrollY < 100) {
				// Znajdź pierwszy link z kotwicą (zazwyczaj #home)
				const firstAnchorLink = NAV_LINKS.find(link => link.href.startsWith('#'))
				if (firstAnchorLink) {
					setActiveSection(firstAnchorLink.href)
				}
				return // Ważne: przerywamy funkcję, nie sprawdzamy dalej
			}

			// 2. WYKRYWANIE DOŁU STRONY (Dla kontaktu)
			// Dodajemy warunek: window.scrollY > 100 (żeby nie odpalało się na starcie)
			const isBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && window.scrollY > 100

			if (isBottom) {
				const lastAnchorLink = [...NAV_LINKS].reverse().find(link => link.href.startsWith('#'))
				if (lastAnchorLink) {
					setActiveSection(lastAnchorLink.href)
					return
				}
			}

			// 3. STANDARDOWE WYKRYWANIE (Dla reszty sekcji)
			NAV_LINKS.forEach(link => {
				if (!link.href.startsWith('#')) return

				const section = document.querySelector(link.href) as HTMLElement
				if (section) {
					const sectionTop = section.offsetTop
					const sectionHeight = section.offsetHeight

					if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
						setActiveSection(link.href)
					}
				}
			})
		}

		window.addEventListener('scroll', handleScroll)
		// Wywołujemy raz na starcie, żeby ustawić stan po odświeżeniu
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const quoteText = 'Wiele rzeczy małych stało się wielkimi, tylko dzięki odpowiedniej reklamie.'

	return (
		<main className='min-h-screen bg-dark text-white selection:bg-primary selection:text-white overflow-x-hidden'>
			{/* --- PRELOADER --- */}
			{/* --- PRELOADER --- */}
			<AnimatePresence mode='wait'>
				{isLoading && (
					<motion.div
						key='preloader'
						className='fixed inset-0 z-[9999] bg-black flex items-center justify-center'
						// TU JEST KLUCZOWA ZMIANA:
						// delay: 0.6 sprawia, że tło czeka, aż logo skończy skakać (0.5s) + mały margines
						exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.6 } }}>
						<motion.div
							initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
							animate={{
								opacity: 1,
								scale: 1,
								rotate: 360,
							}}
							transition={{
								duration: 2,
								ease: 'easeInOut',
							}}
							// Gdy skończy się kręcić, odpalamy procedurę wyjścia (exit)
							onAnimationComplete={() => setIsLoading(false)}
							exit={{
								scale: [1, 1.2, 0], // Podskok i zniknięcie
								opacity: 0,
								transition: { duration: 0.5, ease: 'backIn' }, // To trwa 0.5s
							}}
							className='relative w-64 h-20'>
							<Image src='/logo.png' alt='Paragraff Loading' fill className='object-contain' priority />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* --- GŁÓWNA ZAWARTOŚĆ --- */}
			{/* Renderujemy stronę dopiero gdy isLoading jest false, albo ukrywamy ją pod spodem */}
			{!isLoading && (
				<motion.div
					initial={{ opacity: 0, scale: 0.98 }} // Start: lekko pomniejszona i niewidoczna
					animate={{ opacity: 1, scale: 1 }} // Koniec: pełny wymiar i widoczność
					transition={{ duration: 1, delay: 0.2, ease: 'circOut' }} // Animacja wejścia strony
				>
					{/* --- HEADER --- */}
					<motion.header
						initial={{ y: -100 }}
						animate={{ y: 0 }}
						transition={{ duration: 0.6, ease: 'circOut' }}
						className='fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-md border-b border-white/10 shadow-lg'>
						<div className='max-w-7xl mx-auto px-6 h-20 flex items-center justify-between'>
							<div className='relative w-40 h-12'>
								<div className='flex items-center h-full'>
									<Image src='/logo.png' alt='Paragraff Logo' fill className='object-contain object-left' priority />
								</div>
							</div>

							<nav className='hidden md:flex gap-8'>
								{NAV_LINKS.map((link, i) => {
									const isActive = activeSection === link.href
									return (
										<motion.a
											key={link.label}
											href={link.href}
											initial={{ opacity: 0, y: -20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.1 + i * 0.1 }}
											whileHover={{ scale: 1.1 }}
											className={`text-sm uppercase tracking-widest transition-colors font-medium relative
												${isActive ? 'text-primary' : 'text-white hover:text-primary'}
											`}>
											{link.label}
											{isActive && (
												<motion.span
													layoutId='activeSection'
													className='absolute -bottom-2 left-0 right-0 h-0.5 bg-primary'
												/>
											)}
										</motion.a>
									)
								})}
							</nav>
						</div>
					</motion.header>

					{/* --- HERO SECTION --- */}
					<section id='home' className='relative h-screen flex items-center justify-center overflow-hidden'>
						{HERO_SLIDES.map((slide, index) => (
							<div
								key={slide.id}
								className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
									index === currentSlide ? 'opacity-100' : 'opacity-0'
								}`}>
								<div
									className={`relative w-full h-full transition-transform duration-[5000ms] ease-linear ${
										index === currentSlide ? 'scale-110' : 'scale-100'
									}`}>
									<Image src={slide.image} alt={slide.alt} fill className='object-cover' priority={index === 0} />
								</div>
								<div className='absolute inset-0 bg-black/40' />
								<div className='absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark' />
							</div>
						))}

						<div className='relative z-10 text-center px-4 max-w-4xl drop-shadow-2xl'>
							{/* mode='wait' sprawia, że stary tekst czeka z odejściem, 
                        aż skończy animację, zanim pojawi się nowy. 
                    */}
							<AnimatePresence mode='wait'>
								<motion.div
									// Klucz na kontenerze wymusza przerysowanie całego bloku przy zmianie slajdu
									key={currentSlide}
									// Initial/Exit definiuje stan "niewidoczny" (przed wejściem i po wyjściu)
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }} // Szybkie wyjście
									transition={{ duration: 0.5 }}>
									<motion.h1
										// Tutaj zachowujemy logikę isFirstLoad dla pierwszego wjazdu z dołu
										initial={{
											y: isFirstLoad ? 50 : 0,
											opacity: 0,
										}}
										animate={{ y: 0, opacity: 1 }}
										transition={{
											delay: isFirstLoad ? 0.2 : 0.2,
											duration: 0.8,
											ease: 'circOut',
										}}
										className='text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white'>
										{HERO_SLIDES[currentSlide].title}{' '}
										<span className='text-primary'>{HERO_SLIDES[currentSlide].highlight}</span>
									</motion.h1>

									<motion.p
										initial={{
											y: isFirstLoad ? 30 : 0,
											opacity: 0,
										}}
										animate={{ y: 0, opacity: 1 }}
										transition={{
											delay: isFirstLoad ? 0.4 : 0.4,
											duration: 0.8,
											ease: 'circOut',
										}}
										className='text-xl md:text-2xl text-gray-300 font-light mb-10 tracking-wide'>
										{HERO_SLIDES[currentSlide].subtitle}
									</motion.p>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: isFirstLoad ? 0.6 : 0.6,
											duration: 0.8,
											// TU MOŻESZ ZMIENIĆ EASE: 'easeInOut', 'circOut', 'backOut'
											ease: 'circOut',
										}}>
										<motion.a
											href='#portfolio'
											whileHover={{ scale: 1.05, backgroundColor: '#FF007F', color: '#fff', borderColor: '#FF007F' }}
											whileTap={{ scale: 0.95 }}
											className='inline-block border border-primary text-primary px-8 py-4 uppercase tracking-widest text-sm 
						transition-colors duration-300 mt-4'>
											Zobacz Nasze Portfolio
										</motion.a>
									</motion.div>
								</motion.div>
							</AnimatePresence>
						</div>

						<div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20'>
							{HERO_SLIDES.map((_, idx) => (
								<button
									key={idx}
									onClick={() => {
										setCurrentSlide(idx)
										setIsFirstLoad(false)
									}}
									className={`w-3 h-3 rounded-full transition-all ${
										idx === currentSlide ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
									}`}
								/>
							))}
						</div>
					</section>

					{/* --- OFERTA --- */}
					<section id='offer' className='py-24 px-6 bg-zinc-900'>
						<motion.div
							className='max-w-7xl mx-auto'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: false, amount: 0.2, margin: '-50px' }}
							variants={staggerContainer}>
							<motion.div variants={fadeInUp} className='text-center mb-16'>
								<h2 className='text-3xl font-bold uppercase tracking-widest mb-4'>Nasza Oferta</h2>
								<p className='text-gray-400 max-w-2xl mx-auto'>
									Jesteśmy odpowiedzialni za każde zlecenie od momentu projektu do gotowego produktu oszczędzając w ten
									sposób Państwa cenny czas.
								</p>
							</motion.div>

							<div className='grid md:grid-cols-3 gap-12 text-center'>
								{OFFER_ITEMS.map((item, index) => (
									<motion.div
										key={item.title}
										variants={cardItem}
										whileHover={{ y: -10 }}
										className='group p-8 rounded-2xl bg-card bg-dark transition-all border border-white/5 hover:border-primary/30 flex flex-col items-center shadow-xl hover:shadow-primary/10'>
										<motion.div
											className='relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors duration-300 p-6'
											animate={{ y: [0, -5, 0] }}
											transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}>
											<div className='relative w-full h-full'>
												<Image src={item.imageSrc} alt={item.title} fill className='object-contain drop-shadow-md' />
											</div>
										</motion.div>

										<h3 className='text-xl font-bold text-primary mb-4 uppercase'>{item.title}</h3>
										<p className='text-gray-400 leading-relaxed text-sm'>{item.description}</p>
									</motion.div>
								))}
							</div>
						</motion.div>
					</section>

					{/* --- PORTFOLIO --- */}
					<section id='portfolio' className='py-24 px-6 bg-black relative overflow-hidden'>
						<div className='absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent'></div>

						<motion.div
							className='max-w-7xl mx-auto relative z-10'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: false, amount: 0.1 }}
							variants={staggerContainer}>
							<motion.div variants={fadeInUp} className='text-center mb-16'>
								<h2 className='text-3xl font-bold uppercase tracking-widest mb-2'>Portfolio</h2>
								<p className='text-gray-400 uppercase text-sm tracking-widest'>
									Zapraszamy do zapoznania się z naszymi realizacjami
								</p>
							</motion.div>

							<motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{PORTFOLIO_ITEMS.map(item => (
									<motion.div
										key={item.id}
										variants={cardItem}
										onClick={() => setSelectedImage(item.src)}
										whileHover={{ scale: 1.02, zIndex: 10 }}
										whileTap={{ scale: 0.98 }}
										className='relative group aspect-video overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 shadow-lg rounded-lg'>
										<Image
											src={item.src}
											alt={item.category}
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100'
										/>
										<div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center '>
											<motion.span
												initial={{ y: 20, opacity: 0 }}
												whileInView={{ y: 0, opacity: 1 }}
												className='text-primary font-bold uppercase tracking-widest border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors'>
												{item.category}
											</motion.span>
										</div>
									</motion.div>
								))}
							</motion.div>
						</motion.div>
					</section>

					{/* --- KONTAKT --- */}
					<section id='contact' className='py-24 px-6 bg-zinc-900'>
						<div className='max-w-7xl mx-auto'>
							<div className='grid md:grid-cols-2 gap-16 items-center'>
								<motion.div
									initial={{ opacity: 0, x: -50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, ease: 'easeOut' }}
									viewport={{ once: false, amount: 0.3 }}>
									<h2 className='text-3xl font-bold uppercase tracking-widest mb-8'>Kontakt</h2>
									<p className='text-gray-400 mb-10'>Zapraszamy do kontaktu z nami, odpowiemy na każde zapytanie.</p>

									<div className='space-y-8'>
										{['Siedziba Firmy', 'Dział Handlowy', 'Dział Projektowy'].map((title, i) => (
											<motion.div
												key={title}
												initial={{ opacity: 0, x: -20 }}
												whileInView={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.2 + i * 0.1 }}
												viewport={{ once: false }}>
												<h4 className='text-primary font-bold uppercase text-sm mb-2'>{title}</h4>
												{title === 'Siedziba Firmy' && (
													<>
														<p className='text-gray-400'>ul. Nad Strugą 8, 87-100 Toruń</p>
														<p className='text-gray-400'>NIP: 879-229-83-14 | REGON: 871634747</p>
													</>
												)}
												{title === 'Dział Handlowy' && (
													<>
														<p className='text-gray-400'>tel. 509 70 77 13</p>
														<p className='text-gray-400'>e-mail: handel@paragraff.pl</p>
													</>
												)}
												{title === 'Dział Projektowy' && (
													<>
														<p className='text-gray-400'>tel. 509 70 77 12</p>
														<p className='text-gray-400'>e-mail: projekt@paragraff.pl</p>
													</>
												)}
											</motion.div>
										))}
									</div>
								</motion.div>

								<motion.div
									className='h-[400px] w-full bg-zinc-800 rounded-lg overflow-hidden'
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
									viewport={{ once: false, amount: 0.3 }}>
									<iframe
										src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9593.121677880214!2d18.7112283!3d53.0512687!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471cccbd5c846dd1%3A0x3840ae2bb858c1af!2sParaGraff!5e0!3m2!1spl!2spl!4v1770281799407!5m2!1spl!2spl'
										width='100%'
										height='100%'
										style={{ border: 0 }}
										loading='lazy'></iframe>
								</motion.div>
							</div>
						</div>
					</section>

					{/* --- FOOTER --- */}
					<footer className='bg-black py-12 text-center border-t border-white/5'>
						<div className='max-w-4xl mx-auto px-6'>
							<motion.p
								className='text-2xl font-serif italic text-gray-400 mb-4 inline-block'
								variants={quoteContainer}
								initial='hidden'
								whileInView='visible'
								viewport={{ once: false, amount: 0.5 }}>
								{quoteText.split('').map((char, index) => (
									<motion.span key={index} variants={quoteLetter}>
										{char}
									</motion.span>
								))}
							</motion.p>

							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 2 }}
								className='text-primary text-sm uppercase tracking-widest mb-8'>
								- Mark Twain
							</motion.p>

							<p className='text-xs text-gray-500 uppercase'>© 2026 Paragraff. All Rights Reserved.</p>
						</div>
					</footer>
				</motion.div>
			)}

			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4'
						onClick={() => setSelectedImage(null)}>
						<motion.button
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
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
						</motion.button>

						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='relative w-full max-w-5xl aspect-video'>
							<Image src={selectedImage} alt='Powiększenie' fill className='object-contain' quality={100} />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	)
}

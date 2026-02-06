import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const siteUrl = 'https://paragraff.pl'

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'Paragraff Toruń - Agencja Interaktywna',
		template: '%s | Paragraff Toruń',
	},
	description:
		'Kompleksowa obsługa interaktywna w Toruniu. Oferujemy unikalne projekty graficzne, profesjonalny druk oraz gadżety reklamowe z nadrukiem. Sprawdź nasze portfolio!',
	keywords: [
		'Agencja interaktywna Toruń',
		'Drukarnia Toruń',
		'Projekty graficzne',
		'Gadżety reklamowe',
		'Oklejanie samochodów',
		'Strony WWW',
		'Banery reklamowe',
		'Wizytówki',
	],

	authors: [{ name: 'Paragraff' }],
	creator: 'Paragraff',
	publisher: 'Paragraff',

	openGraph: {
		title: 'Agencja Interaktywna Paragraff Toruń',
		description: 'Unikalne koncepcje i świeże spojrzenie na klienta. Projekt, Druk, Gadżety.',
		url: siteUrl,
		siteName: 'Paragraff',
		locale: 'pl_PL',
		type: 'website',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Portfolio Agencji Paragraff',
			},
		],
	},

	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	)
}

import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./lib/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				// Ten róż ze screenów (pobrałem pipetą)
				primary: '#FF007F',
				// Ciemny kolor tła (nie czysty czarny, ale elegancki grafit)
				dark: '#0a0a0a',
				card: '#171717',
			},
		},
	},
	plugins: [],
}
export default config

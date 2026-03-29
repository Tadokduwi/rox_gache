import './globals.css'

export const metadata = {
  title: 'ROX Gacha',
  description: 'Gacha simulator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

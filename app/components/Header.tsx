import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Leonardo&#39;s Apps
        </Link>
      </nav>
    </header>
  )
}

export default Header


/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getManga } from '@/app/lib/mangaService'
import { Manga } from '@/app/types/Manga'
import './Navbar.css'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<Manga[]>([])
  const [allManga, setAllManga] = useState<Manga[]>([])
  const router = useRouter()

  useEffect(() => {
    getManga().then(setAllManga)
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setSuggestions([])
    } else {
      const results = allManga
        .filter((manga) =>
          manga.ProductName.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 10)
      setSuggestions(results)
    }
  }, [search, allManga])

  const handleSelect = (mangaId: string) => {
    setSearch('')
    setSuggestions([])
    router.push(`/manga/${mangaId}`)
  }

  return (
    <nav className="nav bg-black text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-400">
          <Link href="/">MyNovel</Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md border-2 border-sky-700 rounded-3xl">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-3xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="ค้นหาชื่อมังงะ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white text-black rounded-b-md shadow-lg overflow-hidden mt-1 z-50">
              {suggestions.map((manga) => (
                <li
                key={manga.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-purple-100 cursor-pointer truncate"
                onClick={() => handleSelect(manga.id)}
              >
                <img
                  src={manga.ImageUrl}
                  alt={manga.ProductName}
                  className="w-10 h-14 object-cover rounded"
                />
                <span className="truncate">{manga.ProductName}</span>
              </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation links */}
        <div className="flex gap-4 text-sm md:text-base">
          <Link href="/" className="hover:text-purple-400 transition">Home</Link>
          <Link href="/about" className="hover:text-purple-400 transition">About</Link>
          <Link href="/contact" className="hover:text-purple-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

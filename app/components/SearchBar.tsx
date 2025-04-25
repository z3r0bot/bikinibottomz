'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-600 hover:text-[#ff7400] transition-colors duration-200"
      >
        <Search className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-[#ffc367]">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#ff7400]">Search Products</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-[#ff7400] transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSearch} className="p-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7400] focus:border-transparent text-lg"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#ff7400] to-[#ffa242] text-white rounded-md hover:from-[#ff7400] hover:to-[#ff7400] focus:outline-none focus:ring-2 focus:ring-[#ff7400] focus:ring-offset-2 transition-all duration-200 text-lg font-medium"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 
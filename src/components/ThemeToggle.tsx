import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary flex items-center gap-2"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <>
          <MoonIcon className="w-5 h-5" />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <SunIcon className="w-5 h-5" />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
} 
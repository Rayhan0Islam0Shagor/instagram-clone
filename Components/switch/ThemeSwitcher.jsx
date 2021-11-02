import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { ThemeState } from '../../atoms/ThemeAtom';

export default function ThemeSwitcher() {
  const [enabled, setEnabled] = useState(false);
  const [isDark, setIsDark] = useRecoilState(ThemeState);
  const [theme, setTheme] = useState(isDark);

  setIsDark(theme);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme')
    );
    setTheme(localStorage.getItem('theme'));
  }, []);

  const switchTheme = () => {
    if (theme === 'light') {
      saveTheme('dark');
    } else {
      saveTheme('light');
    }
  };

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <Switch
      checked={enabled}
      onChange={switchTheme}
      className={`${theme === 'dark' ? 'bg-yellow-400 ' : 'bg-gray-700'}
          relative inline-flex flex-shrink-0 h-6 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
}

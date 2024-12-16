import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className='bg-gray-200 text-gray-900 dark:text-gray-200 dark:bg-gray-900 min-h-screen transition-all duration-700'>
        {children}
      </div>
    </div>
  );
}

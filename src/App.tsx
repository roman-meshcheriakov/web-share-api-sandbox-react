import React from 'react';
import { useWebShare } from './hooks/useWebShare/useWebShare';
import './App.css';

const App: React.FC = () => {
  const { isAvailable, share, isSharing, isError, error } = useWebShare({
    title: 'My Web Page',
    text: 'Check out this cool page!',
    url: window.location.href,
  });

  const backgroundColor = isAvailable ? isSharing ? 'lightblue' : 'white' : 'lightcoral';

  return (
    <div className='container' style={{ backgroundColor, transition: 'all 300ms' }}>
      <h1>Test Web Share API</h1>

      {isAvailable ? (
        <div>
          <button onClick={share} disabled={isSharing}>
            {isSharing ? 'Sharing...' : 'Share this page'}
          </button>

          <div style={{ color: isError ? 'red' : 'springgreen' }}>
            <p>{isError ? 'There was an error while sharing:' : 'No errors availeable'} </p>

            <p>{error}</p>

          </div>

        </div>
      ) : (
        <p>Your browser does not support the Web Share API.</p>
      )}
    </div>
  );
};

export default App;

import React from 'react';

/**
 * A loader component that displays three dots bouncing in sequence.
 * It's used to indicate that the AI is processing a response.
 */
export const BlinkingLoader = () => {
  return (
    <div role="status" className="flex items-center space-x-2">
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
  );
};

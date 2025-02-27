import React, { useState, useEffect, useRef } from 'react';

interface TextGenerateProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const TextGenerate: React.FC<TextGenerateProps> = ({
  text,
  speed = 30,
  delay = 0,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIsComplete(false);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Initial delay before starting to type
    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, onComplete]);

  // Function to parse markdown and convert to JSX
  const parseMarkdown = (content: string) => {
    // Split the content by markdown patterns
    const parts = [];
    let currentText = '';
    let inBold = false;
    
    for (let i = 0; i < content.length; i++) {
      // Check for bold pattern
      if (i < content.length - 1 && content.substring(i, i + 2) === '**') {
        // Add current text to parts
        if (currentText) {
          parts.push({ text: currentText, bold: inBold });
          currentText = '';
        }
        
        // Toggle bold state
        inBold = !inBold;
        i++; // Skip the second asterisk
      } else {
        currentText += content[i];
      }
    }
    
    // Add any remaining text
    if (currentText) {
      parts.push({ text: currentText, bold: inBold });
    }
    
    // Convert parts to JSX
    return parts.map((part, index) => 
      part.bold ? 
        <strong key={index}>{part.text}</strong> : 
        <span key={index}>{part.text}</span>
    );
  };

  return (
    <div className="typewriter-effect">
      {parseMarkdown(displayedText)}
      {!isComplete && <span className="cursor">|</span>}
    </div>
  );
};

export default TextGenerate;
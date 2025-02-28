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
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up container with full text immediately for proper sizing
  useEffect(() => {
    if (containerRef.current) {
      // Create a hidden element with the full text to calculate dimensions
      const hiddenDiv = document.createElement('div');
      hiddenDiv.style.visibility = 'hidden';
      hiddenDiv.style.position = 'absolute';
      hiddenDiv.style.whiteSpace = 'pre-wrap';
      hiddenDiv.style.wordWrap = 'break-word';
      hiddenDiv.className = containerRef.current.className;
      
      // Add the full text to the hidden div
      const fullTextContent = document.createElement('div');
      fullTextContent.innerHTML = parseMarkdownToHTML(text);
      hiddenDiv.appendChild(fullTextContent);
      
      // Add to the DOM temporarily to calculate dimensions
      document.body.appendChild(hiddenDiv);
      
      // Get the dimensions
      const height = hiddenDiv.offsetHeight;
      // const width = hiddenDiv.offsetWidth;
      
      // Apply the dimensions to our container
      if (containerRef.current) {
        containerRef.current.style.minHeight = `${height}px`;
        // Only set width if needed
        // containerRef.current.style.width = `${width}px`;
      }
      
      // Clean up
      document.body.removeChild(hiddenDiv);
    }
  }, [text]);

  // Typing animation effect
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

  // Helper function to convert markdown to HTML
  const parseMarkdownToHTML = (content: string): string => {
    // Simple implementation for bold text
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

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
    <div 
      ref={containerRef}
      className="typewriter-effect sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
      style={{ 
        position: 'relative',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}
    >
      {parseMarkdown(displayedText)}
      {!isComplete && <span className="cursor">|</span>}
    </div>
  );
};

export default TextGenerate;
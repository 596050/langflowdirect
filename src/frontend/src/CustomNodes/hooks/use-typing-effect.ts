import { useState, useEffect, useRef } from 'react';

const useTypingEffect = (value: string) => {
  const [text, setText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let i = 0;

    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setText(prev => {
        if (i === value.length) {
          clearInterval(intervalId);

          setTimeout(() => {
            setIsAnimating(false);
          }, 100);

          return prev;
        }
        return prev + value[i++];
      });
    }, 10);

    return () => {
      setText('');
      clearInterval(intervalId);
    };
  }, [value]);

  return { text, isAnimating };
};



// const useTypingEffect = (value) => {
//   const textRef = useRef('');
//   const isAnimatingRef = useRef(true);

//   useEffect(() => {
//     let i = 0;
//     textRef.current = '';
//     isAnimatingRef.current = true;

//     const intervalId = setInterval(() => {
//       if (i === value.length) {
//         clearInterval(intervalId);
//         setTimeout(() => {
//           isAnimatingRef.current = false;
//         }, 100);
//       } else {
//         textRef.current += value[i++];
//       }
//     }, 10);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [value]);

//   return { textRef, isAnimatingRef };
// };


export default useTypingEffect;

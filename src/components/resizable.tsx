import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * .9);
  let resizableProps: ResizableBoxProps = {} as ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const listener = () => { 
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * .9 < width) setWidth(window.innerWidth * .9);
      }, 100);
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [width]);
  

  if (direction === 'horizontal') {
    resizableProps = {
      height: Infinity,
      width,
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * .9, Infinity],
      minConstraints: [innerWidth * .2, Infinity],
      resizeHandles: ['e'],
      onResizeStop: (e, data) => {setWidth(data.size.width)}
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * .9],
      minConstraints: [Infinity, innerHeight * .2],
    }
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  )
}

export default Resizable;
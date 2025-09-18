import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';

//animation's playback state is controlled by the isMoving prop 
type Props = {
    isMoving?: boolean,
    what: any,
    soWhat: () => void,
    when: any
}

//Randomization
const BoulderComponent = ({ isMoving, what, soWhat, when }: Props) => {
    const [xState, setXState] = useState(0);
    const [yState, setYState] = useState(0);
    const [rotation, setRotation] = useState(0)
    const boulderRef = useRef(null);

    useEffect(() => {
        // detection logic
        detectCollision();
    }, [when])

    //detectCollision function is called inside a useEffect hook, which runs whenever the when prop changes
    //The collision is determined by comparing the boulder's coordinates with the rocket's coordinates
    function detectCollision() {
        if (boulderRef.current) {
            const boulder = (boulderRef.current as any).getBoundingClientRect();
            const didCollide = boulder.left + 30 < what.right &&
                boulder.right - 30 > what.left &&
                boulder.bottom - 30 > what.top &&
                boulder.top + 30 < what.bottom;
            if (didCollide) {
                soWhat();
            }
        }
    }
    // Randomly meteors ko place krna 
    useEffect(() => {
        setXState(Math.random() * (window.innerWidth - 80));
        setYState(- Math.random() * 100 - 100);
        setRotation(Math.random() * 360);
    }, [])

    // movement of the boulder falling.
    return (
        <div ref={boulderRef} className='boulder-shadow' style={{
            position: 'absolute',
            left: xState,
            top: yState,
            animation: 'moveDown 10s linear forwards',
            animationPlayState: isMoving ? 'running' : 'paused'
        }}>
            <Image src={'/met.png'} width={80} height={80} alt={''} style={{
                rotate: `${rotation}deg`
            }} />
        </div>
    )
}

export default BoulderComponent
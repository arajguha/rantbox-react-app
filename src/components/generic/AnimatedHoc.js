import React from 'react'
import { useSpring, animated } from 'react-spring'


const AnimatedHoc = (props) => {
    const animationProps = useSpring({  config: { duration: 250 }, opacity: 1, from: {opacity: 0} })
    return (
        <animated.div style={animationProps}>
            {props.children}
        </animated.div>
    )
}


export default AnimatedHoc



const Stars = () => {

    const numStars = 100;
    const positions = Array(100).fill(1).map(x=> {
        return {
            x:Math.random() * x * 2000- 500,
            y:Math.random() * x * 1000,
            radius: Math.random() * x * 10,
        }
    })

    return (
        <g x="0" y="0" fill="white" stroke="none" preserveAspectRatio="none" filter="blur(1px) drop-shadow(2px 4px 10px white)">
            { positions.map(star => {
                return <circle cx={star.x} cy={star.y} r={star.radius}/> 
            })}
        </g>
    )
}

export default Stars;
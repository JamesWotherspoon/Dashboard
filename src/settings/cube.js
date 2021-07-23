import React from 'react'
import './cube.scss';

export default function Cube() {

    return (
        <div>
            <div className="scene">
                <div className="cube">
                    <div className="cube__face cube__face__front">front</div>
            
                    <div className="cube__face cube__face__right">right</div>
                    <div className="cube__face cube__face__left">left</div>
                    
                </div>
            </div>
        </div>
    )
}

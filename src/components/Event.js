import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Event = ({x, y, datum, events}) => {
	return (
    <g
      transform={`translate(${x - 28}, ${y - 9}) scale(.06 .06)`}
      {...events}
      >
      <FontAwesomeIcon icon={datum.icon} color="#f2f2f2"
					style={{
						strokeWidth: "50px",
            stroke: "#2d64b3",
					}}
					fixedWidth
			/>
    </g>
	);
};

export default Event;

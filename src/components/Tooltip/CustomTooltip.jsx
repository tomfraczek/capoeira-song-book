import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

const CustomTooltip = ({ title, children, ...props }) => {
    return (
        <Tooltip title={title} {...props}>
            {children}
        </Tooltip>
    );
};

export default CustomTooltip;

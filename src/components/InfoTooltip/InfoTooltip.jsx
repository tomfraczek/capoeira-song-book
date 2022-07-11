import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

import { TooltipContainer } from './InfoTooltip.styles';

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
    },
});

export default function InfoTooltip({ text }) {
    return (
        <TooltipContainer>
            <Tooltip title={text} placement="right">
                <HelpIcon />
            </Tooltip>
        </TooltipContainer>
    );
}

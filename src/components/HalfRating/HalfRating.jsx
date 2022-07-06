import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const HalfRating = ({ readOnly, handleRating, value }) => (
    <Stack spacing={1}>
        {readOnly ? (
            <Rating name="half-rating-read" defaultValue={Number(value)} precision={0.5} readOnly />
        ) : (
            <Rating name="half-rating" defaultValue={Number(value)} precision={0.5} onChange={handleRating} />
        )}
    </Stack>
);

export default HalfRating;

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating({ readOnly, handleRating }) {
    return (
        <Stack spacing={1}>
            {readOnly ? (
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
            ) : (
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={handleRating} />
            )}
        </Stack>
    );
}

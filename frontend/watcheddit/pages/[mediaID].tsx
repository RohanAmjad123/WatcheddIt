import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';

export default function MediaPage() {
    const router = useRouter();
    const { mediaID } = router.query
    console.log(mediaID)
    return (
        <Typography>{mediaID}</Typography>
    );
}

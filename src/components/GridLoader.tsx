import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Chip,
  Grid,
} from '@mui/material'

export default function GridLoader() {
  const placeholderCount = 8 // Number of placeholder cards

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      <Grid container spacing={2}>
        {Array.from(new Array(placeholderCount)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item xs={12} sm={4} md={4} lg={3} key={index}>
            <Card
              sx={{
                width: '100%',
                height: 350,
                backgroundColor: '#0B3954',
                color: '#39A0ED',
              }}
            >
              <CardMedia>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                />
              </CardMedia>
              <CardContent>
                <Typography variant="h6">
                  <Skeleton width="80%" animation="wave" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton width="60%" animation="wave" />
                </Typography>
                <Box mt={1} mb={1}>
                  {Array.from(new Array(3)).map((_, idx) => (
                    <Chip
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      label={<Skeleton width="100%" animation="wave" />}
                      size="small"
                      sx={{
                        marginRight: 1,
                        backgroundColor: '#39A0ED',
                        color: 'black',
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="caption">
                  <Skeleton width="40%" animation="wave" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

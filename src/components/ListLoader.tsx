import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
  Chip,
} from '@mui/material'

export default function ListLoader() {
  const placeholderCount = 5 // Number of placeholder list items

  return (
    <Box sx={{ width: '100%' }}>
      <List>
        {Array.from(new Array(placeholderCount)).map((_, index) => (
          <ListItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            alignItems="flex-start"
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 100,
                height: 150,
                display: 'none',
                zIndex: 10,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
            <ListItemAvatar>
              <Skeleton variant="rectangular" width={60} height={100} />
            </ListItemAvatar>
            <ListItemText
              style={{ color: '#39A0ED' }}
              primary={
                <>
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{
                      fontWeight: 'bold',
                      marginRight: 2,
                      color: '#39A0ED',
                    }}
                  >
                    <Skeleton width="40%" />
                  </Typography>
                  <Skeleton width="60%" />
                </>
              }
              secondary={
                <>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    alignItems="center"
                    mt={1}
                    mb={1}
                  >
                    {Array.from(new Array(3)).map((_, idx) => (
                      <Chip
                        key={idx}
                        label={<Skeleton width="100%" />}
                        size="small"
                        sx={{
                          marginRight: 1,
                          backgroundColor: '#39A0ED',
                          color: 'black',
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="textSecondary">
                      <Skeleton width="30%" />
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <Skeleton width="30%" />
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      <Skeleton width="20%" />
                    </Typography>
                  </Box>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

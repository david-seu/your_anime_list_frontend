/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material'
import HoverableCard from './HoverableCard'
import Anime from '../data/Anime'

interface AnimeGridPreviewProps {
  animeList: Anime[]
}

export default function AnimeGridPreviw({ animeList }: AnimeGridPreviewProps) {
  return (
    <Grid container spacing={2}>
      {animeList.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <HoverableCard {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

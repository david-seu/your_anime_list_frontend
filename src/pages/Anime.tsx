/* eslint-disable import/no-named-as-default */
import 'bootstrap/dist/css/bootstrap.min.css'
import AnimeGrid from '../components/AnimeGrid'
import '../App.css'
import FilterBar from '../components/FilterBar'

export default function Anime(): JSX.Element {
  return (
    <div>
      <div className="home-container">
        <FilterBar />
        <div className="table">
          <AnimeGrid />
        </div>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="h4" className="title">
            Top 100
          </Typography>
          <LinkButton to="/anime">View All</LinkButton>
        </div>

        <AnimePreviewList animeList={top100Anime.slice(0, 5)} /> */}
      </div>
    </div>
  )
}

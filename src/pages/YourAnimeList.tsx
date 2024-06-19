/* eslint-disable import/no-named-as-default */
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'
import AnimeList from '../components/AnimeList'

export default function YourAnimeList(): JSX.Element {
  return (
    <div>
      <div className="home-container">
        <div className="table">
          <AnimeList />
        </div>
      </div>
    </div>
  )
}

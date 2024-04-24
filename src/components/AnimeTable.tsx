import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
// import {
//   DataGrid,
//   GRID_CHECKBOX_SELECTION_COL_DEF,
//   GridColDef,
//   GridEventListener,
// } from '@mui/x-data-grid'
// import { useNavigate } from 'react-router-dom'
import Anime from '../data/Anime'
// eslint-disable-next-line import/no-named-as-default
import useAnimeStore from '../store/useAnimeStore'
import HandlerButton from './HandlerButton'

interface AnimeTableProps {
  animeList: Anime[]
}

export default function AnimeTable({ animeList }: AnimeTableProps) {
  const updateAnimeStore = useAnimeStore((state) => state.updateAnime)
  const nextPage = useAnimeStore((state) => state.nextPage)
  const previousPage = useAnimeStore((state) => state.prevPage)

  const handleNextPage = () => {
    nextPage()
  }
  const handlePreviousPage = () => {
    previousPage()
  }

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Watched</th>
            <th>Score</th>
            <th>Number of Episodes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animeList.map((anime: Anime) => {
            return (
              <tr key={anime.id}>
                <td>{anime.title}</td>
                <td>{anime.watched ? 'Yes' : 'No'}</td>
                <td>{anime.score > 0 ? anime.score : 'N/A'}</td>
                <td>{anime.numEpisodes}</td>
                <td key={anime.id} className="button-container">
                  <Link to={`/editAnime/${anime.id}`}>
                    <button type="button" className="btn btn-primary">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/viewAnime/${anime.id}`}>
                    <button type="button" className="btn btn-primary">
                      View
                    </button>
                  </Link>
                  <input
                    type="checkbox"
                    checked={anime.checked}
                    onChange={(e) => {
                      // eslint-disable-next-line no-param-reassign
                      anime.checked = e.target.checked
                      updateAnimeStore(anime)
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <HandlerButton onClick={handlePreviousPage}>Previous</HandlerButton>
      <HandlerButton onClick={handleNextPage}>Next</HandlerButton>
    </div>
  )
}

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', hideable: false },
//   { field: 'title', headerName: 'Title', width: 300 },
//   { field: 'score', headerName: 'Score', type: 'number', width: 90 },
//   { field: 'watched', headerName: 'Watched', width: 70 },
// ]

// interface AnimeTableProps {
//   animeList: Anime[]
// }

// export default function AnimeTable({ animeList }: AnimeTableProps) {
//   const navigate = useNavigate()
//   const setIdList = useAnimeStore((state) => state.setIdList)

//   const handleRowClick: GridEventListener<'rowClick'> = (params) => {
//     const animeId = params.row.id
//     navigate(`/viewAnime/${animeId}`)
//   }

//   const [paginationModel, setPaginationModel] = React.useState({
//     page: 0,
//     pageSize: 10,
//   })

//   return (
//     <div style={{ height: 400, width: 600 }}>
//       <DataGrid
//         rows={animeList}
//         rowCount={rowCount}
//         columns={columns}
//         paginationMode="server"
//         columnVisibilityModel={{
//           id: false,
//         }}
//         pageSizeOptions={[10]}
//         checkboxSelection
//         onRowDoubleClick={handleRowClick}
//         onRowSelectionModelChange={(ids) => {
//           setIdList(ids as number[])
//         }}
//         disableRowSelectionOnClick
//         disableColumnResize
//         disableColumnFilter
//         disableColumnMenu
//       />
//     </div>
//   )
// }

import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Episode from '../data/Episode'
// eslint-disable-next-line import/no-named-as-default
import useEpisodeStore from '../store/useEpisodeStore'
import HandlerButton from './HandlerButton'

// import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid'
// import { useNavigate } from 'react-router-dom'
// import Episode from '../data/Episode'
// import useEpisodeStore from '../store/useEpisodeStore'

interface EpisodeTableProps {
  episodeList: Episode[]
}

export default function EpisodeTable({ episodeList }: EpisodeTableProps) {
  const updateEpisodeStore = useEpisodeStore((state) => state.updateEpisode)
  const nextPage = useEpisodeStore((state) => state.nextPage)
  const previousPage = useEpisodeStore((state) => state.prevPage)

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
            <th>Number</th>
            <th>Season</th>
            <th>Watched</th>
            <th>Score</th>
            <th>Anime</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {episodeList.map((episode: Episode) => {
            return (
              <tr key={episode.id}>
                <td>{episode.title}</td>
                <td>{episode.number}</td>
                <td>{episode.season}</td>
                <td>{episode.watched ? 'Yes' : 'No'}</td>
                <td>{episode.score > 0 ? episode.score : 'N/A'}</td>
                <td>{episode.animeTitle}</td>
                <td key={episode.id} className="button-container">
                  <Link to={`/editEpisode/${episode.id}`}>
                    <button type="button" className="btn btn-primary">
                      Edit
                    </button>
                  </Link>
                  <Link to={`/viewEpisode/${episode.id}`}>
                    <button type="button" className="btn btn-primary">
                      View
                    </button>
                  </Link>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      // eslint-disable-next-line no-param-reassign
                      episode.checked = e.target.checked
                      updateEpisodeStore(episode)
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
//   { field: 'id', headerName: 'ID', hideable: true },
//   { field: 'title', headerName: 'Title', width: 150 },
//   { field: 'number', headerName: 'Number', type: 'number', width: 90 },
//   { field: 'season', headerName: 'Season', type: 'number', width: 90 },
//   { field: 'score', headerName: 'Score', type: 'number', width: 90 },
//   { field: 'watched', headerName: 'Watched', width: 70 },
//   { field: 'animeTitle', headerName: 'Anime', width: 150 },
// ]

// interface EpisodeTableProps {
//   episodeList: Episode[]
// }

// export default function EpisodeTable({ episodeList }: EpisodeTableProps) {
//   const navigate = useNavigate()
//   const setIdList = useEpisodeStore((state) => state.setIdList)

//   const handleRowClick: GridEventListener<'rowClick'> = (params) => {
//     const episodeId = params.row.id
//     navigate(`/viewEpisode/${episodeId}`)
//   }

//   return (
//     <div style={{ height: 400, width: 800 }}>
//       <DataGrid
//         rows={episodeList}
//         columns={columns}
//         columnVisibilityModel={{
//           id: false,
//         }}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         onRowSelectionModelChange={(ids) => {
//           setIdList(ids as number[])
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         onRowDoubleClick={handleRowClick}
//         disableRowSelectionOnClick
//         disableColumnResize
//         disableColumnFilter
//         disableColumnMenu
//       />
//     </div>
//   )
// }

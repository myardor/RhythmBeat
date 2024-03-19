import { useDispatch, useSelector } from "react-redux"

import { Error, Loader, SongCard } from "../components"
import { genres } from "../assets/constants"

import { useGetTopChartsQuery } from "../redux/services/shazamCore"

const Discover = () => {
  const { activeSong, isPlaying } = useSelector(state => state.player)

  const genreTitle = "Pop"
  const { data, isFetching, error } = useGetTopChartsQuery()

  if (isFetching) return <Loader title='Loading songs...' />
  if (error) return <Error />

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='text-bold text-white text-3xl text-left'>
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value=''
          className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
        >
          {genres.map(genere => (
            <option key={genere.value} value={genere.value}>
              {genere.title}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-wrap gap-8 sm:justify-start justify-center'>
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover

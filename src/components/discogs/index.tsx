import { useContext } from 'react'
import {
  DiscogsDataContext,
  DiscogsDataReturnTypes,
} from '../../context/DiscogsContext/DiscogsContext'

const Discogs = () => {
  const discogsContext = useContext(
    DiscogsDataContext,
  ) as DiscogsDataReturnTypes
  const { collectionSize } = discogsContext

  return <div>Discogs {collectionSize}</div>
}

export default Discogs

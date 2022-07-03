import List from '../../components/discogs/List'
import 'bulma/css/bulma.min.css'
export interface RecordItemType {
  id: number
  year: number
  title: string
  cover_image: string
  labels: { name: string }[]
  resource_url: string
  artists: { name: string }[]
  styles: Array<string>
}

interface DiscogsDataReturnTypes {
  wantlist: Array<RecordItemType>
  wantlistSize: number
  wantlistGenres: Array<string>
}

interface CollectionTypes {
  discogsData: DiscogsDataReturnTypes
}

const Collection = ({ discogsData }: CollectionTypes) => {
  const { wantlist, wantlistSize, wantlistGenres } = discogsData
  return (
    <List list={wantlist} listSize={wantlistSize} listGenres={wantlistGenres} />
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://limitless-sierra-35695.herokuapp.com/collection', // Update this to wantlist endpoint
  )
  const discogsData = await res.json()
  return {
    props: {
      discogsData,
    },
  }
}

export default Collection

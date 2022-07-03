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
  collection: Array<RecordItemType>
  collectionSize: number
  collectionGenres: Array<string>
}

interface CollectionTypes {
  discogsData: DiscogsDataReturnTypes
}

const Collection = ({ discogsData }: CollectionTypes) => {
  const { collectionSize, collection, collectionGenres } = discogsData
  return (
    <List
      list={collection}
      listSize={collectionSize}
      listGenres={collectionGenres}
    />
  )
}

export async function getStaticProps() {
  const res = await fetch(
    'https://limitless-sierra-35695.herokuapp.com/collection',
  )
  const discogsData = await res.json()
  return {
    props: {
      discogsData,
    },
  }
}

export default Collection

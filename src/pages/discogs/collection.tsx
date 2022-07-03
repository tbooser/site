import Image from 'next/image'
import 'bulma/css/bulma.min.css'
interface RecordItemType {
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
  wantlist: Array<RecordItemType>
  wantlistSize: number
  wantlistGenres: Array<string>
}

interface CollectionTypes {
  discogsData: DiscogsDataReturnTypes
}

const Collection = ({ discogsData }: CollectionTypes) => {
  const { collectionSize, collection } = discogsData
  return (
    <ul className="container">
      <li className="columns">
        <span className="column"></span>
        <span className="column">Artist</span>
        <span className="column">Title</span>
        <span className="column">Label</span>
        <span className="column">Genres</span>
        <span className="column">Year</span>
      </li>
      {collection.map((record, index) => {
        const {
          id,
          resource_url,
          cover_image,
          artists,
          title,
          labels,
          year,
          styles,
        } = record
        return (
          <li className="columns" key={id}>
            <span className="column">
              <Image
                unoptimized={true} /*TODO: Revisit this at some point*/
                alt=""
                src={cover_image}
                width={75}
                height={75}
              />
            </span>
            <span className="column">{artists[0].name}</span>
            <span className="column">{title}</span>
            <span className="column">{labels[0].name}</span>
            <span className="column">{styles}</span>
            <span className="column">{year}</span>
          </li>
        )
      })}
    </ul>
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

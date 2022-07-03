import Image from 'next/image'
import { RecordItemType } from '../../pages/discogs/collection'

interface ListReturnTypes {
  list: Array<RecordItemType>
  listSize: number
  listGenres: Array<string>
}

const List = (props: ListReturnTypes) => {
  const { list, listSize } = props
  return (
    <div className="section columns">
      <div className="column">Tag cloud</div>
      <ul className="column is-three-quarters">
        <li className="columns">
          <span className="column">{listSize} records in list</span>
          <span className="column">Artist</span>
          <span className="column">Title</span>
          <span className="column">Label</span>
          <span className="column">Genres</span>
          <span className="column">Year</span>
        </li>
        {list.map((record, index) => {
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
    </div>
  )
}

export default List

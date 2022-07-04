import Image from 'next/image'
import { RecordItemType } from '../../pages/discogs/collection'
import styles from '../../../styles/List.module.scss'

interface ListReturnTypes {
  list: Array<RecordItemType>
  listSize: number
  listGenres: Array<string>
}

const List = (props: ListReturnTypes) => {
  const { list, listSize, listGenres } = props
  const sidebar = `${styles.sidebar} section column is-one-third`
  const listColumn = `${styles.listColumn} columns pt-6 has-background-white`
  const listItem = `${styles.listItem} columns has-text-weight-semibold`
  const unorderedList = `${styles.unorderedList} p-6`
  return (
    <div className="columns">
      <div className={sidebar}>
        <div>
          <h3 className="subtitle has-text-weight-semibold">Genres</h3>
          {listGenres
            .sort((a: any, b: any) => {
              return b[1] - a[1]
            })
            .map((genre) => {
              return (
                <button
                  className="button is-small is-info is-light m-1"
                  key={genre}
                >
                  {genre[0]}&nbsp;
                  <span className="has-text-link-dark">{genre[1]}</span>
                </button>
              )
            })}
        </div>
        <div className="player">Player</div>
      </div>
      <div className="section column columns is-flex is-flex-direction-column mt-0 pt-0">
        <div className={listColumn}>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5">
            <span className="has-text-link">{listSize}</span>&nbsp;records
          </span>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5">
            Artist
          </span>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5">
            Title
          </span>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5">
            Label
          </span>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5">
            Genres
          </span>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5">
            Year
          </span>
          <span className="column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5"></span>
        </div>
        <div className="column">
          <ul className={unorderedList}>
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
              const formattedGenres = styles
                .join(',')
                .replace(/,/g, ' | ')
                .split('')
              return (
                <li className={listItem} key={index}>
                  <span className="column is-flex is-align-items-center is-justify-content-center">
                    <Image
                      unoptimized={true} /*TODO: Revisit this at some point*/
                      alt=""
                      src={cover_image}
                      width={75}
                      height={75}
                    />
                  </span>
                  <span className="column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7">
                    {artists[0].name}
                  </span>
                  <span className="column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7">
                    {title}
                  </span>
                  <span className="column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7">
                    {labels[0].name}
                  </span>
                  <span className="column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7">
                    {formattedGenres}
                  </span>
                  <span className="column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7">
                    {year}
                  </span>
                  <span className="column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7">
                    <button className="button is-small is-primary is-light is-outlined is-focused">
                      Listen
                    </button>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default List

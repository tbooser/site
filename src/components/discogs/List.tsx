import Image from 'next/image'
import { RecordItemType } from '../../pages/discogs/collection'
import style from '../../../styles/List.module.scss'
import { useState } from 'react'

interface ListReturnTypes {
  list: Array<RecordItemType>
  listSize: number
  listGenres: Array<string>
}

interface VideoItemTypes {
  description: string
  duration: number
  embed: boolean
  title: string
  uri: string
}

const List = (props: ListReturnTypes) => {
  const [currentTrack, setCurrentTrack] = useState<string | undefined>(
    undefined,
  )
  const [currentTrackArtist, setCurrentTrackArtist] = useState<
    string | undefined
  >(undefined)
  const [currentTrackNotes, setCurrentTrackNotes] = useState<
    string | undefined
  >(undefined)
  const [currentRecordVideos, setCurrentRecordVideos] = useState<
    Array<VideoItemTypes> | undefined
  >(undefined)
  const [currentRecordTitle, setCurrentRecordTitle] = useState<
    string | undefined
  >(undefined)
  const [currentRecordImage, setCurrentRecordImage] = useState<string>('')
  const { list, listSize, listGenres } = props

  const handleListenOnClick = async (resourceUrl: string, imageUrl: string) => {
    try {
      const response = await fetch(resourceUrl, {
        method: 'GET',
      })
      const response_json = await response.json()
      const { artists_sort, notes, videos, title } = response_json
      setCurrentTrackArtist(artists_sort)
      setCurrentTrackNotes(notes)
      setCurrentRecordVideos(videos)
      setCurrentRecordTitle(title)
      setCurrentRecordImage(imageUrl)
      console.log('json', response_json)
    } catch (error) {
      console.log(error)
    }
  }

  const listHeaderSpan =
    'column subtitle has-text-weight-semibold is-flex is-justify-content-center mb-0 pt-0 pb-5'
  const listItemSpan =
    'column heading is-flex is-align-items-center is-justify-content-center has-text-centered is-size-7'

  return (
    <>
      <div className="columns">
        <div className={`${style.sidebar} section column is-two-fifths`}>
          <h3 className="subtitle has-text-weight-semibold mb-0 pb-5">
            Genres
          </h3>
          <div className="pb-5 pr-4">
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
          <div
            className={`${style.player} has-text-centered pt-4 is-flex is-flex-direction-column`}
          >
            <div
              className={`${style.playerSectionTop} is-flex is-flex-direction-column  pt-4 pb-4`}
            >
              {/* <div className="is-flex is-flex-direction-row is-justify-content-space-evenly is-align-items-center"> */}
              <div className="columns">
                <span className="column is-flex is-justify-content-center is-align-items-center is-size-6">
                  {currentTrackArtist}
                  {currentRecordTitle !== undefined ? ' - ' : null}
                  {currentRecordTitle}
                </span>
                {currentRecordImage ? (
                  <span className="column is-flex is-justify-content-center is-align-items-center">
                    <Image
                      unoptimized={true} /*TODO: Revisit this at some point*/
                      alt=""
                      src={currentRecordImage}
                      width={75}
                      height={75}
                    />
                  </span>
                ) : null}
              </div>
              <span className={style.trackNotes}>{currentTrackNotes}</span>
            </div>
            <div className="is-flex is-align-items-flex-start is-flex-direction-column pt-4 pl-4 is-size-7">
              {currentRecordVideos?.map((video) => {
                return (
                  <>
                    <span key={video.title}>{video.title}</span>
                  </>
                )
              })}
            </div>
            <br />
          </div>
        </div>
        <div className="section column columns is-flex is-flex-direction-column mt-0 pt-0">
          <div
            className={`${style.listHeader} columns pt-6 pr-6 pl-6 has-background-white`}
          >
            <span className={listHeaderSpan}>
              <span className="has-text-link">{listSize}</span>&nbsp;records
            </span>
            <span className={listHeaderSpan}>Artist</span>
            <span className={listHeaderSpan}>Title</span>
            <span className={listHeaderSpan}>Label</span>
            <span className={listHeaderSpan}>Genres</span>
            <span className={listHeaderSpan}>Year</span>
            <span className={listHeaderSpan}></span>
          </div>
          <div className="column">
            <ul className={`${style.unorderedList} pr-6 pl-6 pt-4`}>
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
                  <li
                    className={`${style.listItem} columns has-text-weight-semibold`}
                    key={index}
                  >
                    <span className="column is-flex is-align-items-center is-justify-content-center">
                      <Image
                        unoptimized={true} /*TODO: Revisit this at some point*/
                        alt=""
                        src={cover_image}
                        width={75}
                        height={75}
                      />
                    </span>
                    <span className={listItemSpan}>{artists[0].name}</span>
                    <span className={listItemSpan}>{title}</span>
                    <span className={listItemSpan}>{labels[0].name}</span>
                    <span className={listItemSpan}>{formattedGenres}</span>
                    <span className={listItemSpan}>{year}</span>
                    <span className={listItemSpan}>
                      <button
                        onClick={() => {
                          handleListenOnClick(resource_url, cover_image)
                        }}
                        className="button is-small is-primary is-light is-outlined is-focused"
                      >
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
      <div className={style.footer}></div>
    </>
  )
}

export default List

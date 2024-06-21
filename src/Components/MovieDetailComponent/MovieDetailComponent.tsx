import React, {FC} from 'react';
import {useAppSelector} from '../../redux/store';
import {urls} from '../../costants/Urls';
import style from './MovieDetailComponent.module.css'
import StarRatings from 'react-star-ratings';
import ColectionComponent from '../ColectionComponent/ColectionComponent';
import { globalStyles } from '../../GlobalStyles/GlobalStyles';

const MovieDetailComponent: FC = () => {
    const {curentTheme} = useAppSelector(state => state.themeReducer)
    const {movie, video} = useAppSelector(state => state.detailMovieReducer)

    return (
        <div style={curentTheme ? globalStyles.light : globalStyles.dark}>
            {
                movie &&
                <div className={style.movieContainer} >
                    <img src={urls.image(movie.poster_path)} className={style.moviePoster} alt={movie.original_title}
                         key={movie.id}/>
                    <div>
                        <div>
                            <div className={style.titleBlock}>
                                <div>
                                    <h1 className={style.movieTitle}>{movie.original_title}</h1>
                                    <div className={style.genreBlock}>
                                        {
                                            movie.genres.map(genre => <ColectionComponent genre={genre}
                                                                                          key={genre.id}/>)
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h4>Vote {movie.vote_average}</h4>
                                    <StarRatings key={movie.id}
                                                 rating={movie.vote_average}
                                                 starRatedColor="#4CAF50"
                                                 numberOfStars={10}
                                                 name='rating'
                                                 starDimension="20px"
                                                 starSpacing="5px"
                                    />
                                </div>
                            </div>


                        </div>
                        <p className={style.movieDescription}>{movie.overview}</p>
                        <div className={style.videoBlock}>
                            <div className={style.videoTitle} key={movie.id}>Videos</div>
                            <div className={style.videoContainer}>

                                {
                                    video &&

                                    video.results.map(trailer => <div>
                                        <iframe
                                            src={urls.videoUrls.showVideo(trailer.key)}

                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            key={movie.id}
                                        ></iframe>
                                    </div>)
                                }</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MovieDetailComponent;
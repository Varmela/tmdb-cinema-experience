import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom"
import { getAllGeners, getSearchResults } from '../api';
import MovieCard from '../components/movieList/MovieCard';
import { getGenresNames } from '../components/movieList/MovieList';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const SearchMovieAndGeners = () => {
    const params = useParams();
    const {data,isPending,isError} = useQuery({
        queryKey:['movie-search'],
        queryFn: ()=>getSearchResults(params.query || '')
    });
    const {genersData} = useQuery({
        queryKey: ['movie-gener'],
        queryFn:getAllGeners
    });

    if(isError){
        return <p>Somethingis wrong!</p>
    }
    if(isPending){
        return 'loading';
    }
  return (
    <section style={{backgroundColor:"#0d262f"}} className='movie-list'>
    <Row xs={1} md={4} className="g-4">
    {
        data?.map((movie,index)=>{
            const categories = getGenresNames(movie.genere_id,genersData);
            return(
                <Col key={index}>
             <MovieCard movies = {movie} />
             </Col>
             );
        })
    }
    </Row>
    {data.length === 0 && !isPending && <p>No results found</p>}

    
    </section>
  )
}

export default SearchMovieAndGeners
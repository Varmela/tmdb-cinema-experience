import './footer.css';

const Footer = () => {
  return (
    <div className='footer-part'>
    <div className='movies'>
    <ul>
    <h4>Movies</h4>
    <li>Trending</li>
    <li>Cooming soon</li>
    </ul>
    </div>
    <div className='location'>
    <h4>Location</h4>
    <li>Tirane</li>
    </div>
    <div className='tech'>
    <h4>Using tech</h4>
    <ul>
    <li> 3D</li>
    <li> 8D</li>
    <li> 16D</li>

    </ul></div>
    <div className='network'>
    <h4>Follow us</h4>
    <ul><li>Instagram</li>
    <li>Facebook</li>
    </ul>
    
    </div>
    </div>
  )
}

export default Footer
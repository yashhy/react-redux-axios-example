import { Link } from 'react-router-dom'

const NotFound = () => {
  return <h4>
    Seems like you are lost!
    Click <Link to="/github-search">here</Link> to go to Github Search
  </h4>;
}

export default NotFound
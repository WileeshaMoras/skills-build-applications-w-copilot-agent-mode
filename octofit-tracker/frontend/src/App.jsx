import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge text-bg-primary-subtle text-primary-emphasis mb-3">
            OctoFit Tracker
          </span>
          <h1 className="display-5 fw-bold mb-3">Train smarter with a modern fitness command center.</h1>
          <p className="lead text-muted mb-4">
            Track workouts, manage teams, and stay motivated with a polished multi-tier experience built for growth.
          </p>
          <div className="d-flex gap-3">
            <Link className="btn btn-primary btn-lg" to="/activities">
              Activities
            </Link>
            <Link className="btn btn-outline-secondary btn-lg" to="/leaderboard">
              Leaderboard
            </Link>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <img src={octofitLogo} alt="OctoFit Tracker logo" className="img-fluid rounded mb-3" />
              <h2 className="h4 mb-2">Ready for your next milestone</h2>
              <p className="text-muted mb-0">
                The presentation tier is now connected to a Node.js and Express backend ready for MongoDB-backed features.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={octofitLogo} alt="logo" height="32" />
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App

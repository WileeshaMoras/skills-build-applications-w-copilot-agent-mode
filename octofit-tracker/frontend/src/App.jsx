import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

function App() {
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
            <a className="btn btn-primary btn-lg" href="https://react.dev" target="_blank" rel="noreferrer">
              Explore the stack
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">
              Check API health
            </a>
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

export default App

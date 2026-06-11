export default function Loader({ loaded, loadFill, loaderStatus }) {
  return (
    <div className={`loader ${loaded ? 'done' : ''}`}>
      <div className="loader-logo">ADITYA</div>
      <div className="loader-bar">
        <span id="loadFill" style={{ width: `${loadFill}%` }} />
      </div>
      <div className="loader-status" id="loadStatus">
        {loaderStatus}
      </div>
    </div>
  );
}

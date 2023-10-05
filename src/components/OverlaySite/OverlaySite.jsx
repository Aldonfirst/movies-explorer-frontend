import './OverlaySite.css';

function OverlaySite({ isMenuOpen, closeMenu }) {
  return (
    <div
      className={`overlay-site ${isMenuOpen ? 'overlay-site_open' : ''}`}
      onClick={closeMenu}
    ></div>
  );
}

export default OverlaySite;
import packageJson from '../../../package.json';
import config from "../../config/config";

const Footer = () => {
  return (
    <footer className="py-2 mt-5 bg-light text-muted">
      <div className="container">
        <div className="row">
          <div className="col">Version {packageJson.version}</div>
          <div className="col-auto">
            {config.REACT_APP_IMPRINT_LINK ? (
              <a
                href={config.REACT_APP_IMPRINT_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Impressum
              </a>
            ) : null}
            {config.REACT_APP_PRIVACY_LINK ? (
              <a
                href={config.REACT_APP_PRIVACY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="ms-2"
              >
                Datenschutz
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

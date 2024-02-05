import { useEffect, useMemo, useState } from 'react';
import { getYear } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs } from 'react-bootstrap';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Year from './year';
import Month from './month';

const UserWorkView = ({ id }) => {
  const [currentYear, setCurrentYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (!currentYear) {
      setCurrentYear(getYear(new Date()));
    }
  }, [currentYear]);

  useEffect(() => {
    if (currentYear && !selectedYear) {
      setSelectedYear(currentYear);
    }
  }, [currentYear, selectedYear]);

  const nextYearDisabled = useMemo(
    () => selectedYear > currentYear,
    [selectedYear, currentYear],
  );

  return selectedYear && id ? (
    <div className="card">
      <div className="card-header d-flex">
        <h4 className="mb-0">{selectedYear}</h4>
        <div className="btn-group btn-group-sm ms-auto">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setSelectedYear(selectedYear - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setSelectedYear(selectedYear + 1)}
            disabled={nextYearDisabled}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="card-body">
        <Tabs
          defaultActiveKey="overview"
          className="work-view-tabs"
          mountOnEnter={true}
        >
          <Tab eventKey="overview" title="Übersicht">
            <Year userId={id} year={selectedYear} />
          </Tab>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthNumber) => (
            <Tab
              key={monthNumber}
              eventKey={`month-${monthNumber}`}
              title={format(new Date(selectedYear, monthNumber - 1), 'MMMM', {
                locale: de,
              })}
            >
              <Month userId={id} year={selectedYear} month={monthNumber} />
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  ) : null;
};

export default UserWorkView;

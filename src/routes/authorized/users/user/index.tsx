import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../../../../redux/apis/userManagementApi';
import { skipToken } from '@reduxjs/toolkit/query';
import EditUser from './EditUser';
import ShowUserData from './ShowUserData';
import CreateContract from './CreateContract';
import ShowContract from './ShowContract';
import UserWorkView from '../../../../components/work/UserWorkView';

const User = () => {
  const { id } = useParams();
  const { data: user } = useGetUserQuery(id ?? skipToken);

  return user ? (
    <div className="mt-4">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header d-flex">
              <h4 className="mb-0">Stammdaten</h4>
              <div className="ms-auto">
                <EditUser user={user} />
              </div>
            </div>
            <div className="card-body">
              <ShowUserData user={user} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card">
            <div className="card-header d-flex">
              <h4 className="mb-0">Arbeitsverträge</h4>
              <div className="ms-auto">
                <CreateContract user={user} />
              </div>
            </div>
            <div className="card-body">
              {user.contracts
                ?.slice()
                ?.sort(
                  (a, b) =>
                    new Date(a.startAt).getTime() -
                    new Date(b.startAt).getTime(),
                )
                ?.map((contract, cI) => (
                  <ShowContract key={cI} contract={contract} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <UserWorkView id={id} />
        </div>
      </div>
    </div>
  ) : null;
};

export default User;

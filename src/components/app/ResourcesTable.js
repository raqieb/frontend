import styles from './styles/ResourcesTable.module.css';
import { Link } from 'react-router-dom';
import { ActionsMenu } from '../common';


export const ResourcesTable = (props) => {
  const { resourceName, resources } = props;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          {
            resources.length > 0 && Object.keys(resources[0])
              .map((field) => {
                if (field === 'id') return
                if (field === 'name') {
                  return (
                    <th key={field}>
                      {resourceName} {field}
                    </th>
                  );
                }
                return (
                  <th
                    key={field}
                  >
                    {field}
                  </th>
                );
              })
          }
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
        resources.length > 0 && resources.map((resource, index) => {
          return (
          <tr key={index + 1}>
            <td>
              { index + 1 }
            </td>
            {
              Object.keys(resource).map((key) => {
                if (key === 'id') return
                else if (key === 'name') {
                  return (
                    <td key={key}>
                      <Link
                        to={`/app/${resourceName}s/${resource.id}`}
                        className={styles.resourceLink}
                      >
                        { resource[key] }
                      </Link>
                    </td>
                  );
                } else {
                  return (
                    <td key={key}>
                      { resource[key] }
                    </td>
                  );
                }
              })
            }
            <td>
              <ActionsMenu
                updatePath={`/app/${resourceName}s/${resource.id}/edit`}
                deletePath={`/app/${resourceName}s/${resource.id}/delete`}
              />
            </td>
          </tr>
          );
        })
      }
      </tbody>
    </table>
  );
}
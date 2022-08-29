import {gql, useQuery} from '@apollo/client'; //gql is used to make the query and useQuery is for using the data in the components etc
import ClientRow from './ClientRow';
import Spinner from './Spinner';
import { GET_CLIENTS } from '../queries/clientQueries';



export default function Clients(){
  const { loading, error, data} = useQuery(GET_CLIENTS)

  if (loading) return <Spinner />;
  if (error) return <p>Something Went wrong</p>


  return <>{!loading && !error && 
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.clients.map( client =>(
          <ClientRow key={client.id} client={client}/>
        ))}  
      </tbody>
    </table>
  }</>;
}
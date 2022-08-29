import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const[addClient] = useMutation(ADD_CLIENT, {
        // variables being passed in
        variables: {name, email, phone},
        //addClient in the row below, gives us the newly added data
        update(cache, {data: {addClient}}){
            //read from the cache
            const {clients} = cache.readQuery({query:
            GET_CLIENTS}); //read from this query in the cache
            
            //setting the data to concat the new client onto the new one
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: clients.concat([addClient])},
            })
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, phone);
        if (name === '' || email === '' || phone === '') {
            return alert('Please fill in all fields');

        }

        addClient(name, email, phone);

        setName('');
        setEmail('');
        setPhone('');
    }
  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
                {/* Not sure if this div right below should be a form tag instead */}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                {/* data-bs-dismiss is used to make sure the modal closes when we press the submit button */}
                <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

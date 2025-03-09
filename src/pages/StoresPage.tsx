import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addStore, updateStore, removeStore, reorderStore } from '../store/storesSlice';
import trashIcon from '../assets/icons/trash-solid.svg';
import './StoresPage.css';

const StoresPage: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [editedStore, setEditedStore] = useState<any>({});

  const handleDelete = (id: string) => {
    dispatch(removeStore(id));
  };

  const handleAddStore = () => {
    const label = prompt("Enter store label:");
    const city = prompt("Enter city:");
    const state = prompt("Enter state:");
    if (label && city && state) {
      const newStore = {
        seqNo: stores.length + 1,
        id: `ST${Math.floor(Math.random() * 9000 + 1000)}`,
        label,
        city,
        state,
      };
      dispatch(addStore(newStore));
    }
  };

  const handleEdit = (store: any) => {
    setEditingStoreId(store.id);
    setEditedStore(store);
  };

  const handleUpdate = (id: string) => {
    dispatch(updateStore({ ...editedStore, id }));
    setEditingStoreId(null);
    setEditedStore({});
  };

  const handleCancelEdit = () => {
    setEditingStoreId(null);
    setEditedStore({});
  };

  const handleReorder = (oldIndex: number, newIndex: number) => {
    dispatch(reorderStore({ oldIndex, newIndex }));
  };

  return (
    <div className="stores-page">
      <h2>Stores</h2>
      <div className="table-responsive">
        <table className="stores-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Store</th>
              <th>City</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={store.id}>
                <td>{store.seqNo}</td>
                <td>
                  {editingStoreId === store.id ? (
                    <input
                      type="text"
                      value={editedStore.label || ""}
                      onChange={(e) =>
                        setEditedStore({ ...editedStore, label: e.target.value })
                      }
                    />
                  ) : (
                    store.label
                  )}
                </td>
                <td>
                  {editingStoreId === store.id ? (
                    <input
                      type="text"
                      value={editedStore.city || ""}
                      onChange={(e) =>
                        setEditedStore({ ...editedStore, city: e.target.value })
                      }
                    />
                  ) : (
                    store.city
                  )}
                </td>
                <td>
                  {editingStoreId === store.id ? (
                    <input
                      type="text"
                      value={editedStore.state || ""}
                      onChange={(e) =>
                        setEditedStore({ ...editedStore, state: e.target.value })
                      }
                    />
                  ) : (
                    store.state
                  )}
                </td>
                <td className="action-icons">
                  {editingStoreId === store.id ? (
                    <>
                      <button onClick={() => handleUpdate(store.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleReorder(index, index - 1)}>↑</button>
                      <button onClick={() => handleReorder(index, index + 1)}>↓</button>
                      <button onClick={() => handleEdit(store)}>Edit</button>
                      <button onClick={() => handleDelete(store.id)}>
                        <img src={trashIcon} alt="Delete" className="trash-icon" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="new-store-container">
        <button onClick={handleAddStore} className="new-store-btn">
          NEW STORE
        </button>
      </div>
    </div>
  );
};

export default StoresPage;

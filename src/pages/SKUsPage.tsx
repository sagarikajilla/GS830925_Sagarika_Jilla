import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addSKU, updateSKU, removeSKU, reorderSKU } from '../store/skusSlice';
import trashIcon from '../assets/icons/trash-solid.svg';
import './SKUsPage.css';

const SKUsPage: React.FC = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);
  const [editingSKUId, setEditingSKUId] = useState<string | null>(null);
  const [editedSKU, setEditedSKU] = useState<any>({});

  const handleDelete = (id: string) => {
    dispatch(removeSKU(id));
  };

  const handleAddSKU = () => {
    const label = prompt("Enter SKU label:");
    const skuClass = prompt("Enter class:");
    const department = prompt("Enter department:");
    const price = prompt("Enter price (e.g., $9.99):");
    const cost = prompt("Enter cost (e.g., $3.45):");
    if (label && skuClass && department && price && cost) {
      const newSKU = {
        id: `SK${Math.floor(Math.random() * 9000 + 1000)}`,
        label,
        price,
        cost,
      };
      dispatch(addSKU(newSKU));
    }
  };

  const handleEdit = (sku: any) => {
    setEditingSKUId(sku.id);
    setEditedSKU(sku);
  };

  const handleUpdate = (id: string) => {
    dispatch(updateSKU({ ...editedSKU, id }));
    setEditingSKUId(null);
    setEditedSKU({});
  };

  const handleCancelEdit = () => {
    setEditingSKUId(null);
    setEditedSKU({});
  };

  const handleReorder = (oldIndex: number, newIndex: number) => {
    dispatch(reorderSKU({ oldIndex, newIndex }));
  };

  return (
    <div className="skus-page">
      <h2>SKUs</h2>
      <div className="table-responsive">
        <table className="skus-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Label</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku, index) => (
              <tr key={sku.id}>
                <td>{sku.id}</td>
                <td>
                  {editingSKUId === sku.id ? (
                    <input
                      type="text"
                      value={editedSKU.label || ""}
                      onChange={(e) =>
                        setEditedSKU({ ...editedSKU, label: e.target.value })
                      }
                    />
                  ) : (
                    sku.label
                  )}
                </td>
                <td>
                  {editingSKUId === sku.id ? (
                    <input
                      type="text"
                      value={editedSKU.price || ""}
                      onChange={(e) =>
                        setEditedSKU({ ...editedSKU, price: e.target.value })
                      }
                    />
                  ) : (
                    sku.price
                  )}
                </td>
                <td>
                  {editingSKUId === sku.id ? (
                    <input
                      type="text"
                      value={editedSKU.cost || ""}
                      onChange={(e) =>
                        setEditedSKU({ ...editedSKU, cost: e.target.value })
                      }
                    />
                  ) : (
                    sku.cost
                  )}
                </td>
                <td className="action-icons">
                  {editingSKUId === sku.id ? (
                    <>
                      <button onClick={() => handleUpdate(sku.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleReorder(index, index - 1)}>↑</button>
                      <button onClick={() => handleReorder(index, index + 1)}>↓</button>
                      <button onClick={() => handleEdit(sku)}>Edit</button>
                      <button onClick={() => handleDelete(sku.id)}>
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
      <div className="new-sku-container">
        <button onClick={handleAddSKU} className="new-sku-btn">
          NEW SKU
        </button>
      </div>
    </div>
  );
};

export default SKUsPage;

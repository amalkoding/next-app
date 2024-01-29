'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
}

export default function DeleteProduct({ product }: { product: Product }) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(productId: number) {
    setIsMutating(true);
    await axios.delete(`/api/products/${productId}`);

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>

      <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>

      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are You Sure Want To Delete {product.title}</h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>Close</button>
            {!isMutating ? (
              <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">Delete</button>
            ) : (
              <button type="button" className="btn btn-loading">Deleting...</button>
            )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

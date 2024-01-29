'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"
import type { Brand } from "@prisma/client";
import axios from "axios";

export default function AddProduct({ brands }: { brands: Brand[] }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);
    await axios.post('/api/products', {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });

    setIsMutating(false);

    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>

      <button className="btn" onClick={handleChange}>Add New</button>

      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="Price" />
            </div>
            <div className="form-control">
              <label className="label font-bold">Brand</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select select-bordered">
                <option value="" disabled>Select a Brand</option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>Close</button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">Submit</button>
              ) : (
                <button type="submit" className="btn btn-loading">Saving...</button>
              )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

import React, { useContext } from "react";
import { CreateProduct } from "../components/CreateProduct";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loader } from "../components/Loader";
import { Modal } from "../components/Modal";
import { Product } from "../components/Product";
import { ModalContext } from "../context/ModalCotext";
import { UseProducts } from "../hooks/products";
import { IProduct } from "../models";

export function ProductsPage() {
  const {
    modal,
    open: openModal,
    close: closeModal,
  } = useContext(ModalContext);
  const { products, error, loading, addProduct } = UseProducts();

  const createHandler = (product: IProduct) => {
    closeModal();
    addProduct(product);
  };
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id}></Product>
      ))}

      {modal && (
        <Modal title="Create New Product" onClose={closeModal}>
          <CreateProduct onCreate={createHandler}></CreateProduct>
        </Modal>
      )}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
        onClick={openModal}
      >
        Add
      </button>
    </div>
  );
}

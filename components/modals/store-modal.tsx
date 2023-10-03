"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title={"Create Store"}
      description={"Add a nnew store to manage products ans categories"}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Store Form
    </Modal>
  );
};

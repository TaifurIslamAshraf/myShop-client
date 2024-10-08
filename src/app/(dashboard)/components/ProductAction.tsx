"use client";

import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { customRevalidateTag } from "@/lib/actions/RevalidateTag";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";
import { FilePenLine, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IProduct } from "../../../../types/product";

type Props = {
  product: IProduct;
};

const ProductAction: FC<Props> = ({ product }) => {
  const router = useRouter();

  const [deleteProduct, { isLoading, isSuccess, error }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    const productId = product?._id;
    await deleteProduct({
      productId: productId,
    });

    customRevalidateTag("getAllProducts");
    router.refresh();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product deleted successfull");
    } else if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [error, isSuccess]);

  return (
    <div className="flex items-center gap-5">
      <div className="">
        <Link href={`/dashboard/products/${product?.slug}`}>
          <Button size={"icon"}>
            <FilePenLine />
          </Button>
        </Link>
      </div>
      <div className="">
        <Button
          disabled={isLoading}
          onClick={handleDeleteProduct}
          size={"icon"}
          className="bg-red-400"
        >
          <Trash className="" />
        </Button>
      </div>
    </div>
  );
};

export default ProductAction;

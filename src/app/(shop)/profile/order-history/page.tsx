"use client";

import { MyImage } from "@/app/(dashboard)/components/CustomImg";
import { styles } from "@/app/styles";
import ComponentLoader from "@/components/ComponentLoader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, serverUrl } from "@/lib/utils";
import { useGetOrderQuery } from "@/redux/features/orders/orderApi";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [collapsedOrders, setCollapsedOrders] = useState<number[]>([]);

  //access state
  const { user } = useSelector((state: any) => state.auth);
  const { allOrders } = useSelector((state: any) => state.order);

  const { isLoading } = useGetOrderQuery({ userId: user?._id });

  const myOrders = allOrders?.userOrders;

  const handleToggle = (index: number) => {
    if (collapsedOrders.includes(index)) {
      setCollapsedOrders(collapsedOrders.filter((value) => value !== index));
    } else {
      setCollapsedOrders([...collapsedOrders, index]);
    }
  };

  return (
    <section className={cn(styles.paddingX, styles.paddingY)}>
      <div>
        <h1 className="font-semibold text-2xl animate-in fade-in duration-700">
          My Orders{" "}
          <span className="font-normal text-sm">
            (Total Order: {myOrders?.length})
          </span>
        </h1>
        <Separator className="my-4" />
      </div>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <div className="">
          {myOrders?.map((item: any, index: number) => (
            <div className="bg-gray-100 gap-4 px-3" key={item._id}>
              <div className="space-y-1">
                <div
                  className={cn(
                    collapsedOrders.includes(index) ? "my-5" : "my-5",
                    "flex items-center justify-between"
                  )}
                >
                  <h2 className="font-medium text-lg pt-2">
                    Your Order ID: {item?.orderId} ({item?.orderItems?.length}{" "}
                    items)
                  </h2>
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    onClick={() => handleToggle(index)}
                  >
                    {collapsedOrders?.includes(index) ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    )}
                  </Button>
                </div>
                <h2 className="font-medium">
                  Order Status:{" "}
                  <span
                    className={cn(
                      item?.orderStatus === "Cancelled"
                        ? "text-red-500"
                        : "text-green-500 animate-in fade-in duration-700"
                    )}
                  >
                    {item?.orderStatus}
                  </span>
                </h2>
              </div>

              <div
                className={cn(
                  collapsedOrders.includes(index) ? "block" : "hidden",
                  "my-5"
                )}
              >
                {item?.orderItems?.map((order: any) => (
                  <>
                    <div
                      className="flex items-center justify-between py-4 gap-6"
                      key={order?._id}
                    >
                      <div className="flex items-center gap-4 flex-1 ">
                        <MyImage
                          src={`${serverUrl}/${order?.image}`}
                          alt={order?.productName}
                          width={50}
                          height={50}
                        />
                        <h1>{order?.productName}</h1>
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <h2>{order?.quantity}X</h2>
                        <h2>TK.{order?.price}</h2>
                      </div>
                    </div>
                    <Separator />
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;

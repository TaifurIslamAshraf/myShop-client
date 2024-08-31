import { FC } from "react";
import { Separator } from "./ui/separator";

type Props = {
  description: {
    ingredients: string;
    foodDesc: string;
  };
};

const FoodDesc: FC<Props> = ({ description }) => {
  const ingredients = description?.ingredients?.split(",");

  return (
    <div className="space-y-4 px-4">
      <h1 className="font-semibold text-2xl">Description</h1>
      <Separator />
      <div className="">
        <div className="">
          {ingredients?.length >= 1 && (
            <>
              <h2 className="mb-3 text-lg font-medium">Ingredients:</h2>
              <ul className="list-inside list-disc ml-4">
                {ingredients?.map((item: string, index) => (
                  <li key={index} className="">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="">
          {description?.foodDesc && (
            <>
              <h1 className="mb-2 mt-4 text-lg font-medium">Details:</h1>
              <pre className="font-mono whitespace-pre-wrap">
                {description.foodDesc}
              </pre>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDesc;

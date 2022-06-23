import RecipeCard from "./RecipeCard";
import ModerationRecipeCard from "../recipe_moderation/ModerationRecipeCard";
import "../../styles/recipes/Recipes.css";
import { memo, useEffect } from "react";

//import
import RecipeCardSkeleton from "../skeletons/RecipeCardSkeleton";
//redux
import { useAppSelector } from "../../hooks";

//types
import { FC } from "react";
import { TRecipe } from "../../slices/recipesSlice";

interface propTypes {
  approvalRequiredOnly: boolean;
  recipes: TRecipe[];
  chipsFilterFunction?: Function;
  loading?: boolean;
}

const Recipes: FC<propTypes> = ({
  recipes,
  approvalRequiredOnly,
  chipsFilterFunction,
  loading,
}) => {
  return (
    <div className="recipes-container">
      {recipes.map((recipe) =>
        approvalRequiredOnly ? (
          <ModerationRecipeCard key={recipe._id} recipe={recipe} />
        ) : (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            chipsFilterFunction={chipsFilterFunction}
          />
        )
      )}
      {loading &&
        Array.from({ length: 8 }, (v, k) => k + 1).map((_) => (
          <RecipeCardSkeleton
            key={_}
            kind={approvalRequiredOnly ? "moderation" : "regular"}
          />
        ))}
    </div>
  );
};

export default memo(Recipes);
